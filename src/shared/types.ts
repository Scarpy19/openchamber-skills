export type SkillState = 'enabled' | 'disabled' | 'mixed' | 'conflict';

export type SkillScope = 'global' | 'project';

export type ConflictKind =
  | 'both'
  | 'duplicate'
  | 'invalid'
  | 'empty'
  | 'read-error'
  | 'manual'
  | 'no-description';

export type RootView = {
  sourceId: string;
  scope: SkillScope;
  label: string;
  path: string;
  exists: boolean;
  error: string | null;
};

export type ConflictView = {
  kind: ConflictKind;
  skillId: string;
  message: string;
  activePath: string | null;
  disabledPath: string | null;
  blocking: boolean;
};

export type SkillView = {
  key: string;
  id: string;
  scope: SkillScope;
  sourceId: string;
  rootPath: string;
  name: string;
  description: string;
  state: SkillState;
  advertised: boolean;
  autoInvokeOff: boolean;
  activePaths: string[];
  disabledPaths: string[];
  conflicts: ConflictView[];
  warnings: string[];
  estimatedTokens: number;
  duplicateResolution?: {
    status: 'highest-scanned' | 'shadowed' | 'unknown';
    winningPath: string | null;
  };
};

export type Summary = {
  total: number;
  advertised: number;
  disabled: number;
  blockingConflicts: number;
  warnings: number;
  estimatedTokens: number;
};

export type SkillsResponse = {
  skills: SkillView[];
  conflicts: ConflictView[];
  summary: Summary;
  root: RootView;
  roots: RootView[];
  projectDirectory: string | null;
  scannedAt: number;
};

export type BulkResponse = SkillsResponse & {
  changed: string[];
};

export type BatchResponse = SkillsResponse & {
  changed: string[];
};

export type ResolveResponse = SkillsResponse & {
  backupPath: string;
};

export type ErrorResponse = {
  error: string;
  code?: string;
  conflicts?: ConflictView[];
};
