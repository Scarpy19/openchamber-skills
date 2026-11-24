import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { SkillsError } from './skills.ts';
import type { SkillsResponse } from '../shared/types.ts';

type Fingerprint = { kind: string; hash: string; size: number; mtime: number; mode: number };
type UndoMove = { from: string; to: string; fingerprint: Fingerprint };

const fingerprint = async (file: string): Promise<Fingerprint> => {
  const stat = await fs.lstat(file);
  const kind = stat.isSymbolicLink() ? 'link' : stat.isFile() ? 'file' : 'other';
  if (kind === 'other') throw new Error('Not a regular file or symbolic link');
  if (kind === 'file' && stat.size > 2_000_000) throw new Error('Entry exceeds the undo safety limit');
  const data = kind === 'link' ? Buffer.from(await fs.readlink(file)) : await fs.readFile(file);
  return { kind, hash: createHash('sha256').update(data).digest('hex'), size: stat.size, mtime: stat.mtimeMs, mode: stat.mode };
};

const same = (a: Fingerprint, b: Fingerprint): boolean =>
  a.kind === b.kind && a.hash === b.hash && a.size === b.size && a.mtime === b.mtime && a.mode === b.mode;

/** In-memory undo only; restarting the service discards the undo record. */
export class BulkUndo {
  private record: { directory: string | null; moves: UndoMove[] } | null = null;

  clear(): void { this.record = null; }

  async capture(scan: SkillsResponse): Promise<Map<string, Fingerprint>> {
    const files = scan.skills.flatMap((skill) => [...skill.activePaths, ...skill.disabledPaths]);
    const result = new Map<string, Fingerprint>();
    for (const file of files) result.set(file, await fingerprint(file));
    return result;
  }

  async remember(before: SkillsResponse, after: SkillsResponse, captured: Map<string, Fingerprint>): Promise<boolean> {
    this.clear();
    const oldPaths = new Set(before.skills.flatMap((skill) => [...skill.activePaths, ...skill.disabledPaths]));
    const newPaths = new Set(after.skills.flatMap((skill) => [...skill.activePaths, ...skill.disabledPaths]));
    const moves: UndoMove[] = [];
    for (const old of oldPaths) {
      if (newPaths.has(old)) continue;
      const next = old.endsWith('.disabled') ? old.slice(0, -'.disabled'.length) : `${old}.disabled`;
      if (!newPaths.has(next)) continue;
      try {
        const current = await fingerprint(next);
        const original = captured.get(old);
        if (!original || !same(original, current)) return false;
        moves.push({ from: next, to: old, fingerprint: current });
      } catch { return false; }
    }
    if (!moves.length) return false;
    this.record = { directory: before.projectDirectory, moves };
    return true;
  }

  async undo(directory: string | null): Promise<void> {
    const record = this.record;
    if (!record || record.directory !== directory) throw new SkillsError('no-undo', 409, 'No undo is available for this project.');
    for (const move of record.moves) {
      try {
        if (!same(await fingerprint(move.from), move.fingerprint)) throw new Error('changed');
        try { await fs.lstat(move.to); throw new Error('target exists'); }
        catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; }
      } catch {
        throw new SkillsError('conflict', 409, `Cannot undo: the entry changed or its original path exists: ${move.from}`);
      }
    }
    const done: UndoMove[] = [];
    try {
      for (const move of record.moves) {
        await fs.rename(move.from, move.to);
        done.push(move);
      }
    } catch {
      for (const move of done.reverse()) {
        try { await fs.rename(move.to, move.from); } catch { /* Report partial rollback below. */ }
      }
      this.clear();
      throw new SkillsError('io', 500, 'Undo failed. Some files may need manual restoration; rescan.');
    }
    this.clear();
  }
}
