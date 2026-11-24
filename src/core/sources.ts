import path from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { parse } from 'jsonc-parser';
import type { SkillScope } from '../shared/types.ts';

/** A directory OpenCode discovers file skills from. Higher priority wins when IDs collide. */
export type SkillSource = {
  id: string;
  scope: SkillScope;
  label: string;
  path: string;
  priority: number;
};

export type ScanConfig = {
  home: string;
  projectDirectory?: string | null;
};

/** Linux honours XDG_CONFIG_HOME; Windows and macOS fall back to the user profile. */
export const configHome = (home: string): string => {
  const override = process.env.XDG_CONFIG_HOME;
  return override && path.isAbsolute(override) ? override : path.join(home, '.config');
};

/** Project directories come from the host panel, never from the service process. */
export const normalizeProjectDirectory = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const text = value.trim();
  if (!text || text.length > 4096 || !path.isAbsolute(text)) return null;
  return path.resolve(text);
};

export const resolveSources = ({ home, projectDirectory }: ScanConfig): SkillSource[] => {
  const config = configHome(home);
  const global: SkillSource[] = [
    { id: 'opencode-global', scope: 'global', label: 'Global OpenCode', path: path.join(config, 'opencode', 'skills'), priority: 30000 },
    { id: 'claude-global', scope: 'global', label: 'Global Claude-compatible', path: path.join(home, '.claude', 'skills'), priority: 10000 },
    { id: 'agents-global', scope: 'global', label: 'Global agent-compatible', path: path.join(home, '.agents', 'skills'), priority: 20000 },
  ];
  const configs: { file: string; scope: SkillScope }[] = [
    { file: path.join(config, 'opencode', 'opencode.json'), scope: 'global' },
    { file: path.join(config, 'opencode', 'opencode.jsonc'), scope: 'global' },
  ];
  // A .git file also identifies a worktree root. Without one, the host's
  // directory is the only boundary we can establish without guessing.
  const ancestors: string[] = projectDirectory ? [projectDirectory] : [];
  if (projectDirectory) {
    let cursor = projectDirectory;
    while (!existsSync(path.join(cursor, '.git'))) {
      const parent = path.dirname(cursor);
      if (parent === cursor) break;
      cursor = parent;
      ancestors.push(cursor);
    }
    if (!existsSync(path.join(cursor, '.git'))) ancestors.splice(1);
    ancestors.reverse();
  }
  const project = ancestors.flatMap((directory, index): SkillSource[] => {
    const suffix = directory === projectDirectory
      ? ''
      : `-${createHash('sha256').update(directory).digest('hex').slice(0, 12)}`;
    return [
      { id: `opencode-project${suffix}`, scope: 'project', label: 'Project OpenCode', path: path.join(directory, '.opencode', 'skills'), priority: 40000 + index },
      { id: `claude-project${suffix}`, scope: 'project', label: 'Project Claude-compatible', path: path.join(directory, '.claude', 'skills'), priority: 10001 + index },
      { id: `agents-project${suffix}`, scope: 'project', label: 'Project agent-compatible', path: path.join(directory, '.agents', 'skills'), priority: 20001 + index },
    ];
  });
  for (const directory of ancestors) {
    for (const name of ['opencode.json', 'opencode.jsonc', '.opencode/opencode.json', '.opencode/opencode.jsonc']) {
      configs.push({ file: path.join(directory, name), scope: 'project' });
    }
  }
  const sources = [...global, ...project];
  let priority = 50000;
  for (const entry of configs) {
    let value: unknown;
    try { value = parse(readFileSync(entry.file, 'utf8')); } catch { continue; }
    if (!value || typeof value !== 'object') continue;
    const skills = (value as Record<string, unknown>).skills;
    if (!Array.isArray(skills)) continue;
    for (const item of skills) {
      if (typeof item !== 'string' || !item || /^https?:\/\//i.test(item)) continue;
      const expanded = item.startsWith('~/') || item.startsWith('~\\') ? path.join(home, item.slice(2)) : item;
      const root = path.resolve(projectDirectory ?? home, expanded);
      const existing = sources.find((source) => source.path === root);
      if (existing) {
        existing.priority = priority++;
        continue;
      }
      sources.push({
        id: `configured-${createHash('sha256').update(root).digest('hex').slice(0, 16)}`,
        scope: entry.scope,
        label: 'Configured local skill directory',
        path: root,
        priority: priority++,
      });
    }
  }
  return sources;
};

export const scanConfig = (value: string | ScanConfig): ScanConfig =>
  typeof value === 'string' ? { home: value } : value;
