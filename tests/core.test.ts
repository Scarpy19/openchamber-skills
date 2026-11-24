import test, { type TestContext } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, stat, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  SkillsError,
  batchSetEnabled,
  bulkSetEnabled,
  parseFrontmatter,
  resolveBoth,
  scanSkills,
  setSkillEnabled,
} from '../src/core/skills.ts';

const skillText = (name: string, description: string, extra = ''): string =>
  `---\nname: ${name}\ndescription: ${description}\n${extra}---\n\nBody for ${name}.\n`;

const home = async (t: TestContext): Promise<string> => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'skills-core-'));
  await mkdir(path.join(directory, '.config/opencode/skills'), { recursive: true });
  const previousXdg = process.env.XDG_CONFIG_HOME;
  process.env.XDG_CONFIG_HOME = path.join(directory, '.config');
  t.after(() => {
    if (previousXdg === undefined) delete process.env.XDG_CONFIG_HOME;
    else process.env.XDG_CONFIG_HOME = previousXdg;
  });
  return directory;
};

const rootPath = (directory: string): string => path.join(directory, '.config/opencode/skills');

const put = async (directory: string, id: string, text: string): Promise<string> => {
  const directoryPath = path.join(rootPath(directory), id);
  await mkdir(directoryPath, { recursive: true });
  const file = path.join(directoryPath, 'SKILL.md');
  await writeFile(file, text);
  return file;
};

const exists = async (file: string): Promise<boolean> => {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
};

test('frontmatter reads names, descriptions, autoinvoke and malformed blocks', () => {
  const plain = parseFrontmatter(skillText('Alpha', 'Alpha skill'), 'alpha');
  assert.equal(plain.name, 'Alpha');
  assert.equal(plain.description, 'Alpha skill');
  assert.equal(plain.valid, true);
  assert.equal(plain.autoInvokeOff, false);

  const folded = parseFrontmatter(
    '---\nname: "Folded"\ndescription: >\n  line one\n  line two\nmetadata:\n  opencode/autoinvoke: false\n---\nbody',
    'folded',
  );
  assert.equal(folded.name, 'Folded');
  assert.equal(folded.description, 'line one line two');
  assert.equal(folded.autoInvokeOff, true);

  const manual = parseFrontmatter(skillText('Manual', 'Manual skill', 'disable-model-invocation: true\n'), 'manual');
  assert.equal(manual.autoInvokeOff, true);

  const metadataWins = parseFrontmatter(
    '---\nname: Meta\ndescription: Meta skill\ndisable-model-invocation: true\nmetadata:\n  opencode/autoinvoke: true\n---\n',
    'meta',
  );
  assert.equal(metadataWins.autoInvokeOff, false);

  const broken = parseFrontmatter('---\nname: Broken\ndescription: nope\n', 'broken');
  assert.equal(broken.valid, false);
  assert.equal(broken.name, 'broken');

  const empty = parseFrontmatter('   \n', 'empty');
  assert.equal(empty.empty, true);
  assert.equal(empty.name, 'empty');

  const noFrontmatter = parseFrontmatter('Just a body\n', 'plain');
  assert.equal(noFrontmatter.hasFrontmatter, false);
  assert.equal(noFrontmatter.valid, true);
  assert.equal(noFrontmatter.description, '');

  const commented = parseFrontmatter('---\r\nname: "Quoted # name"\r\ndescription: Plain text # ignored note\r\n---\r\nbody', 'commented');
  assert.equal(commented.name, 'Quoted # name');
  assert.equal(commented.description, 'Plain text');

  const bom = parseFrontmatter('\uFEFF---\nname: Bom\ndescription: Handles a byte-order mark\n---\nbody', 'bom');
  assert.equal(bom.name, 'Bom');
  assert.equal(bom.description, 'Handles a byte-order mark');
});

test('scan reads all global skill roots and reports entry conflicts', async (t) => {
  const directory = await home(t);
  t.after(() => rm(directory, { recursive: true, force: true }));

  await put(directory, 'alpha', skillText('Alpha', 'Alpha skill'));
  await put(directory, 'manual', skillText('Manual', 'Manual skill', 'disable-model-invocation: true\n'));
  await put(directory, 'nodesc', '---\nname: No description\n---\nbody\n');
  await put(directory, 'nested/team', skillText('Team', 'Nested skill'));
  await writeFile(path.join(rootPath(directory), 'beta.md'), skillText('Beta', 'Flat skill'));

  await put(directory, 'dupe', skillText('Dupe nested', 'Nested duplicate'));
  await writeFile(path.join(rootPath(directory), 'dupe.md'), skillText('Dupe flat', 'Flat duplicate'));
  const both = await put(directory, 'both', skillText('Both', 'Conflict skill'));
  await writeFile(path.join(path.dirname(both), 'SKILL.md.disabled'), skillText('Both old', 'Old copy'));
  await mkdir(path.join(rootPath(directory), 'manual-off'), { recursive: true });
  await writeFile(
    path.join(rootPath(directory), 'manual-off/SKILL.md.disabled'),
    skillText('Manual off', 'Disabled manual skill', 'disable-model-invocation: true\n'),
  );
  await mkdir(path.join(rootPath(directory), 'nodesc-off'), { recursive: true });
  await writeFile(path.join(rootPath(directory), 'nodesc-off/SKILL.md.disabled'), '---\nname: No desc off\n---\nbody\n');

  await mkdir(path.join(directory, '.claude/skills/other'), { recursive: true });
  await writeFile(path.join(directory, '.claude/skills/other/SKILL.md'), skillText('Other', 'Other agent skill'));

  const scan = await scanSkills(directory);
  const byId = new Map(scan.skills.map((skill) => [skill.id, skill]));
  assert.equal(byId.get('alpha')?.advertised, true);
  assert.equal(byId.get('beta')?.advertised, true);
  assert.equal(byId.get('team')?.advertised, true);
  assert.equal(byId.get('manual')?.advertised, false);
  assert.ok(byId.get('manual')?.conflicts.some((conflict) => conflict.kind === 'manual'));
  assert.equal(byId.get('nodesc')?.advertised, false);
  assert.ok(byId.get('nodesc')?.conflicts.some((conflict) => conflict.kind === 'no-description'));
  assert.equal(byId.get('dupe')?.activePaths.length, 2);
  assert.ok(byId.get('dupe')?.conflicts.some((conflict) => conflict.kind === 'duplicate'));
  assert.equal(byId.get('both')?.state, 'conflict');
  assert.ok(byId.get('both')?.conflicts.some((conflict) => conflict.kind === 'both'));
  assert.equal(byId.get('manual-off')?.state, 'disabled');
  assert.equal(byId.get('manual-off')?.conflicts.some((conflict) => conflict.kind === 'manual'), false);
  assert.equal(byId.get('nodesc-off')?.state, 'disabled');
  assert.equal(byId.get('nodesc-off')?.conflicts.some((conflict) => conflict.kind === 'no-description'), false);
  assert.equal(byId.get('other')?.scope, 'global');
  assert.equal(byId.get('other')?.sourceId, 'claude-global');
  assert.equal(byId.get('alpha')?.key, 'opencode-global:alpha');
  assert.equal(scan.root.path, rootPath(directory));
  assert.equal(scan.root.exists, true);
  assert.equal(scan.root.error, null);
  assert.equal(scan.roots.length, 3);
  assert.ok(scan.summary.blockingConflicts >= 1);
});

test('project skills are discovered, identified and toggled without touching global copies', async (t) => {
  const directory = await home(t);
  const project = path.join(directory, 'workspace');
  t.after(() => rm(directory, { recursive: true, force: true }));

  await put(directory, 'alpha', skillText('Global Alpha', 'Global skill'));
  const projectRoot = path.join(project, '.opencode/skills');
  await mkdir(path.join(projectRoot, 'alpha'), { recursive: true });
  const projectFile = path.join(projectRoot, 'alpha/SKILL.md');
  await writeFile(projectFile, skillText('Project Alpha', 'Project skill'));
  await writeFile(path.join(projectRoot, 'alpha.md'), skillText('Project Flat Alpha', 'Flat project skill'));
  await mkdir(path.join(project, '.claude/skills/beta'), { recursive: true });
  const betaFile = path.join(project, '.claude/skills/beta/SKILL.md');
  await writeFile(betaFile, skillText('Beta', 'Claude-compatible project skill'));

  const config = { home: directory, projectDirectory: project };
  const scan = await scanSkills(config);
  const global = scan.skills.find((skill) => skill.key === 'opencode-global:alpha');
  const local = scan.skills.find((skill) => skill.key === 'opencode-project:alpha');
  const claudeProject = scan.skills.find((skill) => skill.key === 'claude-project:beta');
  assert.equal(global?.scope, 'global');
  assert.equal(local?.scope, 'project');
  assert.equal(local?.rootPath, projectRoot);
  assert.equal(local?.duplicateResolution?.status, 'unknown');
  assert.equal(claudeProject?.advertised, true);
  assert.equal(scan.projectDirectory, project);
  assert.equal(scan.roots.length, 6);

  const duplicate = scan.conflicts.find((conflict) => conflict.kind === 'duplicate' && conflict.skillId === 'opencode-project:alpha');
  assert.ok(duplicate);
  assert.equal(duplicate?.activePath, path.join(projectRoot, 'alpha/SKILL.md'));

  const off = await setSkillEnabled(config, local?.key ?? 'missing', false);
  assert.equal(await exists(projectFile), false);
  assert.equal(await exists(`${projectFile}.disabled`), true);
  assert.equal(await exists(path.join(rootPath(directory), 'alpha/SKILL.md')), true);
  assert.equal(off.skills.find((skill) => skill.key === 'opencode-project:alpha')?.state, 'disabled');
  assert.equal(off.skills.find((skill) => skill.key === 'opencode-global:alpha')?.state, 'enabled');

  const on = await setSkillEnabled(config, local?.key ?? 'missing', true);
  assert.equal(await exists(projectFile), true);
  assert.equal(on.skills.find((skill) => skill.key === 'opencode-project:alpha')?.state, 'enabled');

  await assert.rejects(
    setSkillEnabled(config, 'alpha', false),
    (error: unknown) => error instanceof SkillsError && error.code === 'ambiguous',
  );
});

test('discovers ancestor roots in a git worktree and reports scanned precedence', async (t) => {
  const directory = await home(t);
  t.after(() => rm(directory, { recursive: true, force: true }));
  const project = path.join(directory, 'workspace');
  const nested = path.join(project, 'apps', 'web');
  await mkdir(nested, { recursive: true });
  await writeFile(path.join(project, '.git'), 'gitdir: elsewhere');
  const ancestorFile = path.join(project, '.opencode', 'skills', 'alpha', 'SKILL.md');
  const currentFile = path.join(nested, '.opencode', 'skills', 'alpha', 'SKILL.md');
  await mkdir(path.dirname(ancestorFile), { recursive: true });
  await mkdir(path.dirname(currentFile), { recursive: true });
  await writeFile(ancestorFile, skillText('Ancestor', 'Ancestor skill'));
  await writeFile(currentFile, skillText('Current', 'Current skill'));
  const result = await scanSkills({ home: directory, projectDirectory: nested });
  const ancestor = result.skills.find((skill) => skill.activePaths.includes(ancestorFile));
  const current = result.skills.find((skill) => skill.activePaths.includes(currentFile));
  assert.equal(ancestor?.duplicateResolution?.status, 'shadowed');
  assert.equal(current?.duplicateResolution?.status, 'highest-scanned');
  assert.equal(ancestor?.duplicateResolution?.winningPath, currentFile);
  assert.ok(ancestor?.warnings.some((warning) => warning.includes('another enabled')));
});

test('discovers local JSONC configured skill paths with precedence over standard roots', async (t) => {
  const directory = await home(t);
  t.after(() => rm(directory, { recursive: true, force: true }));
  const project = path.join(directory, 'workspace');
  const custom = path.join(project, 'team-skills', 'alpha', 'SKILL.md');
  await mkdir(path.dirname(custom), { recursive: true });
  await writeFile(custom, skillText('Configured', 'Configured skill'));
  await writeFile(path.join(project, 'opencode.jsonc'), '{\n // additional skills\n "skills": ["./team-skills", "https://example.com/catalog/"],\n}');
  await put(directory, 'alpha', skillText('Global', 'Global skill'));
  const scan = await scanSkills({ home: directory, projectDirectory: project });
  const configured = scan.skills.find((skill) => skill.activePaths.includes(custom));
  assert.equal(configured?.duplicateResolution?.status, 'highest-scanned');
  assert.equal(scan.skills.find((skill) => skill.key === 'opencode-global:alpha')?.duplicateResolution?.status, 'shadowed');
  assert.ok(scan.roots.some((root) => root.path === path.join(project, 'team-skills')));
});

test('toggles entry documents, all duplicate copies, and restores them', async (t) => {
  const directory = await home(t);
  t.after(() => rm(directory, { recursive: true, force: true }));

  const alpha = await put(directory, 'alpha', skillText('Alpha', 'Alpha skill'));
  const beta = path.join(rootPath(directory), 'beta.md');
  await writeFile(beta, skillText('Beta', 'Flat skill'));
  const dupeNested = await put(directory, 'dupe', skillText('Dupe nested', 'Nested duplicate'));
  const dupeFlat = path.join(rootPath(directory), 'dupe.md');
  await writeFile(dupeFlat, skillText('Dupe flat', 'Flat duplicate'));

  let scan = await scanSkills(directory);
  await setSkillEnabled(directory, 'alpha', false);
  scan = await scanSkills(directory);
  assert.equal(scan.skills.find((skill) => skill.id === 'alpha')?.state, 'disabled');
  assert.equal(await exists(`${alpha}.disabled`), true);
  await setSkillEnabled(directory, 'alpha', true);
  assert.equal(await exists(alpha), true);

  await setSkillEnabled(directory, 'beta', false);
  assert.equal(await exists(`${beta}.disabled`), true);
  assert.equal(await exists(beta), false);
  await setSkillEnabled(directory, 'beta', true);
  assert.equal(await exists(beta), true);

  await setSkillEnabled(directory, 'dupe', false);
  assert.equal(await exists(`${dupeNested}.disabled`), true);
  assert.equal(await exists(`${dupeFlat}.disabled`), true);
  scan = await scanSkills(directory);
  assert.equal(scan.skills.find((skill) => skill.id === 'dupe')?.state, 'disabled');
  await setSkillEnabled(directory, 'dupe', true);
  assert.equal(await exists(dupeNested), true);
  assert.equal(await exists(dupeFlat), true);
});

test('resolves active/disabled conflicts without losing either document', async (t) => {
  const directory = await home(t);
  t.after(() => rm(directory, { recursive: true, force: true }));

  const delta = await put(directory, 'delta', skillText('Delta', 'Delta skill'));
  const deltaDisabled = path.join(path.dirname(delta), 'SKILL.md.disabled');
  await writeFile(deltaDisabled, skillText('Delta old', 'Old disabled copy'));

  let scan = await scanSkills(directory);
  assert.equal(scan.skills.find((skill) => skill.id === 'delta')?.state, 'conflict');
  await setSkillEnabled(directory, 'delta', false).then(
    () => assert.fail('conflict should block the switch'),
    (error: unknown) => assert.equal(error instanceof SkillsError && error.code, 'conflict'),
  );

  const keepEnabled = await resolveBoth(directory, delta, 'enabled');
  assert.match(keepEnabled.backupPath, /\.disabled\.conflict-/);
  assert.equal(await exists(delta), true);
  assert.equal(await exists(deltaDisabled), false);
  assert.equal(await exists(keepEnabled.backupPath), true);
  scan = await scanSkills(directory);
  assert.equal(scan.skills.find((skill) => skill.id === 'delta')?.state, 'enabled');

  const epsilon = await put(directory, 'epsilon', skillText('Epsilon', 'Epsilon skill'));
  const epsilonDisabled = path.join(path.dirname(epsilon), 'SKILL.md.disabled');
  await writeFile(epsilonDisabled, skillText('Epsilon old', 'Old disabled copy'));
  const keepDisabled = await resolveBoth(directory, epsilon, 'disabled');
  assert.match(keepDisabled.backupPath, /\.disabled\.conflict-/);
  assert.equal(await exists(epsilon), false);
  assert.equal(await exists(epsilonDisabled), true);
  assert.equal(await exists(keepDisabled.backupPath), true);
  scan = await scanSkills(directory);
  assert.equal(scan.skills.find((skill) => skill.id === 'epsilon')?.state, 'disabled');
});

test('an unreadable root blocks every rename path', async (t) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'skills-root-error-'));
  const previousXdg = process.env.XDG_CONFIG_HOME;
  process.env.XDG_CONFIG_HOME = path.join(directory, '.config');
  t.after(() => {
    if (previousXdg === undefined) delete process.env.XDG_CONFIG_HOME;
    else process.env.XDG_CONFIG_HOME = previousXdg;
  });
  await mkdir(path.join(directory, '.config/opencode'), { recursive: true });
  await writeFile(path.join(directory, '.config/opencode/skills'), 'not a directory');

  const scan = await scanSkills(directory);
  assert.equal(scan.root.exists, false);
  assert.equal(scan.root.error, 'Not a directory');
  await setSkillEnabled(directory, 'alpha', false).then(
    () => assert.fail('a read error must block a single toggle'),
    (error: unknown) => assert.equal(error instanceof SkillsError && error.code, 'read-error'),
  );
  await bulkSetEnabled(directory, false).then(
    () => assert.fail('a read error must block a bulk toggle'),
    (error: unknown) => assert.equal(error instanceof SkillsError && error.code, 'read-error'),
  );
  await resolveBoth(directory, path.join(rootPath(directory), 'x/SKILL.md'), 'enabled').then(
    () => assert.fail('a read error must block conflict resolution'),
    (error: unknown) => assert.equal(error instanceof SkillsError && error.code === 'read-error', true),
  );
});

test('an unreadable project root blocks writes to otherwise valid global skills', async (t) => {
  const directory = await home(t);
  t.after(() => rm(directory, { recursive: true, force: true }));
  await put(directory, 'alpha', skillText('Alpha', 'Alpha skill'));

  const project = path.join(directory, 'workspace');
  await mkdir(path.join(project, '.opencode'), { recursive: true });
  await writeFile(path.join(project, '.opencode/skills'), 'not a directory');
  const config = { home: directory, projectDirectory: project };

  const scan = await scanSkills(config);
  const projectRoot = scan.roots.find((root) => root.sourceId === 'opencode-project');
  assert.equal(projectRoot?.exists, false);
  assert.equal(projectRoot?.error, 'Not a directory');

  await setSkillEnabled(config, 'opencode-global:alpha', false).then(
    () => assert.fail('a project read error must block a global toggle'),
    (error: unknown) => assert.equal(error instanceof SkillsError && error.code, 'read-error'),
  );
  await bulkSetEnabled(config, false).then(
    () => assert.fail('a project read error must block a bulk toggle'),
    (error: unknown) => assert.equal(error instanceof SkillsError && error.code, 'read-error'),
  );
});

test('bulk operations cover the OpenCode directory', async (t) => {
  const directory = await home(t);
  t.after(() => rm(directory, { recursive: true, force: true }));

  const alpha = await put(directory, 'alpha', skillText('Alpha', 'Alpha skill'));
  const beta = path.join(rootPath(directory), 'beta.md');
  await writeFile(beta, skillText('Beta', 'Flat skill'));

  const off = await bulkSetEnabled(directory, false);
  assert.ok(off.changed.includes('opencode-global:alpha'));
  assert.ok(off.changed.includes('opencode-global:beta'));
  assert.equal(await exists(`${alpha}.disabled`), true);
  assert.equal(await exists(`${beta}.disabled`), true);
  let scan = await scanSkills(directory);
  assert.equal(scan.skills.find((skill) => skill.id === 'alpha')?.state, 'disabled');
  assert.equal(scan.skills.find((skill) => skill.id === 'beta')?.state, 'disabled');

  const on = await bulkSetEnabled(directory, true);
  assert.ok(on.changed.includes('opencode-global:alpha'));
  assert.equal(await exists(alpha), true);
  assert.equal(await exists(beta), true);
  scan = await scanSkills(directory);
  assert.equal(scan.skills.find((skill) => skill.id === 'alpha')?.state, 'enabled');
  assert.equal(scan.summary.disabled, 0);

  const groupOff = await batchSetEnabled(directory, [], ['opencode-global:alpha', 'opencode-global:beta']);
  assert.deepEqual(groupOff.changed.sort(), ['opencode-global:alpha', 'opencode-global:beta']);
  assert.equal(await exists(`${alpha}.disabled`), true);
  assert.equal(await exists(`${beta}.disabled`), true);
  const groupOn = await batchSetEnabled(directory, ['opencode-global:alpha', 'opencode-global:beta'], []);
  assert.deepEqual(groupOn.changed.sort(), ['opencode-global:alpha', 'opencode-global:beta']);
  assert.equal(await exists(alpha), true);
  assert.equal(await exists(beta), true);
});
