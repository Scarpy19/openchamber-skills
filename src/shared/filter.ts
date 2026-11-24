import type { SkillView } from './types.ts';

export type SkillStateFilter = 'all' | 'enabled' | 'disabled' | 'attention';
export type SkillSourceFilter = 'all' | 'global' | 'project';
export type SkillSortMode = 'default' | 'tokens' | 'name' | 'state';

export type SkillTogglePlan = {
  enable: string[];
  disable: string[];
};

const compareNames = (a: SkillView, b: SkillView): number =>
  a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }) || a.id.localeCompare(b.id);

const stateRank = (skill: SkillView): number => {
  switch (skill.state) {
    case 'conflict':
      return 0;
    case 'mixed':
      return 1;
    case 'enabled':
      return 2;
    default:
      return 3;
  }
};

export const isAttentionSkill = (skill: SkillView): boolean =>
  skill.state === 'conflict' ||
  skill.state === 'mixed' ||
  skill.conflicts.length > 0 ||
  skill.warnings.length > 0 ||
  (skill.state === 'enabled' && !skill.advertised);

export const matchesSkillStateFilter = (skill: SkillView, filter: SkillStateFilter): boolean => {
  switch (filter) {
    case 'enabled':
      return skill.state === 'enabled';
    case 'disabled':
      return skill.state === 'disabled';
    case 'attention':
      return isAttentionSkill(skill);
    case 'all':
    default:
      return true;
  }
};

export const matchesSkillQuery = (skill: SkillView, query: string): boolean => {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return true;
  const haystack = [skill.id, skill.name, skill.description, ...skill.warnings].join(' ').toLowerCase();
  return haystack.includes(trimmed);
};

/** Plans a reversible toggle of simple enabled/disabled skills. Mixed and conflicting entries are skipped. */
export const planInvertSkills = (skills: readonly SkillView[]): SkillTogglePlan => ({
  enable: skills.filter((skill) => skill.state === 'disabled').map((skill) => skill.key ?? skill.id),
  disable: skills.filter((skill) => skill.state === 'enabled').map((skill) => skill.key ?? skill.id),
});

export const filterAndSortSkills = (
  skills: readonly SkillView[],
  options: {
    query: string;
    stateFilter: SkillStateFilter;
    sourceFilter?: SkillSourceFilter;
    sortMode: SkillSortMode;
  },
): SkillView[] => {
  const sourceFilter = options.sourceFilter ?? 'all';
  const filtered = skills.filter(
    (skill) =>
      (sourceFilter === 'all' || skill.scope === sourceFilter) &&
      matchesSkillStateFilter(skill, options.stateFilter) &&
      matchesSkillQuery(skill, options.query),
  );
  switch (options.sortMode) {
    case 'tokens':
      return [...filtered].sort((a, b) => b.estimatedTokens - a.estimatedTokens || compareNames(a, b));
    case 'name':
      return [...filtered].sort(compareNames);
    case 'state':
      return [...filtered].sort((a, b) => stateRank(a) - stateRank(b) || compareNames(a, b));
    case 'default':
    default:
      return filtered;
  }
};
