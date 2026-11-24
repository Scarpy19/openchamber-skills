import test from 'node:test';
import assert from 'node:assert/strict';
import type { SkillView } from '../src/shared/types.ts';
import {
  filterAndSortSkills,
  isAttentionSkill,
  matchesSkillQuery,
  matchesSkillStateFilter,
  planInvertSkills,
} from '../src/shared/filter.ts';

const makeSkill = (overrides: Partial<SkillView> & Pick<SkillView, 'id' | 'name'>): SkillView => ({
  key: overrides.key ?? overrides.id,
  id: overrides.id,
  scope: overrides.scope ?? 'global',
  sourceId: overrides.sourceId ?? 'opencode-global',
  rootPath: overrides.rootPath ?? '/tmp/skills',
  name: overrides.name,
  description: overrides.description ?? `${overrides.name} description`,
  state: overrides.state ?? 'enabled',
  advertised: overrides.advertised ?? (overrides.state ?? 'enabled') === 'enabled',
  autoInvokeOff: overrides.autoInvokeOff ?? false,
  activePaths: overrides.activePaths ?? [`/tmp/skills/${overrides.id}/SKILL.md`],
  disabledPaths: overrides.disabledPaths ?? [],
  conflicts: overrides.conflicts ?? [],
  warnings: overrides.warnings ?? [],
  estimatedTokens: overrides.estimatedTokens ?? 120,
});

test('state filter separates enabled, disabled, and attention skills', () => {
  const normal = makeSkill({ id: 'alpha', name: 'Alpha', state: 'enabled', advertised: true });
  const manualOnly = makeSkill({ id: 'manual', name: 'Manual', state: 'enabled', advertised: false });
  const off = makeSkill({ id: 'beta', name: 'Beta', state: 'disabled', advertised: false });
  const conflicted = makeSkill({ id: 'gamma', name: 'Gamma', state: 'conflict', advertised: false });

  assert.equal(isAttentionSkill(normal), false);
  assert.equal(isAttentionSkill(manualOnly), true);
  assert.equal(isAttentionSkill(off), false);
  assert.equal(isAttentionSkill(conflicted), true);

  assert.equal(matchesSkillStateFilter(normal, 'enabled'), true);
  assert.equal(matchesSkillStateFilter(off, 'disabled'), true);
  assert.equal(matchesSkillStateFilter(manualOnly, 'attention'), true);
  assert.equal(matchesSkillStateFilter(conflicted, 'attention'), true);
});

test('search matches id, name, description, and warnings', () => {
  const skill = makeSkill({
    id: 'zeta',
    name: 'Zeta Heavy',
    description: 'Refactors large SwiftUI views',
    warnings: ['Entry is enabled but has no description'],
  });
  assert.equal(matchesSkillQuery(skill, 'zeta'), true);
  assert.equal(matchesSkillQuery(skill, 'SWIFTUI'), true);
  assert.equal(matchesSkillQuery(skill, 'no description'), true);
  assert.equal(matchesSkillQuery(skill, 'missing-text'), false);
  assert.equal(matchesSkillQuery(skill, '   '), true);
});

test('filterAndSortSkills sorts by tokens, name, and state', () => {
  const skills: SkillView[] = [
    makeSkill({ id: 'alpha', name: 'Alpha', estimatedTokens: 90 }),
    makeSkill({ id: 'zeta', name: 'Zeta Heavy', estimatedTokens: 640 }),
    makeSkill({ id: 'beta', name: 'Beta Warn', estimatedTokens: 210, warnings: ['Entry is enabled but has no description'] }),
  ];

  const byTokens = filterAndSortSkills(skills, {
    query: '',
    stateFilter: 'all',
    sortMode: 'tokens',
  });
  assert.deepEqual(byTokens.map((skill) => skill.id), ['zeta', 'beta', 'alpha']);

  const byName = filterAndSortSkills(skills, {
    query: '',
    stateFilter: 'all',
    sortMode: 'name',
  });
  assert.deepEqual(byName.map((skill) => skill.id), ['alpha', 'beta', 'zeta']);

  const attention = filterAndSortSkills(skills, {
    query: 'entry',
    stateFilter: 'attention',
    sortMode: 'default',
  });
  assert.deepEqual(attention.map((skill) => skill.id), ['beta']);
});

test('source filter separates global and project skills', () => {
  const skills: SkillView[] = [
    makeSkill({ id: 'alpha', name: 'Global Alpha', key: 'opencode-global:alpha', scope: 'global' }),
    makeSkill({ id: 'alpha', name: 'Project Alpha', key: 'opencode-project:alpha', scope: 'project' }),
  ];
  const options = { query: '', stateFilter: 'all' as const, sortMode: 'default' as const };
  assert.deepEqual(
    filterAndSortSkills(skills, { ...options, sourceFilter: 'global' }).map((skill) => skill.key),
    ['opencode-global:alpha'],
  );
  assert.deepEqual(
    filterAndSortSkills(skills, { ...options, sourceFilter: 'project' }).map((skill) => skill.key),
    ['opencode-project:alpha'],
  );
});

test('planInvertSkills flips simple states and skips ambiguous entries', () => {
  const skills: SkillView[] = [
    makeSkill({ id: 'on', name: 'On', state: 'enabled', key: 'opencode-global:on' }),
    makeSkill({ id: 'off', name: 'Off', state: 'disabled', advertised: false, key: 'opencode-project:off', scope: 'project' }),
    makeSkill({ id: 'mixed', name: 'Mixed', state: 'mixed', advertised: false }),
    makeSkill({ id: 'bad', name: 'Bad', state: 'conflict', advertised: false }),
  ];
  assert.deepEqual(planInvertSkills(skills), { enable: ['opencode-project:off'], disable: ['opencode-global:on'] });
  assert.deepEqual(planInvertSkills([]), { enable: [], disable: [] });
});

test('state sort puts conflicts first and disabled skills last', () => {
  const skills: SkillView[] = [
    makeSkill({ id: 'off', name: 'Off', state: 'disabled', advertised: false }),
    makeSkill({ id: 'ok', name: 'Ok', state: 'enabled' }),
    makeSkill({ id: 'bad', name: 'Bad', state: 'conflict', advertised: false }),
    makeSkill({ id: 'mixed', name: 'Mixed', state: 'mixed', advertised: false }),
  ];
  const sorted = filterAndSortSkills(skills, { query: '', stateFilter: 'all', sortMode: 'state' });
  assert.deepEqual(sorted.map((skill) => skill.id), ['bad', 'mixed', 'ok', 'off']);
});
