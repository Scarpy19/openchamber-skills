export type SkillGroup = {
  id: string;
  name: string;
  skillIds: string[];
};

export type GroupsFile = {
  version: 1;
  groups: SkillGroup[];
};

export const GROUP_LIMIT = 50;
export const GROUP_NAME_MAX = 40;
export const GROUP_MEMBER_LIMIT = 200;
export const GROUP_ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;
const RESERVED_GROUP_IDS = new Set(['all', 'new']);

export class GroupFileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GroupFileError';
  }
}

export const EXAMPLE_SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'macos-ui',
    name: 'macOS UI',
    skillIds: [
      'appkit-interop',
      'swiftui-patterns',
      'window-management',
      'liquid-glass',
      'view-refactor',
    ],
  },
  {
    id: 'macos-build',
    name: 'macOS Build',
    skillIds: [
      'build-run-debug',
      'test-triage',
      'swiftpm-macos',
      'signing-entitlements',
      'packaging-notarization',
      'telemetry',
    ],
  },
  {
    id: 'reverse',
    name: 'Reverse Engineering',
    skillIds: [
      'reverse-engineering-unpacking',
      'kuna-decompiler',
      'reverse-engineer-anything',
    ],
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    skillIds: ['cloudflare', 'workers-best-practices', 'wrangler'],
  },
  {
    id: 'video',
    name: 'Video',
    skillIds: ['yichen-jianying-edit'],
  },
  {
    id: 'browser',
    name: 'Browser',
    skillIds: ['browser-skill'],
  },
];

export const cloneExampleGroups = (): SkillGroup[] =>
  EXAMPLE_SKILL_GROUPS.map((group) => ({ ...group, skillIds: [...group.skillIds] }));

export const mergeExampleGroups = (existing: SkillGroup[]): { groups: SkillGroup[]; added: SkillGroup[] } => {
  const ids = new Set(existing.map((group) => group.id));
  const names = new Set(existing.map((group) => group.name.trim().toLowerCase()));
  const added = cloneExampleGroups().filter((group) => {
    const name = group.name.toLowerCase();
    if (ids.has(group.id) || names.has(name)) return false;
    ids.add(group.id);
    names.add(name);
    return true;
  });
  return { groups: [...existing, ...added], added };
};

export const moveGroupMember = (members: readonly string[], index: number, delta: -1 | 1): string[] => {
  const targetIndex = index + delta;
  if (index < 0 || index >= members.length || targetIndex < 0 || targetIndex >= members.length) {
    return [...members];
  }
  const next = [...members];
  const [moved] = next.splice(index, 1);
  next.splice(targetIndex, 0, moved);
  return next;
};

export const normalizeGroupsFile = (value: unknown): GroupsFile => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new GroupFileError('The group configuration format is invalid.');
  }
  const record = value as Record<string, unknown>;
  if (record.version !== 1) throw new GroupFileError('The group configuration version is not supported.');
  if (!Array.isArray(record.groups)) throw new GroupFileError('The group list format is invalid.');
  if (record.groups.length > GROUP_LIMIT) throw new GroupFileError(`At most ${GROUP_LIMIT} groups are allowed.`);

  const groups: SkillGroup[] = [];
  const groupIds = new Set<string>();
  const names = new Set<string>();
  for (const [index, item] of record.groups.entries()) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      throw new GroupFileError(`Group ${index + 1} has an invalid format.`);
    }
    const group = item as Record<string, unknown>;
    if (typeof group.id !== 'string' || !GROUP_ID_PATTERN.test(group.id) || RESERVED_GROUP_IDS.has(group.id)) {
      throw new GroupFileError(`Group ${index + 1} has an invalid ID.`);
    }
    if (groupIds.has(group.id)) throw new GroupFileError(`Duplicate group ID: ${group.id}`);
    const name = typeof group.name === 'string' ? group.name.trim() : '';
    if (!name || name.length > GROUP_NAME_MAX || /[\u0000-\u001f\u007f]/.test(name)) {
      throw new GroupFileError(`Group ${index + 1} names must be 1–${GROUP_NAME_MAX} characters.`);
    }
    const nameKey = name.toLowerCase();
    if (names.has(nameKey)) throw new GroupFileError(`Duplicate group name: ${name}`);
    if (!Array.isArray(group.skillIds)) throw new GroupFileError(`The members of group "${name}" have an invalid format.`);
    if (group.skillIds.length > GROUP_MEMBER_LIMIT) {
      throw new GroupFileError(`Group "${name}" cannot have more than ${GROUP_MEMBER_LIMIT} members.`);
    }
    const skillIds: string[] = [];
    const seen = new Set<string>();
    for (const skillId of group.skillIds) {
      if (typeof skillId !== 'string' || !skillId || skillId.length > 128) {
        throw new GroupFileError(`Group "${name}" contains an invalid skill ID.`);
      }
      if (seen.has(skillId)) continue;
      seen.add(skillId);
      skillIds.push(skillId);
    }
    groupIds.add(group.id);
    names.add(nameKey);
    groups.push({ id: group.id, name, skillIds });
  }
  return { version: 1, groups };
};
