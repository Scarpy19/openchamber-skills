import path from 'node:path';
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
    { id: 'opencode-global', scope: 'global', label: 'Global OpenCode', path: path.join(config, 'opencode', 'skills'), priority: 30 },
    { id: 'claude-global', scope: 'global', label: 'Global Claude-compatible', path: path.join(home, '.claude', 'skills'), priority: 20 },
    { id: 'agents-global', scope: 'global', label: 'Global agent-compatible', path: path.join(home, '.agents', 'skills'), priority: 10 },
  ];
  if (!projectDirectory) return global;
  return [
    ...global,
    { id: 'opencode-project', scope: 'project', label: 'Project OpenCode', path: path.join(projectDirectory, '.opencode', 'skills'), priority: 60 },
    { id: 'claude-project', scope: 'project', label: 'Project Claude-compatible', path: path.join(projectDirectory, '.claude', 'skills'), priority: 50 },
    { id: 'agents-project', scope: 'project', label: 'Project agent-compatible', path: path.join(projectDirectory, '.agents', 'skills'), priority: 40 },
  ];
};

export const scanConfig = (value: string | ScanConfig): ScanConfig =>
  typeof value === 'string' ? { home: value } : value;
