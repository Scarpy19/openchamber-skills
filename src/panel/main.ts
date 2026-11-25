import { connectHost, HostRequestError } from '@openchamber/sdk';
import {
  applyHostReady,
  mountButton,
  mountMenu,
  mountSearchField,
  mountSelect,
} from '@openchamber/sdk/ui';
import type {
  ConflictKind,
  ConflictView,
  RootView,
  SkillState,
  SkillView,
  SkillsResponse,
  Summary,
} from '../shared/types.ts';
import {
  filterAndSortSkills,
  planInvertSkills,
  type SkillSortMode,
  type SkillSourceFilter,
  type SkillStateFilter,
} from '../shared/filter.ts';
import { installScrollbarActivity } from './scrollbar.ts';
import css from './style.css';
import native from '../../ui/native.css';

const t = (text: string, params?: Record<string, string | number>): string => {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : match,
  );
};
const host = connectHost({ requestTimeoutMs: 30_000 });
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');
installScrollbarActivity(document);
const style = document.createElement('style');
style.textContent = native + css;
document.head.append(style);

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, className = '', text?: string): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

type Tone = 'info' | 'success' | 'warning' | 'error';
type NoticeAction = { label: string; onClick: () => void; primary?: boolean };
type Notice = { text: string; tone: Tone; actions?: NoticeAction[] };

class ServiceError extends Error {
  readonly code: string | null;
  readonly conflicts: ConflictView[];

  constructor(message: string, code: string | null, conflicts: ConflictView[]) {
    super(message);
    this.name = 'ServiceError';
    this.code = code;
    this.conflicts = conflicts;
  }
}

const isSkillState = (value: unknown): value is SkillState =>
  value === 'enabled' || value === 'disabled' || value === 'mixed' || value === 'conflict';
const isConflictKind = (value: unknown): value is ConflictKind =>
  value === 'both' ||
  value === 'duplicate' ||
  value === 'invalid' ||
  value === 'empty' ||
  value === 'read-error' ||
  value === 'manual' ||
  value === 'no-description';

const asString = (value: unknown, fallback = ''): string => (typeof value === 'string' ? value : fallback);
const asNullableString = (value: unknown): string | null =>
  typeof value === 'string' && value.length > 0 ? value : null;
const asBool = (value: unknown): boolean => value === true;
const asNumber = (value: unknown): number =>
  typeof value === 'number' && Number.isFinite(value) ? value : 0;
const stringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

const parseConflict = (value: unknown): ConflictView | null => {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  if (!isConflictKind(record.kind) || typeof record.skillId !== 'string') return null;
  return {
    kind: record.kind,
    skillId: record.skillId,
    message: asString(record.message, t("Conflict")),
    activePath: asNullableString(record.activePath),
    disabledPath: asNullableString(record.disabledPath),
    blocking: asBool(record.blocking),
  };
};

const parseSkill = (value: unknown): SkillView | null => {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  if (typeof record.id !== 'string' || !record.id || !isSkillState(record.state)) return null;
  return {
    key: asString(record.key, record.id),
    id: record.id,
    scope: record.scope === 'project' ? 'project' : 'global',
    sourceId: asString(record.sourceId, 'opencode-global'),
    rootPath: asString(record.rootPath),
    name: asString(record.name, record.id),
    description: asString(record.description),
    state: record.state,
    advertised: asBool(record.advertised),
    autoInvokeOff: asBool(record.autoInvokeOff),
    activePaths: stringArray(record.activePaths),
    disabledPaths: stringArray(record.disabledPaths),
    conflicts: Array.isArray(record.conflicts)
      ? record.conflicts.map(parseConflict).filter((item): item is ConflictView => item !== null)
      : [],
    warnings: Array.isArray(record.warnings)
      ? record.warnings.filter((item): item is string => typeof item === 'string')
      : [],
    estimatedTokens: asNumber(record.estimatedTokens),
    ...(record.duplicateResolution && typeof record.duplicateResolution === 'object'
      ? { duplicateResolution: (() => {
          const resolution = record.duplicateResolution as Record<string, unknown>;
          const status = resolution.status === 'highest-scanned' || resolution.status === 'shadowed'
            ? resolution.status : 'unknown';
          return { status, winningPath: asNullableString(resolution.winningPath) };
        })() }
      : {}),
  };
};

const parseRoot = (value: unknown): RootView => {
  if (!value || typeof value !== 'object') {
    throw new ServiceError(t("The service returned invalid skill directory information."), 'parse', []);
  }
  const record = value as Record<string, unknown>;
  return {
    sourceId: asString(record.sourceId, 'opencode-global'),
    scope: record.scope === 'project' ? 'project' : 'global',
    label: asString(record.label, t('Skill directory')),
    path: asString(record.path),
    exists: asBool(record.exists),
    error: typeof record.error === 'string' ? record.error : null,
  };
};

const parseResponse = (value: unknown): SkillsResponse => {
  if (!value || typeof value !== 'object') throw new ServiceError(t("The service returned data in an unexpected format."), 'parse', []);
  const record = value as Record<string, unknown>;
  if (!Array.isArray(record.skills)) throw new ServiceError(t("The service returned data in an unexpected format."), 'parse', []);
  const skills = record.skills.map(parseSkill).filter((item): item is SkillView => item !== null);
  const conflicts = Array.isArray(record.conflicts)
    ? record.conflicts.map(parseConflict).filter((item): item is ConflictView => item !== null)
    : skills.flatMap((skill) => skill.conflicts);
  const blockingConflicts = conflicts.filter((conflict) => conflict.blocking).length;
  const summary: Summary = {
    total: skills.length,
    advertised: skills.filter((skill) => skill.advertised).length,
    disabled: skills.filter((skill) => skill.state === 'disabled').length,
    blockingConflicts,
    warnings: conflicts.length - blockingConflicts,
    estimatedTokens: skills.reduce((sum, skill) => sum + skill.estimatedTokens, 0),
  };
  const roots = Array.isArray(record.roots)
    ? record.roots.map(parseRoot)
    : record.root
      ? [parseRoot(record.root)]
      : [];
  return {
    skills,
    conflicts,
    summary,
    root: roots[0] ?? {
      sourceId: 'opencode-global',
      scope: 'global',
      label: t('Skill directory'),
      path: '',
      exists: false,
      error: null,
    },
    roots,
    projectDirectory: typeof record.projectDirectory === 'string' ? record.projectDirectory : null,
    scannedAt: asNumber(record.scannedAt),
  };
};

const request = async (method: 'GET' | 'POST', path: string, body?: unknown, query?: Record<string, string>): Promise<unknown> => {
  const response = await host.serviceRequest({
    method,
    path,
    ...(query ? { query } : {}),
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  let parsed: unknown;
  try {
    parsed = JSON.parse(response.body) as unknown;
  } catch {
    throw new ServiceError(t("The service returned unrecognized data. Try again."), 'parse', []);
  }
  if (response.status >= 400) {
    const record = parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {};
    const message = typeof record.error === 'string' ? record.error : t("Request failed ({status})", { status: response.status });
    const code = typeof record.code === 'string' ? record.code : null;
    const conflicts = Array.isArray(record.conflicts)
      ? record.conflicts.map(parseConflict).filter((item): item is ConflictView => item !== null)
      : [];
    throw new ServiceError(message, code, conflicts);
  }
  return parsed;
};

/** Every skill route needs the active project path; the service process cannot infer it. */
const skillsRequest = async (method: 'GET' | 'POST', path: string, body?: unknown): Promise<unknown> => {
  const directory = projectDirectory;
  const payload = body === undefined || method === 'GET'
    ? undefined
    : { ...(body as Record<string, unknown>), directory: directory ?? undefined };
  const result = await request(method, path, payload, method === 'GET' && directory ? { directory } : undefined);
  if (directory !== projectDirectory) throw new Error(t('The project changed; rescan before making changes.'));
  return result;
};

const describeError = (error: unknown): string => {
  if (error instanceof HostRequestError) {
    if (error.code === 'NO_SERVICE') return t("Allow \"Skills\" to run its local service in Settings → Extensions.");
    if (error.code === 'SERVICE_FAILED') return t("The local service is not ready. Reload the extension and try again.");
    if (error.code === 'DISABLED') return t("The Skills extension is disabled. Enable it in extension settings.");
    if (error.code === 'HOST_TIMEOUT') return t("The local service timed out. Try again.");
    return t("Cannot connect to the local service. Check extension permissions.");
  }
  if (error instanceof ServiceError) return error.message;
  return error instanceof Error ? error.message : t("The operation failed. Try again.");
};

const app = el('main', 'ext ext-container sk');
app.setAttribute('aria-label', t("Skills Manager"));
const header = el('header', 'sk-header');
const titleRow = el('div', 'sk-title-row');
const title = el('h1', 'sk-title', t("Skills Manager"));
const actionRoot = el('div', 'sk-actions');
const refresh = mountButton(actionRoot, {
  label: t("Rescan"),
  variant: 'outline',
  size: 'sm',
  onClick: () => {
    void loadSkills(true);
  },
});
const enableAll = mountButton(actionRoot, {
  label: t("Enable all"),
  variant: 'outline',
  size: 'sm',
  onClick: () => requestBulk(true),
});
const disableAll = mountButton(actionRoot, {
  label: t("Disable all"),
  variant: 'outline',
  size: 'sm',
  onClick: () => requestBulk(false),
});
titleRow.append(title, actionRoot);
const summary = el('p', 'sk-summary');
const summarySecondary = el('p', 'sk-summary sk-summary-secondary');

header.append(titleRow, summary, summarySecondary);

const body = el('div', 'sk-body');
const noticeRoot = el('div', 'sk-notice-root');
noticeRoot.setAttribute('aria-live', 'polite');
const conflictRoot = el('div');
const sourcesRoot = el('details', 'sk-sources');
const toolbar = el('div', 'sk-toolbar');
const searchSlot = el('div', 'sk-search-slot');
const toolbarSelects = el('div', 'sk-toolbar-selects');
const toolbarActions = el('div', 'sk-toolbar-actions');
const filterSlot = el('div', 'sk-filter-slot');
const sourceSlot = el('div', 'sk-source-slot');
const sortSlot = el('div', 'sk-sort-slot');
toolbarSelects.append(filterSlot, sourceSlot, sortSlot);
const listMenu = mountMenu(toolbarActions, {
  label: t('List actions'),
  variant: 'ghost',
  size: 'sm',
  items: [
    { id: 'invert', label: t('Invert visible skills') },
    { id: 'copy-ids', label: t('Copy visible IDs') },
  ],
  onSelect: (id) => {
    if (id === 'invert') requestInvert();
    else if (id === 'copy-ids') void copyVisibleIds();
  },
});
const listMenuTrigger = toolbarActions.querySelector<HTMLButtonElement>('.oc-sdk-btn');
if (listMenuTrigger) {
  listMenuTrigger.setAttribute('aria-label', t('List actions'));
  listMenuTrigger.title = t('Copy IDs or invert the visible skills');
}
toolbar.append(searchSlot, toolbarSelects, toolbarActions);
const listRoot = el('div', 'sk-list');
listRoot.setAttribute('role', 'list');
const footer = el('footer', 'sk-footer');
const footerLine1 = el('p', '', t("Disabling renames a skill entry to .disabled, so OpenCode no longer loads it. Global and project skill directories are both shown when a project is open."));
const footerLine2 = el('p', '', t("Enable all before disabling or uninstalling the extension; rescan after skills change."));
footer.append(footerLine1, footerLine2);
body.append(noticeRoot, conflictRoot, sourcesRoot, toolbar, listRoot, footer);
app.append(header, body);
root.append(app);

let data: SkillsResponse | null = null;
let loading = false;
let scanSequence = 0;
let loadError: string | null = null;
let notice: Notice | null = null;
let busy: string | null = null;
let pendingBulk: boolean | null = null;
let pendingInvert = false;
let pendingSourceDisable: string | null = null;
let queryRaw = '';
let stateFilter: SkillStateFilter = 'all';
let sourceFilter: SkillSourceFilter = 'all';
let sortMode: SkillSortMode = 'default';
let projectDirectory: string | null = null;
const expandedSkills = new Set<string>();
let lastBadgeCount: number | null | undefined;
let initialized = false;

const stateFilterOptions = () => [
  { id: 'all', label: t("All states") },
  { id: 'enabled', label: t("Enabled") },
  { id: 'disabled', label: t("Disabled") },
  { id: 'attention', label: t("Needs attention") },
];

const sourceFilterOptions = () => [
  { id: 'all', label: t('All sources') },
  { id: 'global', label: t('Global') },
  { id: 'project', label: t('Project') },
];

const sortModeOptions = () => [
  { id: 'default', label: t("Default order") },
  { id: 'tokens', label: t("Tokens (high to low)") },
  { id: 'name', label: t("Name (A–Z)") },
  { id: 'state', label: t("Needs attention first") },
];

const searchField = mountSearchField(searchSlot, {
  value: '',
  placeholder: t("Search name, description, or ID (press / to focus)"),
  onChange: (value) => {
    queryRaw = value;
    render();
  },
});
const searchInputEl = (): HTMLInputElement | null => searchSlot.querySelector<HTMLInputElement>('input');
const syncSearchAria = (): void => {
  const input = searchInputEl();
  if (input) input.setAttribute('aria-label', t("Search skills"));
};
syncSearchAria();

const stateSelect = mountSelect(filterSlot, {
  value: 'all',
  options: stateFilterOptions(),
  onChange: (id) => {
    stateFilter = id === 'enabled' || id === 'disabled' || id === 'attention' ? id : 'all';
    stateSelect.update({ value: stateFilter });
    render();
  },
});
const stateSelectTrigger = filterSlot.querySelector<HTMLButtonElement>('.oc-sdk-trigger');
if (stateSelectTrigger) {
  stateSelectTrigger.setAttribute('aria-label', t("Filter by status"));
  stateSelectTrigger.removeAttribute('aria-labelledby');
}

const sourceSelect = mountSelect(sourceSlot, {
  value: 'all',
  options: sourceFilterOptions(),
  onChange: (id) => {
    sourceFilter = id === 'global' || id === 'project' ? id : 'all';
    sourceSelect.update({ value: sourceFilter });
    render();
  },
});
const sourceSelectTrigger = sourceSlot.querySelector<HTMLButtonElement>('.oc-sdk-trigger');
if (sourceSelectTrigger) {
  sourceSelectTrigger.setAttribute('aria-label', t('Filter by skill source'));
  sourceSelectTrigger.removeAttribute('aria-labelledby');
}

const sortSelect = mountSelect(sortSlot, {
  value: 'default',
  options: sortModeOptions(),
  onChange: (id) => {
    sortMode = id === 'tokens' || id === 'name' || id === 'state' ? id : 'default';
    sortSelect.update({ value: sortMode });
    render();
  },
});
const sortSelectTrigger = sortSlot.querySelector<HTMLButtonElement>('.oc-sdk-trigger');
if (sortSelectTrigger) {
  sortSelectTrigger.setAttribute('aria-label', t("Sort order"));
  sortSelectTrigger.removeAttribute('aria-labelledby');
}

document.addEventListener('keydown', (event) => {
  if (event.defaultPrevented) return;
  if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey) {
    const target = event.target as HTMLElement | null;
    if (
      target &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable)
    ) {
      return;
    }
    const input = searchInputEl();
    if (input) {
      event.preventDefault();
      input.focus();
      input.select();
    }
    return;
  }
  if (event.key === 'Escape') {
    if (pendingBulk !== null || pendingInvert || pendingSourceDisable !== null) {
      event.preventDefault();
      pendingBulk = null;
      pendingInvert = false;
      pendingSourceDisable = null;
      render();
      return;
    }
  }
});

const rootBlocked = (): boolean => Boolean(data?.root.error || data?.roots.some((root) => root.error));

const visibleSkills = (): SkillView[] => {
  const snapshot = data;
  if (!snapshot) return [];
  return filterAndSortSkills(snapshot.skills, { query: queryRaw, stateFilter, sourceFilter, sortMode });
};

const toneForState = (skill: SkillView): Tone => {
  if (skill.state === 'conflict') return 'error';
  if (skill.state === 'mixed') return 'warning';
  if (skill.state === 'disabled') return 'info';
  return skill.advertised ? 'success' : 'warning';
};

const stateText = (skill: SkillView): string => {
  if (skill.state === 'conflict') return t("Conflict");
  if (skill.state === 'mixed') return t("Mixed");
  if (skill.state === 'disabled') return t("Disabled");
  return t("Enabled");
};

const badge = (text: string, tone: Tone | 'neutral' = 'neutral'): HTMLSpanElement => {
  const node = el('span', 'sk-badge', text);
  node.dataset.tone = tone;
  return node;
};

const conflictTitle = (kind: ConflictKind): string => {
  switch (kind) {
    case 'both':
      return t("Both entry and disabled file exist");
    case 'duplicate':
      return t("Multiple entries for one ID");
    case 'invalid':
      return t("Frontmatter could not be parsed");
    case 'empty':
      return t("Entry file is empty");
    case 'read-error':
      return t("Entry cannot be read");
    case 'manual':
      return t("Manual invocation only");
    case 'no-description':
      return t("No description");
    default:
      return t("Conflict");
  }
};

const pathLine = (label: string, file: string | null): HTMLElement | null => {
  if (!file) return null;
  const line = el('p', 'sk-path');
  line.append(el('span', 'sk-path-label', `${label}:`), el('code', '', file));
  return line;
};

const actionButton = (label: string, onClick: () => void, primary = false, disabled = false): HTMLButtonElement => {
  const button = el('button', primary ? 'sk-inline-button sk-inline-primary' : 'sk-inline-button', label);
  button.type = 'button';
  button.disabled = Boolean(busy) || disabled;
  button.addEventListener('click', onClick);
  return button;
};

const conflictItem = (conflict: ConflictView): HTMLElement => {
  const item = el('li', 'sk-conflict-item');
  item.dataset.tone = conflict.blocking ? 'error' : 'warning';
  const copy = el('div', 'sk-conflict-copy');
  copy.append(el('strong', '', conflictTitle(conflict.kind)), el('p', 'sk-conflict-message', conflict.message));
  if (conflict.kind === 'both') {
    copy.append(pathLine(t("Active entry"), conflict.activePath) ?? el('span'));
    copy.append(pathLine(t("Disabled entry"), conflict.disabledPath) ?? el('span'));
  } else if (conflict.activePath ?? conflict.disabledPath) {
    copy.append(pathLine(t("Entry"), conflict.activePath ?? conflict.disabledPath) ?? el('span'));
  }
  item.append(copy);

  if (conflict.kind === 'both' && conflict.activePath) {
    const actions = el('div', 'sk-conflict-actions');
    actions.append(
      actionButton(t("Keep enabled"), () => void resolveConflict(conflict, 'enabled'), false, rootBlocked()),
      actionButton(t("Keep disabled"), () => void resolveConflict(conflict, 'disabled'), false, rootBlocked()),
    );
    item.append(actions);
  }
  return item;
};

const renderConflicts = (): void => {
  conflictRoot.replaceChildren();
  if (!data) return;
  const rootConflicts: ConflictView[] = data.roots
    .filter((root) => Boolean(root.error))
    .map((root) => ({
      kind: 'read-error' as const,
      skillId: '',
      message: t("Cannot read {label}: {error} ({path})", { label: root.label, error: root.error ?? '', path: root.path }),
      activePath: null,
      disabledPath: null,
      blocking: true,
    }));
  const all = [...rootConflicts, ...data.conflicts];
  const blocking = all.filter((conflict) => conflict.blocking);
  const warnings = all.filter((conflict) => !conflict.blocking);
  if (blocking.length === 0 && warnings.length === 0) return;

  const card = el('section', 'sk-conflicts');
  card.setAttribute('aria-label', t("Conflict check"));
  const head = el('div', 'sk-section-head');
  head.append(
    el('h2', 'sk-section-title', t("Conflict check")),
    el('span', 'sk-section-count', t("To resolve: {blocking} · Warnings: {warnings}", { blocking: blocking.length, warnings: warnings.length })),
  );
  card.append(head);

  if (blocking.length > 0) {
    const list = el('ul', 'sk-conflict-list');
    for (const conflict of blocking) list.append(conflictItem(conflict));
    card.append(list);
  }
  if (warnings.length > 0) {
    const details = el('details', 'sk-warning-details');
    details.append(el('summary', '', t("Warnings ({count})", { count: warnings.length })));
    const list = el('ul', 'sk-conflict-list');
    for (const conflict of warnings) list.append(conflictItem(conflict));
    details.append(list);
    card.append(details);
  }
  conflictRoot.append(card);
};

const renderSources = (): void => {
  const open = sourcesRoot.open;
  sourcesRoot.replaceChildren();
  const snapshot = data;
  if (!snapshot) return;
  const available = snapshot.roots.filter((root) => root.exists).length;
  sourcesRoot.append(el('summary', '', t("Detected skill sources: {available}/{total} available", {
    available,
    total: snapshot.roots.length,
  })));
  const list = el('ul', 'sk-source-list');
  for (const root of snapshot.roots) {
    const item = el('li', 'sk-source-item');
    const head = el('div', 'sk-source-head');
    const status = root.error ? t('Error') : root.exists ? t('Available') : t('Not created');
    head.append(
      el('strong', '', root.label),
      badge(root.scope === 'project' ? t('Project') : t('Global'), root.scope === 'project' ? 'info' : 'neutral'),
      badge(status, root.error ? 'error' : root.exists ? 'success' : 'neutral'),
    );
    const actions = el('div', 'sk-source-actions');
    const activeCount = snapshot.skills.filter((skill) => skill.sourceId === root.sourceId && skill.activePaths.length > 0).length;
    const disable = actionButton(t('Disable all'), () => requestSourceDisable(root.sourceId), false, activeCount === 0);
    actions.append(disable);
    if (root.path) {
      const open = actionButton(t('Open folder'), () => {
        void (async () => {
          try {
            await skillsRequest('POST', '/sources/open', { path: root.path });
          } catch (error) {
            notice = { text: describeError(error), tone: 'error' };
            render();
          }
        })();
      }, false, !root.exists);
      actions.append(open);
    }
    head.append(actions);
    item.append(head, el('code', 'sk-source-path', root.path || t('No path')));
    if (root.error) item.append(el('p', 'sk-source-error', root.error));
    list.append(item);
  }
  sourcesRoot.append(list);
  sourcesRoot.open = open;
};

const renderNotice = (): void => {
  noticeRoot.replaceChildren();
  if (pendingInvert) {
    const plan = planInvertSkills(visibleSkills());
    const total = plan.enable.length + plan.disable.length;
    const node = el('div', 'sk-notice', t("Invert visible skills: enable {enable}, disable {disable}.", {
      enable: plan.enable.length,
      disable: plan.disable.length,
    }));
    node.dataset.tone = 'warning';
    node.setAttribute('role', 'status');
    appendBulkPreview(node, visibleSkills().filter((skill) => skill.state === 'enabled' || skill.state === 'disabled'), (skill) => skill.state === 'disabled');
    const actions = el('div', 'sk-notice-actions');
    actions.append(
      actionButton(t('Confirm invert'), () => void applyInvert(), true, total === 0),
      actionButton(t('Cancel'), () => {
        pendingInvert = false;
        render();
      }),
    );
    node.append(actions);
    noticeRoot.append(node);
    return;
  }
  if (pendingBulk !== null) {
    const count = data
      ? data.skills.filter((skill) => (pendingBulk ? skill.disabledPaths.length : skill.activePaths.length) > 0).length
      : 0;
    const node = el('div', 'sk-notice', pendingBulk ? t("Skills to enable: {count}.", { count }) : t("Skills to disable: {count}.", { count }));
    node.dataset.tone = 'warning';
    node.setAttribute('role', 'status');
    appendBulkPreview(node, data?.skills ?? [], () => pendingBulk === true);
    const actions = el('div', 'sk-notice-actions');
    actions.append(
      actionButton(pendingBulk ? t("Confirm enable") : t("Confirm disable"), () => void applyBulk(), true),
      actionButton(t("Cancel"), () => {
        pendingBulk = null;
        render();
      }),
    );
    node.append(actions);
    noticeRoot.append(node);
    return;
  }
  if (pendingSourceDisable !== null) {
    const sourceId = pendingSourceDisable;
    const root = data?.roots.find((item) => item.sourceId === sourceId);
    const affected = (data?.skills ?? []).filter((skill) => skill.sourceId === sourceId && skill.activePaths.length > 0);
    const node = el('div', 'sk-notice', t('Disable all skills in {source}? {count} skill(s) will be changed.', {
      source: root?.label ?? sourceId,
      count: affected.length,
    }));
    node.dataset.tone = 'warning';
    node.setAttribute('role', 'status');
    appendBulkPreview(node, affected, () => false);
    const actions = el('div', 'sk-notice-actions');
    actions.append(
      actionButton(t('Confirm disable'), () => void applySourceDisable(), true, affected.length === 0),
      actionButton(t('Cancel'), () => {
        pendingSourceDisable = null;
        render();
      }),
    );
    node.append(actions);
    noticeRoot.append(node);
    return;
  }
  if (notice) {
    const node = el('div', 'sk-notice sk-notice-dismissible');
    node.dataset.tone = notice.tone;
    node.setAttribute('role', notice.tone === 'error' ? 'alert' : 'status');
    const body = el('div', 'sk-notice-body', notice.text);
    const close = el('button', 'sk-notice-close', '×');
    close.type = 'button';
    close.setAttribute('aria-label', t('Dismiss notification'));
    close.addEventListener('click', () => { notice = null; renderNotice(); });
    node.append(body, close);
    if (notice.actions?.length) {
      const actions = el('div', 'sk-notice-actions');
      for (const action of notice.actions) actions.append(actionButton(action.label, action.onClick, action.primary));
      node.append(actions);
    }
    noticeRoot.append(node);
    return;
  }
  if (loadError) {
    const node = el('div', 'sk-notice', loadError);
    node.dataset.tone = 'error';
    node.setAttribute('role', 'alert');
    noticeRoot.append(node);
    return;
  }
  if (loading && !data) {
    const node = el('div', 'sk-notice', t("Reading skills…"));
    node.dataset.tone = 'info';
    node.setAttribute('role', 'status');
    noticeRoot.append(node);
  }
};

const appendBulkPreview = (node: HTMLElement, skills: SkillView[], enable: (skill: SkillView) => boolean): void => {
  const details = el('details', 'sk-preview');
  details.open = true;
  details.append(el('summary', '', t('Files affected (current scan)')));
  const list = el('ul', 'sk-preview-list');
  for (const skill of skills) {
    const enabling = enable(skill);
    const paths = enabling ? skill.disabledPaths : skill.activePaths;
    for (const file of paths) {
      const item = el('li', '');
      item.append(el('strong', '', `${enabling ? t('Enable') : t('Disable')}: ${skill.key}`), el('code', 'sk-source-path', file));
      list.append(item);
    }
  }
  details.append(list);
  node.append(details);
};

const undoBulk = async (): Promise<void> => {
  if (busy) return;
  busy = 'undo';
  render();
  try {
    data = parseResponse(await skillsRequest('POST', '/skills/undo', {}));
    notice = { text: t('The last bulk operation was undone.'), tone: 'success' };
  } catch (error) {
    notice = { text: describeError(error), tone: 'error' };
  } finally {
    busy = null;
    render();
  }
};

const renderSummary = (): void => {
  if (!data) {
    summary.textContent = loading ? t("Reading skills…") : t("Skills not read yet.");
    summarySecondary.textContent = t("After disabling an entry document, OpenCode no longer discovers that skill.");
    return;
  }
  summary.textContent = t("Estimated advertised entries: {advertised} of {total} · about {tokens} tokens/step", {
    advertised: data.summary.advertised,
    total: data.summary.total,
    tokens: data.summary.estimatedTokens.toLocaleString('en'),
  });
  const parts = [t("Disabled: {count}", { count: data.summary.disabled })];
  const projectCount = data.skills.filter((skill) => skill.scope === 'project').length;
  if (projectDirectory) parts.push(t("Project skills: {count}", { count: projectCount }));
  if (data.summary.blockingConflicts > 0) parts.push(t("Blocking conflicts: {count}", { count: data.summary.blockingConflicts }));
  else parts.push(t("No blocking conflicts"));
  if (data.summary.warnings > 0) parts.push(t("Warnings: {count}", { count: data.summary.warnings }));
  if (data.roots.some((root) => root.error)) parts.push(t("A skill directory cannot be read"));
  if (data.scannedAt > 0) {
    const scanned = new Date(data.scannedAt);
    if (!Number.isNaN(scanned.getTime())) {
      parts.push(t("Scanned {time}", {
        time: scanned.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }),
      }));
    }
  }
  summarySecondary.textContent = t("{parts}. Estimates exclude built-in skills.", { parts: parts.join(' · ') });
};

const copyText = async (value: string, message: string): Promise<void> => {
  try {
    await host.writeClipboard(value);
    void host.toast({ kind: 'success', message }).catch(() => undefined);
  } catch (error) {
    notice = { text: describeError(error), tone: 'error' };
    renderNotice();
  }
};

const copyVisibleIds = async (): Promise<void> => {
  const ids = visibleSkills().map((skill) => skill.key);
  if (ids.length === 0) return;
  await copyText(ids.join('\n'), t("Copied {count} visible qualified IDs.", { count: ids.length }));
};

const requestInvert = (): void => {
  if (!data || busy) return;
  const plan = planInvertSkills(visibleSkills());
  if (plan.enable.length + plan.disable.length === 0) {
    notice = { text: t("No enabled or disabled skills match the current view."), tone: 'info' };
    render();
    return;
  }
  pendingInvert = true;
  pendingBulk = null;
  pendingSourceDisable = null;
  notice = null;
  render();
  noticeRoot.scrollIntoView({ block: 'nearest' });
  noticeRoot.querySelector<HTMLButtonElement>('button')?.focus();
};

const applyInvert = async (): Promise<void> => {
  if (!data || busy || !pendingInvert) return;
  const plan = planInvertSkills(visibleSkills());
  const count = plan.enable.length + plan.disable.length;
  pendingInvert = false;
  if (count === 0) return;
  busy = 'invert';
  notice = null;
  render();
  try {
    const expectedPaths = visibleSkills().flatMap((skill) =>
      plan.enable.includes(skill.key) ? skill.disabledPaths : plan.disable.includes(skill.key) ? skill.activePaths : []);
    const raw = await skillsRequest('POST', '/skills/batch', { ...plan, expectedPaths });
    data = parseResponse(raw);
    const undoAvailable = Boolean(raw && typeof raw === 'object' && (raw as Record<string, unknown>).undoAvailable);
    notice = { text: t("Inverted {count} visible skills.", { count }), tone: 'success', ...(undoAvailable ? { actions: [{ label: t('Undo last action'), onClick: () => void undoBulk() }] } : {}) };
    void host.toast({ kind: 'success', message: t("Inverted {count} visible skills.", { count }) }).catch(() => undefined);
  } catch (error) {
    notice = { text: describeError(error), tone: 'error' };
    busy = null;
    render();
    void loadSkills(false, true);
    return;
  }
  busy = null;
  render();
};

const appendSkillMenu = (container: HTMLElement, skill: SkillView): void => {
  const menuSlot = el('span', 'sk-menu-slot');
  const entryPath = skill.activePaths[0] ?? skill.disabledPaths[0] ?? null;
  mountMenu(menuSlot, {
    label: '⋯',
    variant: 'ghost',
    size: 'sm',
    items: [
      { id: 'copy-path', label: t("Copy entry path"), disabled: !entryPath },
      { id: 'copy-id', label: t("Copy qualified skill ID") },
    ],
    onSelect: (id) => {
      if (id === 'copy-path' && entryPath) {
        void copyText(entryPath, t("Copied entry path."));
      } else if (id === 'copy-id') {
        void copyText(skill.key, t("Copied qualified skill ID."));
      }
    },
  });
  const trigger = menuSlot.querySelector<HTMLButtonElement>('.oc-sdk-btn');
  if (trigger) {
    trigger.setAttribute('aria-label', `${t("More actions")} ${skill.name}`);
    trigger.title = t("More actions");
  }
  container.append(menuSlot);
};

const skillAction = (skill: SkillView): HTMLElement => {
  const holder = el('div', 'sk-skill-action');
  const note = el('span', 'sk-action-note');
  const top = el('div', 'sk-action-top');
  const blocked = rootBlocked();

  if (skill.state === 'conflict') {
    note.textContent = blocked ? t("Directory cannot be read") : t("Resolve conflicts first");
    const button = el('button', 'sk-inline-button', t("Resolve conflict"));
    button.type = 'button';
    button.disabled = Boolean(busy) || blocked;
    button.addEventListener('click', () => {
      conflictRoot.scrollIntoView({ block: 'nearest' });
      conflictRoot.querySelector<HTMLButtonElement>('button')?.focus();
    });
    top.append(button);
    appendSkillMenu(top, skill);
    holder.append(note, top);
    return holder;
  }

  if (skill.state === 'mixed') {
    note.textContent = blocked ? t("Directory cannot be read") : t("Some entries disabled");
    const actions = el('div', 'sk-mini-actions');
    const on = el('button', 'sk-inline-button', t("Enable all"));
    on.type = 'button';
    on.disabled = Boolean(busy) || blocked;
    on.addEventListener('click', () => void toggleSkill(skill, true));
    const off = el('button', 'sk-inline-button', t("Disable all"));
    off.type = 'button';
    off.disabled = Boolean(busy) || blocked;
    off.addEventListener('click', () => void toggleSkill(skill, false));
    actions.append(on, off);
    appendSkillMenu(actions, skill);
    holder.append(note, actions);
    return holder;
  }

  const checked = skill.state === 'enabled';
  const control = el('button', 'sk-switch');
  control.type = 'button';
  control.setAttribute('role', 'switch');
  control.setAttribute('aria-checked', checked ? 'true' : 'false');
  control.setAttribute('aria-label', `${checked ? t("Disable") : t("Enable")} ${skill.name}`);
  control.dataset.skillId = skill.key;
  control.disabled = Boolean(busy) || blocked;
  control.append(el('span', 'sk-thumb'));
  control.addEventListener('click', () => {
    if (control.disabled) return;
    void toggleSkill(skill, !checked);
  });

  if (checked) note.textContent = blocked ? t("Directory cannot be read") : skill.advertised ? t("Eligible for advertisement (estimate)") : t("Not advertised (estimate)");
  else note.textContent = blocked ? t("Directory cannot be read") : t("Entry disabled");
  top.append(control);
  appendSkillMenu(top, skill);
  holder.append(note, top);
  return holder;
};

const renderSkill = (skill: SkillView): HTMLElement => {
  const row = el('article', 'sk-skill');
  row.dataset.state = skill.state;
  row.setAttribute('role', 'listitem');
  const main = el('div', 'sk-skill-main');
  const head = el('div', 'sk-skill-head');
  head.append(
    el('strong', 'sk-name', skill.name),
    badge(stateText(skill), toneForState(skill)),
    badge(skill.scope === 'project' ? t('Project') : t('Global'), skill.scope === 'project' ? 'info' : 'neutral'),
  );
  if (skill.duplicateResolution) {
    const status = skill.duplicateResolution.status;
    head.append(badge(status === 'highest-scanned' ? t('Highest scanned precedence') : status === 'shadowed' ? t('Shadowed in scanned sources') : t('Duplicate: uncertain'), 'warning'));
  }
  const meta = el('div', 'sk-meta');
  meta.append(el('code', 'sk-id', skill.id));
  if (skill.rootPath) {
    const source = el('span', 'sk-source', skill.sourceId === 'opencode-global' ? t('OpenCode') : skill.sourceId === 'opencode-project' ? t('Project OpenCode') : skill.sourceId.replace(/-/g, ' '));
    source.title = skill.rootPath;
    meta.append(source);
  }
  if (skill.estimatedTokens > 0) {
    meta.append(
      el('span', 'sk-token', t('~{tokens} tok', { tokens: skill.estimatedTokens.toLocaleString('en') })),
    );
  }
  const rawDescription = skill.description;
  const descriptionText = rawDescription || t("No description; the model will not select it automatically.");
  const description = el('p', 'sk-desc', descriptionText);
  const expanded = expandedSkills.has(skill.key);
  if (expanded) description.classList.add('is-expanded');
  main.append(head, meta, description);
  if (rawDescription.length > 88 || rawDescription.includes('\n')) {
    const toggleDesc = el('button', 'sk-desc-toggle', expanded ? t("Show less") : t("Show more"));
    toggleDesc.type = 'button';
    toggleDesc.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    toggleDesc.addEventListener('click', () => {
      const nextExpanded = !expandedSkills.has(skill.key);
      if (nextExpanded) expandedSkills.add(skill.key);
      else expandedSkills.delete(skill.key);
      description.classList.toggle('is-expanded', nextExpanded);
      toggleDesc.textContent = nextExpanded ? t("Show less") : t("Show more");
      toggleDesc.setAttribute('aria-expanded', nextExpanded ? 'true' : 'false');
    });
    main.append(toggleDesc);
  }
  if (skill.warnings.length > 0) {
    const warning = el('p', 'sk-warn', skill.warnings.slice(0, 2).join(' · '));
    main.append(warning);
  }
  row.append(main, skillAction(skill));
  return row;
};

const resetFilters = (): void => {
  queryRaw = '';
  stateFilter = 'all';
  sourceFilter = 'all';
  sortMode = 'default';
  searchField.update({ value: '', placeholder: t("Search name, description, or ID (press / to focus)") });
  syncSearchAria();
  stateSelect.update({ value: 'all', options: stateFilterOptions() });
  sourceSelect.update({ value: 'all', options: sourceFilterOptions() });
  sortSelect.update({ value: 'default', options: sortModeOptions() });
  render();
};

const renderList = (): void => {
  listRoot.replaceChildren();
  const snapshot = data;
  if (!snapshot) return;
  const skills = visibleSkills();
  if (skills.length === 0) {
    const hasFilter = queryRaw.trim().length > 0 || stateFilter !== 'all' || sourceFilter !== 'all';
    const empty = el('div', 'sk-empty');
    empty.append(
      el(
        'h2',
        '',
        snapshot.skills.length === 0
          ? t("No skills found")
          : t("No matching skills"),
      ),
      el(
        'p',
        '',
        snapshot.skills.length === 0
          ? t("Check that a skill directory such as {path} exists, or rescan.", { path: snapshot.roots[0]?.path ?? t('the skills directory') })
          : t("Try another search term or change the filters."),
      ),
    );
    if (snapshot.skills.length > 0 && hasFilter) {
      const actions = el('div', 'sk-empty-actions');
      actions.append(actionButton(t("Reset filters"), resetFilters));
      empty.append(actions);
    }
    listRoot.append(empty);
    return;
  }
  for (const skill of skills) {
    listRoot.append(renderSkill(skill));
  }
};

const syncRailBadge = (): void => {
  const next = !data
    ? null
    : data.roots.some((root) => root.error)
      ? 1
      : data.summary.blockingConflicts > 0
        ? data.summary.blockingConflicts
        : null;
  if (next === lastBadgeCount) return;
  lastBadgeCount = next;
  void host.setBadge(next).catch(() => undefined);
};

const render = (): void => {
  app.setAttribute('aria-busy', loading ? 'true' : 'false');
  syncRailBadge();
  renderSummary();
  renderNotice();
  renderConflicts();
  renderSources();
  renderList();
  refresh.update({ label: loading ? t("Reading…") : t("Rescan"), loading, disabled: loading || Boolean(busy) });
  const blocked = rootBlocked();
  enableAll.update({ disabled: loading || Boolean(busy) || !data || blocked });
  disableAll.update({ disabled: loading || Boolean(busy) || !data || blocked });

  const shown = visibleSkills();
  const invert = planInvertSkills(shown);
  listMenu.update({
    items: [
      {
        id: 'invert',
        label: t("Invert visible skills"),
        disabled: loading || Boolean(busy) || !data || invert.enable.length + invert.disable.length === 0,
      },
      { id: 'copy-ids', label: t("Copy visible IDs"), disabled: !data || shown.length === 0 },
    ],
  });
};


const focusSkill = (id: string): void => {
  const target = Array.from(document.querySelectorAll<HTMLElement>('[data-skill-id]')).find(
    (node) => node.dataset.skillId === id,
  );
  target?.focus();
};

const loadSkills = async (showLoading = false, silent = false): Promise<void> => {
  const sequence = ++scanSequence;
  loading = true;
  if (!silent) loadError = null;
  if (showLoading) render();
  try {
    const response = parseResponse(await skillsRequest('GET', '/skills'));
    if (sequence !== scanSequence) return;
    data = response;
    loadError = null;
  } catch (error) {
    if (sequence === scanSequence && !silent) loadError = describeError(error);
  } finally {
    if (sequence === scanSequence) {
      loading = false;
      render();
    }
  }
};

const toggleSkill = async (skill: SkillView, enabled: boolean): Promise<void> => {
  if (busy) return;
  busy = `toggle:${skill.id}`;
  pendingBulk = null;
  pendingInvert = false;
  notice = null;
  render();
  try {
    data = parseResponse(await skillsRequest('POST', '/skills/toggle', { id: skill.key, enabled }));
    notice = {
      text: enabled ? t("Enabled {name}.", { name: skill.name }) : t("Disabled {name}; OpenCode will no longer discover it after the next scan.", { name: skill.name }),
      tone: 'success',
    };
    void host.toast({ kind: 'success', message: enabled ? t("Enabled {name}", { name: skill.name }) : t("Disabled {name}", { name: skill.name }) }).catch(() => undefined);
  } catch (error) {
    notice = { text: describeError(error), tone: 'error' };
    busy = null;
    render();
    void loadSkills(false, true);
    return;
  }
  busy = null;
  render();
  focusSkill(skill.id);
};

const resolveConflict = async (conflict: ConflictView, keep: 'enabled' | 'disabled'): Promise<void> => {
  if (busy) return;
  const entryPath = conflict.activePath ?? conflict.disabledPath;
  if (!entryPath) return;
  busy = `resolve:${entryPath}`;
  pendingBulk = null;
  pendingInvert = false;
  notice = null;
  render();
  try {
    const raw = await skillsRequest('POST', '/skills/resolve', { path: entryPath, keep });
    const backupPath = raw && typeof raw === 'object' && typeof (raw as Record<string, unknown>).backupPath === 'string'
      ? (raw as Record<string, string>).backupPath
      : null;
    data = parseResponse(raw);
    notice = {
      text: keep === 'enabled'
        ? t("Kept the enabled entry{suffix}.", { suffix: backupPath ? t("; the old disabled file was backed up to {path}", { path: backupPath }) : '' })
        : t("Kept the disabled entry{suffix}.", { suffix: backupPath ? t("; the old disabled file was backed up to {path}", { path: backupPath }) : '' }),
      tone: 'success',
    };
    void host.toast({ kind: 'success', message: t("Entry conflict resolved") }).catch(() => undefined);
  } catch (error) {
    notice = { text: describeError(error), tone: 'error' };
    busy = null;
    render();
    void loadSkills(false, true);
    return;
  }
  busy = null;
  render();
};

const requestBulk = (enabled: boolean): void => {
  if (!data || busy) return;
  pendingBulk = enabled;
  pendingInvert = false;
  pendingSourceDisable = null;
  notice = null;
  render();
  noticeRoot.scrollIntoView({ block: 'nearest' });
  noticeRoot.querySelector<HTMLButtonElement>('button')?.focus();
};

const applyBulk = async (): Promise<void> => {
  if (pendingBulk === null || busy) return;
  const enabled = pendingBulk;
  pendingBulk = null;
  pendingInvert = false;
  busy = 'bulk';
  notice = null;
  render();
  try {
    const expectedPaths = data?.skills.flatMap((skill) => enabled ? skill.disabledPaths : skill.activePaths) ?? [];
    const raw = await skillsRequest('POST', '/skills/bulk', { enabled, expectedPaths });
    const changed = raw && typeof raw === 'object' && Array.isArray((raw as Record<string, unknown>).changed)
      ? ((raw as Record<string, unknown>).changed as unknown[]).filter((item): item is string => typeof item === 'string')
      : [];
    data = parseResponse(raw);
    notice = {
      text: enabled ? t("Skills enabled: {count}.", { count: changed.length }) : t("Skills disabled: {count}.", { count: changed.length }),
      tone: 'success',
      ...(raw && typeof raw === 'object' && (raw as Record<string, unknown>).undoAvailable
        ? { actions: [{ label: t('Undo last action'), onClick: () => void undoBulk() }] }
        : {}),
    };
    void host.toast({ kind: 'success', message: enabled ? t("Skills enabled: {count}.", { count: changed.length }) : t("Skills disabled: {count}.", { count: changed.length }) }).catch(() => undefined);
  } catch (error) {
    notice = { text: describeError(error), tone: 'error' };
    busy = null;
    render();
    void loadSkills(false, true);
    return;
  }
  busy = null;
  render();
};

const requestSourceDisable = (sourceId: string): void => {
  if (!data || busy) return;
  pendingSourceDisable = sourceId;
  pendingBulk = null;
  pendingInvert = false;
  notice = null;
  render();
  noticeRoot.scrollIntoView({ block: 'nearest' });
  noticeRoot.querySelector<HTMLButtonElement>('button')?.focus();
};

const applySourceDisable = async (): Promise<void> => {
  if (!data || busy || pendingSourceDisable === null) return;
  const sourceId = pendingSourceDisable;
  const affected = data.skills.filter((skill) => skill.sourceId === sourceId && skill.activePaths.length > 0);
  pendingSourceDisable = null;
  if (affected.length === 0) {
    render();
    return;
  }
  busy = 'bulk';
  notice = null;
  render();
  try {
    const expectedPaths = affected.flatMap((skill) => skill.activePaths);
    const raw = await skillsRequest('POST', '/skills/bulk', { enabled: false, sourceId, expectedPaths });
    data = parseResponse(raw);
    const changed = raw && typeof raw === 'object' && Array.isArray((raw as Record<string, unknown>).changed)
      ? ((raw as Record<string, unknown>).changed as unknown[]).filter((item): item is string => typeof item === 'string')
      : affected.map((skill) => skill.key);
    notice = {
      text: t('Skills disabled in {source}: {count}.', {
        source: data.roots.find((root) => root.sourceId === sourceId)?.label ?? sourceId,
        count: changed.length,
      }),
      tone: 'success',
      ...(raw && typeof raw === 'object' && (raw as Record<string, unknown>).undoAvailable
        ? { actions: [{ label: t('Undo last action'), onClick: () => void undoBulk() }] }
        : {}),
    };
  } catch (error) {
    notice = { text: describeError(error), tone: 'error' };
    busy = null;
    render();
    void loadSkills(false, true);
    return;
  }
  busy = null;
  render();
};

const updateDirectory = (directory: string | null): void => {
  const nextDirectory = typeof directory === 'string' && directory ? directory : null;
  if (initialized) {
    if (nextDirectory !== projectDirectory) {
      projectDirectory = nextDirectory;
      data = null;
      pendingBulk = null;
      pendingInvert = false;
      pendingSourceDisable = null;
      void loadSkills(true);
      } else {
      render();
    }
    return;
  }
  initialized = true;
  projectDirectory = nextDirectory;
  void loadSkills(true);
};

host.onReady((context) => {
  applyHostReady(context, document.documentElement);
  document.documentElement.lang = 'en';
  document.title = t("Skills Manager");
  updateDirectory(context.directory);
});

host.onDirectory((directory) => updateDirectory(directory));

document.title = t("Skills Manager");
render();
