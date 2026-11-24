const params = new URLSearchParams(location.search);
let dark = params.get('theme') === 'dark';
let width = Number(params.get('width') || 400);
let mode = params.get('state') || 'clean';
let resolved = false;
let undoStates = null;

const root = '~/.config/opencode/skills';
const projectRoot = '~/workspace/.opencode/skills';
const projectDirectory = '~/workspace';
const pathFor = (id, file = 'SKILL.md') => `${root}/${id}/${file}`;
const bareId = (key) => String(key).split(':').pop();

const fixtures = [
  { id: 'appkit-interop', name: 'AppKit Interop', description: 'SwiftUI/AppKit bridging, NSWindow, responder chain.' },
  { id: 'swiftui-patterns', name: 'SwiftUI Patterns', description: 'macOS SwiftUI scenes, windows, toolbars, inspectors.' },
  { id: 'window-management', name: 'Window Management', description: 'macOS windows, panels, placement and restoration.' },
  { id: 'liquid-glass', name: 'Liquid Glass', description: 'macOS 26 Liquid Glass surfaces and glass controls.' },
  { id: 'view-refactor', name: 'View Refactor', description: 'Split large SwiftUI views and stabilize scene state.' },
  { id: 'build-run-debug', name: 'Build Run Debug', description: 'Xcode/Swift build, launch, and runtime failures.' },
  { id: 'test-triage', name: 'Test Triage', description: 'Narrow macOS test failures and separate setup issues.' },
  { id: 'swiftpm-macos', name: 'SwiftPM macOS', description: 'SwiftPM macOS packages and executables.' },
  { id: 'signing-entitlements', name: 'Signing Entitlements', description: 'macOS signing, entitlements, and Gatekeeper.' },
  { id: 'packaging-notarization', name: 'Packaging Notarization', description: 'Archiving, notarization, and distribution failures.' },
  { id: 'telemetry', name: 'Telemetry', description: 'Lightweight macOS runtime logging and events.' },
  { id: 'reverse-engineering-unpacking', name: 'RE Unpacking', description: 'PE/.NET, APK, and native ELF/SO triage and unpacking.' },
  { id: 'kuna-decompiler', name: 'Kuna Decompiler', description: 'Recover searchable C and assembly with the Kuna CLI.' },
  { id: 'reverse-engineer-anything', name: 'REA', description: 'Reverse engineer native, managed, Electron and firmware targets.' },
  { id: 'cloudflare', name: 'Cloudflare', description: 'Choose Cloudflare products and architecture.' },
  { id: 'workers-best-practices', name: 'Workers Best Practices', description: 'Production Workers configuration and code practices.' },
  { id: 'wrangler', name: 'Wrangler', description: 'Wrangler CLI dev, deploy, and resources.' },
  { id: 'yichen-jianying-edit', name: 'Jianying Edit', description: 'Headless editable Jianying drafts and export.' },
  { id: 'browser-skill', name: 'Browser Skill', description: 'Automate the logged-in Chromium browser.' },
];

const initialStates = () => {
  const states = Object.fromEntries(fixtures.map((item) => [item.id, true]));
  states['view-refactor'] = false;
  states['local-notes'] = true;
  states['project-review'] = false;
  states.delta = true;
  return states;
};
let states = initialStates();

const frame = document.querySelector('iframe');
const audit = document.querySelector('#audit');
const buttons = {
  clean: document.querySelector('#clean'),
  conflict: document.querySelector('#conflict'),
};

const tokens = (isDark) => ({
  background: isDark ? '#20201e' : '#faf9f7',
  elevated: isDark ? '#282724' : '#f2f1ee',
  foreground: isDark ? '#dedbd3' : '#484744',
  muted: isDark ? '#a7a39b' : '#77736c',
  subtle: isDark ? '#817d76' : '#a29e98',
  border: isDark ? '#3c3a35' : '#e3e0db',
  hover: isDark ? '#ffffff0a' : '#00000005',
  selection: isDark ? '#4a3327' : '#f2e6dc',
  focus: '#b07750',
  primary: isDark ? '#d59a6f' : '#a4663b',
  mutedSurface: isDark ? '#272622' : '#f1efec',
  elevatedForeground: isDark ? '#dedbd3' : '#484744',
  active: isDark ? '#ffffff12' : '#00000009',
  selectionForeground: isDark ? '#f2d4bc' : '#724324',
  primaryForeground: '#ffffff',
  primaryText: isDark ? '#e3b18c' : '#965421',
  successText: isDark ? '#a0b48c' : '#4f6a3b',
  warningText: isDark ? '#d6b774' : '#8b6322',
  errorText: isDark ? '#e39b8b' : '#b34635',
  infoText: isDark ? '#9eb4c9' : '#496d88',
  success: '#759862',
  warning: '#c3944d',
  error: '#ce6a55',
  info: '#6995bb',
  font: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
  mono: 'ui-monospace,SFMono-Regular,monospace',
  radius: '7px',
});

const conflict = (kind, skillId, message, activePath, disabledPath, blocking) => ({
  kind,
  skillId,
  message,
  activePath,
  disabledPath,
  blocking,
});

const buildData = () => {
  const skills = [];
  for (const item of fixtures) {
    const active = Boolean(states[item.id]);
    const activePath = active ? pathFor(item.id) : null;
    const disabledPath = active ? null : pathFor(item.id, 'SKILL.md.disabled');
    const autoInvokeOff = item.id === 'browser-skill';
    const conflicts = [];
    if (active && autoInvokeOff) {
      conflicts.push(conflict('manual', item.id, 'The entry is enabled but marked for manual invocation only; the model cannot see it.', activePath, null, false));
    }
    skills.push({
      key: `opencode-global:${item.id}`,
      id: item.id,
      scope: 'global',
      sourceId: 'opencode-global',
      rootPath: root,
      name: item.name,
      description: item.description,
      state: active ? 'enabled' : 'disabled',
      advertised: Boolean(active && !autoInvokeOff),
      autoInvokeOff,
      activePaths: activePath ? [activePath] : [],
      disabledPaths: disabledPath ? [disabledPath] : [],
      conflicts,
      warnings: conflicts.map((item) => item.message),
      estimatedTokens: active && !autoInvokeOff ? 40 : 0,
    });
  }

  for (const item of [
    { id: 'local-notes', name: 'Local Notes', description: 'Project-only note workflow.' },
    { id: 'project-review', name: 'Project Review', description: 'Review this project against its checklist.' },
  ]) {
    const active = Boolean(states[item.id]);
    const activePath = active ? `${projectRoot}/${item.id}/SKILL.md` : null;
    const disabledPath = active ? null : `${projectRoot}/${item.id}/SKILL.md.disabled`;
    skills.push({
      key: `opencode-project:${item.id}`,
      id: item.id,
      scope: 'project',
      sourceId: 'opencode-project',
      rootPath: projectRoot,
      name: item.name,
      description: item.description,
      state: active ? 'enabled' : 'disabled',
      advertised: active,
      autoInvokeOff: false,
      activePaths: activePath ? [activePath] : [],
      disabledPaths: disabledPath ? [disabledPath] : [],
      conflicts: [],
      warnings: [],
      estimatedTokens: active ? 30 : 0,
    });
  }

  if (mode === 'conflict') {
    if (resolved) {
      const active = Boolean(states.delta);
      skills.push({
        key: 'opencode-global:delta',
        id: 'delta',
        scope: 'global',
        sourceId: 'opencode-global',
        rootPath: root,
        name: 'Delta',
        description: 'Conflict resolved for this preview.',
        state: active ? 'enabled' : 'disabled',
        advertised: active,
        autoInvokeOff: false,
        activePaths: active ? [pathFor('delta')] : [],
        disabledPaths: active ? [] : [pathFor('delta', 'SKILL.md.disabled')],
        conflicts: [],
        warnings: [],
        estimatedTokens: active ? 30 : 0,
      });
    } else {
      skills.push({
        key: 'opencode-global:delta',
        id: 'delta',
        scope: 'global',
        sourceId: 'opencode-global',
        rootPath: root,
        name: 'Delta',
        description: 'Both the active and disabled entry exist.',
        state: 'conflict',
        advertised: true,
        autoInvokeOff: false,
        activePaths: [pathFor('delta')],
        disabledPaths: [pathFor('delta', 'SKILL.md.disabled')],
        conflicts: [
          conflict('both', 'delta', 'Both an enabled and a disabled entry exist in the same directory. Choose which one to keep first.', pathFor('delta'), pathFor('delta', 'SKILL.md.disabled'), true),
        ],
        warnings: [],
        estimatedTokens: 30,
      });
    }
  }

  const conflicts = skills.flatMap((skill) => skill.conflicts);
  const blocking = conflicts.filter((item) => item.blocking).length;
  return {
    skills,
    conflicts,
    summary: {
      total: skills.length,
      advertised: skills.filter((skill) => skill.advertised).length,
      disabled: skills.filter((skill) => skill.state === 'disabled').length,
      blockingConflicts: blocking,
      warnings: conflicts.length - blocking,
      estimatedTokens: skills.reduce((sum, skill) => sum + skill.estimatedTokens, 0),
    },
    root: { sourceId: 'opencode-global', scope: 'global', label: 'Global OpenCode', path: root, exists: true, error: null },
    roots: [
      { sourceId: 'opencode-global', scope: 'global', label: 'Global OpenCode', path: root, exists: true, error: null },
      { sourceId: 'opencode-project', scope: 'project', label: 'Project OpenCode', path: projectRoot, exists: true, error: null },
    ],
    projectDirectory,
    scannedAt: Date.now(),
  };
};

const ready = () => {
  frame.contentWindow?.postMessage({
    channel: 'openchamber.sdk',
    v: 1,
    type: 'ready',
    payload: {
      theme: { mode: dark ? 'dark' : 'light', tokens: tokens(dark) },
      locale: 'en',
      directory: projectDirectory,
      session: null,
      surface: 'panel',
      connection: { connected: true, account: 'fixture' },
      settings: {},
      item: null,
    },
  }, '*');
};

const send = (target, id, payload) => target.postMessage({ channel: 'openchamber.sdk', v: 1, type: 'result', id, ok: true, payload }, '*');
const reply = (target, id, status, body) => send(target, id, { status, body: JSON.stringify(body) });

window.addEventListener('message', (event) => {
  const message = event.data;
  if (event.source !== frame.contentWindow || message?.channel !== 'openchamber.sdk') return;
  if (message.type === 'hello') {
    ready();
    return;
  }
  if (message.type !== 'service-request') {
    send(event.source, message.id, {});
    return;
  }
  const { method, path, body } = message.payload;
  const route = path.split('?')[0];
  const data = buildData();
  if (method === 'GET' && route.startsWith('/skills')) {
    reply(event.source, message.id, 200, data);
    return;
  }
  if (method === 'POST' && route === '/skills/toggle') {
    undoStates = null;
    const input = body ? JSON.parse(body) : {};
    const id = bareId(input.id);
    const skill = data.skills.find((item) => item.id === id);
    if (!skill) {
      reply(event.source, message.id, 404, { error: 'Skill was not found.', code: 'not-found' });
      return;
    }
    if (skill.conflicts.some((item) => item.kind === 'both')) {
      reply(event.source, message.id, 409, { error: 'This skill has unresolved entry conflicts.', code: 'conflict', conflicts: skill.conflicts });
      return;
    }
    states[id] = Boolean(input.enabled);
    if (id === 'delta') resolved = true;
    reply(event.source, message.id, 200, buildData());
    return;
  }
  if (method === 'POST' && route === '/skills/resolve') {
    undoStates = null;
    const input = body ? JSON.parse(body) : {};
    resolved = true;
    states.delta = input.keep === 'enabled';
    reply(event.source, message.id, 200, {
      ...buildData(),
      backupPath: `${root}/delta/SKILL.md.disabled.conflict-fixture`,
    });
    return;
  }
  if (method === 'POST' && route === '/skills/bulk') {
    const input = body ? JSON.parse(body) : {};
    undoStates = { ...states };
    const ids = buildData().skills
      .filter((skill) => Boolean(states[skill.id]) !== Boolean(input.enabled))
      .map((skill) => skill.key);
    for (const id of ids) states[bareId(id)] = Boolean(input.enabled);
    resolved = true;
    reply(event.source, message.id, 200, { ...buildData(), changed: ids, undoAvailable: true });
    return;
  }
  if (method === 'POST' && route === '/skills/batch') {
    const input = body ? JSON.parse(body) : {};
    undoStates = { ...states };
    const enable = Array.isArray(input.enable) ? input.enable : [];
    const disable = Array.isArray(input.disable) ? input.disable : [];
    for (const id of enable) states[bareId(id)] = true;
    for (const id of disable) states[bareId(id)] = false;
    resolved = true;
    reply(event.source, message.id, 200, { ...buildData(), changed: [...new Set([...enable, ...disable])], undoAvailable: true });
    return;
  }
  if (method === 'POST' && route === '/skills/undo') {
    if (!undoStates) {
      reply(event.source, message.id, 409, { error: 'No undo is available.', code: 'no-undo' });
      return;
    }
    states = undoStates;
    undoStates = null;
    reply(event.source, message.id, 200, buildData());
    return;
  }
  reply(event.source, message.id, 404, { error: 'not-found', code: 'not-found' });
});

const paint = () => {
  document.body.classList.toggle('dark', dark);
  document.documentElement.style.setProperty('--width', `${width}px`);
  buttons.clean.setAttribute('aria-pressed', mode === 'clean' ? 'true' : 'false');
  buttons.conflict.setAttribute('aria-pressed', mode === 'conflict' ? 'true' : 'false');
  audit.textContent = `mode=${mode} · ${Object.values(states).filter(Boolean).length} enabled`;
};
const show = () => {
  frame.src = `/panel/index.html?state=${encodeURIComponent(mode)}&t=${Date.now()}`;
  paint();
};

document.querySelector('#theme').onclick = () => {
  dark = !dark;
  paint();
  ready();
};
document.querySelector('#narrow').onclick = () => {
  width = width === 280 ? 400 : 280;
  paint();
};
buttons.clean.onclick = () => {
  mode = 'clean';
  resolved = false;
  states = initialStates();
  show();
};
buttons.conflict.onclick = () => {
  mode = 'conflict';
  resolved = false;
  states = initialStates();
  show();
};
document.querySelector('#reload').onclick = show;

paint();
show();
