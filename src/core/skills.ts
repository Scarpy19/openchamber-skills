import fs from 'node:fs/promises';
import type { Dirent } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type {
  BatchResponse,
  BulkResponse,
  ConflictKind,
  ConflictView,
  ResolveResponse,
  RootView,
  SkillState,
  SkillView,
  SkillsResponse,
  Summary,
} from '../shared/types.ts';
import { resolveSources, scanConfig, type ScanConfig, type SkillSource } from './sources.ts';

const MAX_DEPTH = 6;
const MAX_SKILL_BYTES = 2_000_000;
const IGNORED_DIRS = new Set(['node_modules', '.git', '.svn', '.hg']);
const CONFLICT_ORDER: Record<ConflictKind, number> = {
  both: 0,
  'read-error': 1,
  duplicate: 2,
  invalid: 3,
  empty: 4,
  manual: 5,
  'no-description': 6,
};

type Frontmatter = {
  name: string;
  description: string;
  autoInvokeOff: boolean;
  hasFrontmatter: boolean;
  valid: boolean;
  empty: boolean;
};

type Entry = {
  id: string;
  source: SkillSource;
  activePath: string | null;
  disabledPath: string | null;
  frontmatter: Frontmatter;
  error: string | null;
};

type Move = { id: string; from: string; to: string };
type EntryKind = 'file' | 'dir' | 'other';
type Keep = 'enabled' | 'disabled';

export class SkillsError extends Error {
  readonly code: string;
  readonly status: number;
  readonly conflicts?: ConflictView[];

  constructor(code: string, status: number, message: string, conflicts?: ConflictView[]) {
    super(message);
    this.name = 'SkillsError';
    this.code = code;
    this.status = status;
    this.conflicts = conflicts;
  }
}

const describeFs = (error: unknown): string => {
  const code = (error as NodeJS.ErrnoException).code;
  if (code === 'EBUSY' || code === 'EPERM') {
    return 'The file is locked or permission was denied. Close it in other applications and rescan.';
  }
  if (code === 'EACCES') return 'Permission denied';
  if (code === 'ENOENT') return 'Path does not exist';
  if (code === 'ENOTDIR') return 'Not a directory';
  if (code === 'EISDIR') return 'Is a directory';
  return error instanceof Error ? error.message : 'File system error';
};

const parseBoolean = (value: string): boolean | undefined => {
  const text = value.trim().toLowerCase();
  if (['true', 'yes', 'on', '1'].includes(text)) return true;
  if (['false', 'no', 'off', '0'].includes(text)) return false;
  return undefined;
};

const unquote = (value: string): string => {
  const text = value.trim();
  if (text.length >= 2 && text.startsWith('"') && text.endsWith('"')) {
    return text.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
  }
  if (text.length >= 2 && text.startsWith("'") && text.endsWith("'")) {
    return text.slice(1, -1).replace(/''/g, "'");
  }
  return text;
};

/** Removes an unquoted YAML comment from a scalar value. */
const stripComment = (value: string): string => {
  let quote: string | null = null;
  for (let index = 0; index < value.length; index += 1) {
    const char = value[index] ?? '';
    if (quote) {
      if (char === quote && value[index - 1] !== '\\') quote = null;
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === '#' && (index === 0 || /\s/.test(value[index - 1] ?? ''))) {
      return value.slice(0, index).trimEnd();
    }
  }
  return value;
};

const fallbackFrontmatter = (id: string): Frontmatter => ({
  name: id,
  description: '',
  autoInvokeOff: false,
  hasFrontmatter: false,
  valid: true,
  empty: false,
});

export const parseFrontmatter = (text: string, id: string): Frontmatter => {
  const withoutBom = text.replace(/^\uFEFF/, '');
  if (withoutBom.trim().length === 0) {
    return { ...fallbackFrontmatter(id), empty: true };
  }
  const lines = withoutBom.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') return fallbackFrontmatter(id);
  let end = -1;
  for (let index = 1; index < lines.length; index += 1) {
    const value = lines[index]?.trim();
    if (value === '---' || value === '...') {
      end = index;
      break;
    }
  }
  if (end < 0) {
    return { ...fallbackFrontmatter(id), hasFrontmatter: true, valid: false };
  }

  const block = lines.slice(1, end);
  let name = '';
  let description = '';
  let disable: boolean | undefined;
  let metaAutoInvoke: boolean | undefined;

  for (let index = 0; index < block.length; index += 1) {
    const line = block[index] ?? '';
    if (line.trim().length === 0 || /^\s/.test(line)) continue;
    const match = /^([^:]+):\s*(.*)$/.exec(line);
    if (!match) continue;
    const key = (match[1] ?? '').trim().replace(/^["']|["']$/g, '');
    const raw = stripComment((match[2] ?? '').trim());

    if (key === 'name' || key === 'description') {
      let value = raw;
      if (/^[>|][+-]?$/.test(value)) {
        const folded = value.startsWith('>');
        const collected: string[] = [];
        let cursor = index + 1;
        while (cursor < block.length) {
          const next = block[cursor] ?? '';
          if (next.trim().length > 0 && !/^\s/.test(next)) break;
          collected.push(next);
          cursor += 1;
        }
        const indents = collected.filter((item) => item.trim().length > 0).map((item) => item.match(/^\s*/)?.[0].length ?? 0);
        const base = indents.length > 0 ? Math.min(...indents) : 0;
        value = collected
          .map((item) => item.slice(Math.min(base, item.length)))
          .join(folded ? ' ' : '\n')
          .trim();
        index = cursor - 1;
      } else {
        value = unquote(value);
      }
      if (key === 'name') name = value.trim();
      else description = value.trim();
      continue;
    }

    if (key === 'disable-model-invocation') {
      disable = parseBoolean(unquote(raw));
      continue;
    }

    if (key === 'metadata') {
      if (raw.startsWith('{')) {
        const inline = /["']?opencode\/autoinvoke["']?\s*:\s*(true|false|yes|no|on|off|1|0)/i.exec(raw);
        if (inline) metaAutoInvoke = parseBoolean(inline[1] ?? '');
        continue;
      }
      let cursor = index + 1;
      while (cursor < block.length) {
        const next = block[cursor] ?? '';
        if (next.trim().length > 0 && !/^\s/.test(next)) break;
        const nested = /^\s+["']?opencode\/autoinvoke["']?\s*:\s*(.*)$/.exec(next);
        if (nested) metaAutoInvoke = parseBoolean(unquote(nested[1] ?? ''));
        cursor += 1;
      }
      index = cursor - 1;
    }
  }

  return {
    name: name.trim() || id,
    description: description.trim(),
    autoInvokeOff: metaAutoInvoke !== undefined ? !metaAutoInvoke : disable === true,
    hasFrontmatter: true,
    valid: true,
    empty: false,
  };
};

const rootView = async (source: SkillSource): Promise<RootView> => {
  try {
    const info = await fs.stat(source.path);
    return {
      sourceId: source.id,
      scope: source.scope,
      label: source.label,
      path: source.path,
      exists: info.isDirectory(),
      error: info.isDirectory() ? null : 'Not a directory',
    };
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    return {
      sourceId: source.id,
      scope: source.scope,
      label: source.label,
      path: source.path,
      exists: false,
      error: code === 'ENOENT' ? null : describeFs(error),
    };
  }
};

const classify = async (directory: string, entry: Dirent): Promise<EntryKind> => {
  if (entry.isFile()) return 'file';
  if (entry.isDirectory()) return 'dir';
  if (!entry.isSymbolicLink()) return 'other';
  try {
    const info = await fs.stat(path.join(directory, entry.name));
    return info.isFile() ? 'file' : info.isDirectory() ? 'dir' : 'other';
  } catch {
    return 'other';
  }
};

const readFrontmatterFor = async (
  id: string,
  activePath: string | null,
  disabledPath: string | null,
): Promise<{ frontmatter: Frontmatter; error: string | null }> => {
  let activeError: string | null = null;
  if (activePath) {
    try {
      const info = await fs.stat(activePath);
      if (info.size > MAX_SKILL_BYTES) activeError = 'The entry file exceeds 2 MB';
      else {
        const text = await fs.readFile(activePath, 'utf8');
        return { frontmatter: parseFrontmatter(text, id), error: null };
      }
    } catch (error) {
      activeError = describeFs(error);
    }
  }
  if (disabledPath) {
    try {
      const info = await fs.stat(disabledPath);
      if (info.size > MAX_SKILL_BYTES) {
        return { frontmatter: fallbackFrontmatter(id), error: activeError ?? 'The disabled entry exceeds 2 MB' };
      }
      const text = await fs.readFile(disabledPath, 'utf8');
      return { frontmatter: parseFrontmatter(text, id), error: activeError };
    } catch (error) {
      return { frontmatter: fallbackFrontmatter(id), error: activeError ?? describeFs(error) };
    }
  }
  return { frontmatter: fallbackFrontmatter(id), error: activeError ?? 'Could not read the entry file' };
};

const scanDirectory = async (
  root: RootView,
  source: SkillSource,
  directory: string,
  depth: number,
  entries: Entry[],
  visited: Set<string>,
): Promise<void> => {
  let dirents: Dirent[];
  try {
    dirents = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (!root.error) root.error = `Could not read ${directory}: ${describeFs(error)}`;
    return;
  }

  const visible = dirents.filter((entry) => !entry.name.startsWith('.') && !IGNORED_DIRS.has(entry.name));
  const classified = await Promise.all(visible.map(async (entry) => ({ entry, kind: await classify(directory, entry) })));
  const active = classified.find((item) => item.kind === 'file' && item.entry.name === 'SKILL.md');
  const disabled = classified.find((item) => item.kind === 'file' && item.entry.name === 'SKILL.md.disabled');

  if (active || disabled) {
    const id = path.basename(directory);
    const activePath = active ? path.join(directory, 'SKILL.md') : null;
    const disabledPath = disabled ? path.join(directory, 'SKILL.md.disabled') : null;
    const { frontmatter, error } = await readFrontmatterFor(id, activePath, disabledPath);
    entries.push({ id, source, activePath, disabledPath, frontmatter, error });
    if (active) return;
  }

  if (depth === 0) {
    const flat = classified.filter(
      (item) =>
        item.kind === 'file' &&
        item.entry.name !== 'SKILL.md.disabled' &&
        (item.entry.name.endsWith('.md') || item.entry.name.endsWith('.md.disabled')),
    );
    const ids = new Set<string>();
    for (const item of flat) {
      ids.add(item.entry.name.endsWith('.md.disabled')
        ? item.entry.name.slice(0, -'.md.disabled'.length)
        : item.entry.name.slice(0, -'.md'.length));
    }
    for (const id of ids) {
      const activeItem = flat.find((item) => item.entry.name === `${id}.md`);
      const disabledItem = flat.find((item) => item.entry.name === `${id}.md.disabled`);
      const activePath = activeItem ? path.join(directory, activeItem.entry.name) : null;
      const disabledPath = disabledItem ? path.join(directory, disabledItem.entry.name) : null;
      if (!activePath && !disabledPath) continue;
      const { frontmatter, error } = await readFrontmatterFor(id, activePath, disabledPath);
      entries.push({ id, source, activePath, disabledPath, frontmatter, error });
    }
  }

  if (depth >= MAX_DEPTH) return;
  for (const item of classified) {
    if (item.kind !== 'dir') continue;
    const child = path.join(directory, item.entry.name);
    let real = child;
    try {
      real = await fs.realpath(child);
    } catch {
    }
    if (visited.has(real)) continue;
    visited.add(real);
    await scanDirectory(root, source, child, depth + 1, entries, visited);
  }
};

const addConflict = (conflicts: ConflictView[], seen: Set<string>, conflict: ConflictView): void => {
  const key = [conflict.kind, conflict.skillId, conflict.activePath ?? '', conflict.disabledPath ?? '', conflict.message].join('|');
  if (seen.has(key)) return;
  seen.add(key);
  conflicts.push(conflict);
};

const estimateTokens = (name: string, id: string, description: string): number =>
  Math.max(1, Math.ceil((name.length + id.length + description.length) / 4) + 8);

const compareText = (left: string, right: string): number => (left < right ? -1 : left > right ? 1 : 0);

const buildResponse = (
  roots: RootView[],
  entries: Entry[],
  projectDirectory: string | null,
): SkillsResponse => {
  const groups = new Map<string, Entry[]>();
  for (const entry of entries) {
    const key = `${entry.source.id}:${entry.id}`;
    const group = groups.get(key);
    if (group) group.push(entry);
    else groups.set(key, [entry]);
  }

  const skills: SkillView[] = [];
  for (const [key, group] of groups) {
    const id = group[0]?.id ?? key;
    const source = group[0]?.source;
    group.sort((left, right) =>
      right.source.priority - left.source.priority ||
      compareText(left.activePath ?? left.disabledPath ?? '', right.activePath ?? right.disabledPath ?? ''),
    );
    const active = group.filter((entry) => entry.activePath);
    const disabled = group.filter((entry) => entry.disabledPath);
    const loadable = active.filter((entry) => !entry.error && entry.frontmatter.valid && !entry.frontmatter.empty);
    const winner = loadable.at(-1) ?? active.at(-1) ?? group[0] ?? null;
    const both = group.some((entry) => entry.activePath && entry.disabledPath);
    const state: SkillState = both
      ? 'conflict'
      : active.length > 0 && disabled.length > 0
        ? 'mixed'
        : active.length > 0
          ? 'enabled'
          : 'disabled';

    const conflicts: ConflictView[] = [];
    const seen = new Set<string>();
    for (const entry of group) {
      if (entry.activePath && entry.disabledPath) {
        addConflict(conflicts, seen, {
          kind: 'both',
          skillId: key,
          message: 'Both an enabled and a disabled entry exist in the same directory. Choose which one to keep first.',
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: true,
        });
      }
      if (entry.error) {
        addConflict(conflicts, seen, {
          kind: 'read-error',
          skillId: key,
          message: `Could not read the entry: ${entry.error}`,
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: false,
        });
      }
      if (!entry.frontmatter.valid) {
        addConflict(conflicts, seen, {
          kind: 'invalid',
          skillId: key,
          message: 'The frontmatter is not closed; OpenCode may skip this skill, but the entry switch still works.',
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: false,
        });
      }
      if (entry.frontmatter.empty) {
        addConflict(conflicts, seen, {
          kind: 'empty',
          skillId: key,
          message: 'The entry file is empty; OpenCode will not load it.',
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: false,
        });
      }
    }
    if (group.length > 1) {
      const winnerLabel = winner
        ? winner.activePath ?? winner.disabledPath ?? 'Unknown entry'
        : 'None (entry cannot be loaded)';
      addConflict(conflicts, seen, {
        kind: 'duplicate',
        skillId: key,
        message: `There are ${group.length} entries with this ID; the effective entry is ${winnerLabel}.`,
        activePath: winner?.activePath ?? null,
        disabledPath: winner?.disabledPath ?? null,
        blocking: false,
      });
    }
    if (winner?.activePath && winner.frontmatter.autoInvokeOff) {
      addConflict(conflicts, seen, {
        kind: 'manual',
        skillId: key,
        message: 'The entry is enabled but marked for manual invocation only; the model cannot see it.',
        activePath: winner.activePath,
        disabledPath: winner.disabledPath,
        blocking: false,
      });
    }
    if (winner?.activePath && !winner.error && winner.frontmatter.valid && !winner.frontmatter.empty && !winner.frontmatter.description.trim()) {
      addConflict(conflicts, seen, {
        kind: 'no-description',
        skillId: key,
        message: 'The entry is enabled but has no description; the model will not select it automatically.',
        activePath: winner.activePath,
        disabledPath: winner.disabledPath,
        blocking: false,
      });
    }

    const advertised = Boolean(
      winner &&
        winner.activePath &&
        !winner.error &&
        winner.frontmatter.valid &&
        !winner.frontmatter.empty &&
        winner.frontmatter.description.trim().length > 0 &&
        !winner.frontmatter.autoInvokeOff,
    );
    const name = winner?.frontmatter.name || id;
    const description = winner?.frontmatter.description ?? '';
    skills.push({
      key,
      id,
      scope: source?.scope ?? 'global',
      sourceId: source?.id ?? 'opencode-global',
      rootPath: source?.path ?? '',
      name,
      description,
      state,
      advertised,
      autoInvokeOff: winner?.frontmatter.autoInvokeOff ?? false,
      activePaths: active.flatMap((entry) => (entry.activePath ? [entry.activePath] : [])),
      disabledPaths: disabled.flatMap((entry) => (entry.disabledPath ? [entry.disabledPath] : [])),
      conflicts,
      warnings: Array.from(new Set(conflicts.filter((conflict) => !conflict.blocking).map((conflict) => conflict.message))),
      estimatedTokens: advertised ? estimateTokens(name, id, description) : 0,
    });
  }

  skills.sort((left, right) => compareText(left.key, right.key));
  const conflicts = skills.flatMap((skill) => skill.conflicts);
  conflicts.sort((left, right) => {
    if (left.blocking !== right.blocking) return left.blocking ? -1 : 1;
    const kind = CONFLICT_ORDER[left.kind] - CONFLICT_ORDER[right.kind];
    return kind !== 0 ? kind : compareText(left.skillId, right.skillId);
  });
  const summary: Summary = {
    total: skills.length,
    advertised: skills.filter((skill) => skill.advertised).length,
    disabled: skills.filter((skill) => skill.state === 'disabled').length,
    blockingConflicts: conflicts.filter((conflict) => conflict.blocking).length,
    warnings: conflicts.filter((conflict) => !conflict.blocking).length,
    estimatedTokens: skills.reduce((sum, skill) => sum + skill.estimatedTokens, 0),
  };
  return {
    skills,
    conflicts,
    summary,
    root: roots[0] ?? {
      sourceId: 'opencode-global',
      scope: 'global',
      label: 'Global OpenCode',
      path: '',
      exists: false,
      error: null,
    },
    roots,
    projectDirectory,
    scannedAt: Date.now(),
  };
};

export const scanSkills = async (value: string | ScanConfig): Promise<SkillsResponse> => {
  const config = scanConfig(value);
  const sources = resolveSources(config);
  const roots = await Promise.all(sources.map((source) => rootView(source)));
  const entries: Entry[] = [];
  for (const [index, root] of roots.entries()) {
    const source = sources[index];
    if (!root.exists || !source) continue;
    const visited = new Set<string>();
    try {
      visited.add(await fs.realpath(root.path));
    } catch {
      visited.add(root.path);
    }
    await scanDirectory(root, source, root.path, 0, entries, visited);
  }
  return buildResponse(roots, entries, config.projectDirectory ?? null);
};

/** Accepts a scope-qualified key or a bare ID when it is unambiguous. */
export const findSkill = (skills: readonly SkillView[], idOrKey: string): SkillView => {
  const exact = skills.find((skill) => skill.key === idOrKey);
  if (exact) return exact;
  const matches = skills.filter((skill) => skill.id === idOrKey);
  if (matches.length === 1 && matches[0]) return matches[0];
  if (matches.length > 1) {
    throw new SkillsError(
      'ambiguous',
      400,
      `Several sources have a skill named "${idOrKey}": ${matches.map((skill) => skill.key).join(', ')}.`,
    );
  }
  throw new SkillsError('not-found', 404, `Skill ${idOrKey} was not found.`);
};

const exists = async (file: string): Promise<boolean> => {
  try {
    await fs.lstat(file);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return false;
    throw error;
  }
};

const applyMoves = async (moves: Move[]): Promise<void> => {
  if (moves.length === 0) return;
  try {
    for (const move of moves) {
      if (await exists(move.to)) {
        throw new SkillsError('conflict', 409, `The target entry already exists: ${move.to}`);
      }
      if (!(await exists(move.from))) {
        throw new SkillsError('conflict', 409, `The entry changed. Rescan: ${move.from}`);
      }
    }
  } catch (error) {
    if (error instanceof SkillsError) throw error;
    throw new SkillsError('io', 500, `Could not inspect the entry: ${describeFs(error)}`);
  }

  const done: Move[] = [];
  try {
    for (const move of moves) {
      if (await exists(move.to)) {
        throw new SkillsError('conflict', 409, `The target entry already exists: ${move.to}`);
      }
      await fs.rename(move.from, move.to);
      done.push(move);
      if ((await exists(move.from)) || !(await exists(move.to))) {
        throw new SkillsError('io', 500, `Verification failed after renaming: ${move.to}`);
      }
    }
  } catch (error) {
    for (const move of done.reverse()) {
      try {
        if ((await exists(move.to)) && !(await exists(move.from))) await fs.rename(move.to, move.from);
      } catch {
      }
    }
    if (error instanceof SkillsError) throw error;
    throw new SkillsError('io', 500, `Rename failed: ${describeFs(error)}`);
  }
};

const assertRootReadable = (scan: SkillsResponse): void => {
  const broken = scan.roots.find((root) => root.error);
  if (broken) {
    throw new SkillsError('read-error', 409, `Could not read the ${broken.label} skill directory: ${broken.error}`);
  }
};

export const setSkillEnabled = async (
  value: string | ScanConfig,
  id: string,
  enabled: boolean,
): Promise<SkillsResponse> => {
  const config = scanConfig(value);
  const before = await scanSkills(config);
  assertRootReadable(before);
  const skill = findSkill(before.skills, id);
  if (skill.conflicts.some((conflict) => conflict.kind === 'both')) {
    throw new SkillsError('conflict', 409, `Skill ${id} has unresolved entry conflicts.`, skill.conflicts);
  }

  const moves: Move[] = [];
  if (!enabled) {
    for (const activePath of skill.activePaths) {
      moves.push({ id, from: activePath, to: `${activePath}.disabled` });
    }
  } else {
    for (const disabledPath of skill.disabledPaths) {
      if (!disabledPath.endsWith('.disabled')) {
        throw new SkillsError('io', 500, `Could not identify the disabled entry: ${disabledPath}`);
      }
      moves.push({ id, from: disabledPath, to: disabledPath.slice(0, -'.disabled'.length) });
    }
  }
  if (moves.length > 0) await applyMoves(moves);
  return scanSkills(config);
};

export const batchSetEnabled = async (
  value: string | ScanConfig,
  enable: string[],
  disable: string[],
): Promise<BatchResponse> => {
  const config = scanConfig(value);
  const before = await scanSkills(config);
  assertRootReadable(before);
  const enableIds = Array.from(new Set(enable));
  const disableIds = Array.from(new Set(disable));
  if (enableIds.some((id) => disableIds.includes(id))) {
    throw new SkillsError('invalid-request', 400, 'A skill cannot be enabled and disabled at the same time.');
  }
  if (enableIds.length + disableIds.length > 200) {
    throw new SkillsError('invalid-request', 400, 'Too many skills in one operation.');
  }
  const selected = new Map<string, SkillView>();
  for (const id of [...enableIds, ...disableIds]) {
    const skill = findSkill(before.skills, id);
    if (skill.conflicts.some((conflict) => conflict.kind === 'both')) {
      throw new SkillsError('conflict', 409, `Skill ${id} has unresolved entry conflicts.`, skill.conflicts);
    }
    selected.set(id, skill);
  }
  const moves: Move[] = [];
  for (const id of enableIds) {
    const skill = selected.get(id);
    if (!skill) continue;
    for (const disabledPath of skill.disabledPaths) {
      if (!disabledPath.endsWith('.disabled')) continue;
      moves.push({ id, from: disabledPath, to: disabledPath.slice(0, -'.disabled'.length) });
    }
  }
  for (const id of disableIds) {
    const skill = selected.get(id);
    if (!skill) continue;
    for (const activePath of skill.activePaths) {
      moves.push({ id, from: activePath, to: `${activePath}.disabled` });
    }
  }
  if (moves.length > 0) await applyMoves(moves);
  const after = await scanSkills(config);
  return { ...after, changed: Array.from(new Set(moves.map((move) => move.id))) };
};

export const bulkSetEnabled = async (
  value: string | ScanConfig,
  enabled: boolean,
): Promise<BulkResponse> => {
  const config = scanConfig(value);
  const before = await scanSkills(config);
  assertRootReadable(before);
  const blocking = before.conflicts.filter((conflict) => conflict.kind === 'both');
  if (blocking.length > 0) {
    throw new SkillsError('conflict', 409, 'Unresolved entry conflicts remain; bulk operations are blocked.', blocking);
  }

  const moves: Move[] = [];
  for (const skill of before.skills) {
    if (!enabled) {
      for (const activePath of skill.activePaths) {
        moves.push({ id: skill.key, from: activePath, to: `${activePath}.disabled` });
      }
    } else {
      for (const disabledPath of skill.disabledPaths) {
        if (!disabledPath.endsWith('.disabled')) continue;
        moves.push({ id: skill.key, from: disabledPath, to: disabledPath.slice(0, -'.disabled'.length) });
      }
    }
  }
  if (moves.length > 0) await applyMoves(moves);
  const after = await scanSkills(config);
  return { ...after, changed: Array.from(new Set(moves.map((move) => move.id))) };
};

export const resolveBoth = async (
  value: string | ScanConfig,
  entryPath: string,
  keep: Keep,
): Promise<ResolveResponse> => {
  const config = scanConfig(value);
  const before = await scanSkills(config);
  assertRootReadable(before);
  const skill = before.skills.find((item) =>
    item.activePaths.includes(entryPath) || item.disabledPaths.includes(entryPath),
  );
  if (!skill) throw new SkillsError('not-found', 404, 'This entry conflict was not found. Rescan.');
  let activePath: string | null = null;
  let disabledPath: string | null = null;
  if (skill.activePaths.includes(entryPath)) {
    activePath = entryPath;
    disabledPath = `${entryPath}.disabled`;
  } else if (skill.disabledPaths.includes(entryPath)) {
    disabledPath = entryPath;
    activePath = entryPath.endsWith('.disabled') ? entryPath.slice(0, -'.disabled'.length) : null;
  }
  if (
    !activePath ||
    !disabledPath ||
    !skill.activePaths.includes(activePath) ||
    !skill.disabledPaths.includes(disabledPath)
  ) {
    throw new SkillsError('not-found', 404, 'This entry conflict was not found. Rescan.');
  }

  const backupPath = `${disabledPath}.conflict-${Date.now()}-${randomUUID().slice(0, 8)}`;
  if (keep === 'enabled') {
    await applyMoves([{ id: skill.key, from: disabledPath, to: backupPath }]);
  } else {
    await applyMoves([{ id: skill.key, from: disabledPath, to: backupPath }]);
    try {
      await applyMoves([{ id: skill.key, from: activePath, to: disabledPath }]);
    } catch (error) {
      try {
        await applyMoves([{ id: skill.key, from: backupPath, to: disabledPath }]);
      } catch {
      }
      throw error;
    }
  }
  const after = await scanSkills(config);
  return { ...after, backupPath };
};
