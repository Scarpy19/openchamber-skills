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
  GROUP_NAME_MAX,
  mergeExampleGroups,
  moveGroupMember,
  normalizeGroupsFile,
  type SkillGroup,
} from '../shared/groups.ts';
import {
  filterAndSortSkills,
  matchesSkillQuery,
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
type GroupDraft = { id: string | null; name: string; members: string[] };

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

const parseGroups = (value: unknown): SkillGroup[] => {
  try {
    return normalizeGroupsFile(value).groups;
  } catch (error) {
    throw new ServiceError(error instanceof Error ? error.message : t("The group configuration format is invalid."), 'parse', []);
  }
};

const request = async (method: 'GET' | 'POST', path: string, body?: unknown): Promise<unknown> => {
  const response = await host.serviceRequest({
    method,
    path,
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
  const suffix = projectDirectory ? `${path.includes('?') ? '&' : '?'}directory=${encodeURIComponent(projectDirectory)}` : '';
  const payload = body === undefined || method === 'GET'
    ? undefined
    : { ...(body as Record<string, unknown>), directory: projectDirectory ?? undefined };
  return request(method, `${path}${suffix}`, payload);
};

const findVisibleSkill = (idOrKey: string): SkillView | undefined =>
  data?.skills.find((skill) => skill.key === idOrKey) ??
  data?.skills.filter((skill) => skill.id === idOrKey)[0];

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

const describeGroupsError = (error: unknown): string =>
  error instanceof ServiceError && error.code === 'not-found'
    ? t("The local service is too old. Disable and re-enable \"Skills\" in extension settings.")
    : describeError(error);

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
    void reloadGroups();
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
const groupsNote = el('div', 'sk-groups-note');
const groupsRow = el('div', 'sk-groups-row');
const groupsRoot = el('div', 'sk-groups');
const groupSelectRoot = el('div', 'sk-group-select');
const editGroups = el('button', 'sk-chip sk-groups-edit', t("Edit groups"));
editGroups.type = 'button';
editGroups.setAttribute('aria-pressed', 'false');
editGroups.addEventListener('click', () => {
  if (groupDraft) closeGroupEditor();
  else openGroupEditor();
});
groupsRow.append(groupsRoot, groupSelectRoot, editGroups);
const groupEditor = el('div', 'sk-group-editor-root');
const groupBarRoot = el('div');
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
body.append(noticeRoot, groupsNote, groupsRow, groupEditor, groupBarRoot, conflictRoot, sourcesRoot, toolbar, listRoot, footer);
app.append(header, body);
root.append(app);

let data: SkillsResponse | null = null;
let loading = false;
let loadError: string | null = null;
let notice: Notice | null = null;
let busy: string | null = null;
let pendingBulk: boolean | null = null;
let pendingInvert = false;
let pendingOnlyGroup: SkillGroup | null = null;
let selectedGroup: string | null = null;
let groups: SkillGroup[] = [];
let groupsError: string | null = null;
let groupsLoading = true;
let groupDraft: GroupDraft | null = null;
let groupEditorError: string | null = null;
let pendingDeleteGroup = false;
let pendingImportExamples = false;
let memberFilterQuery = '';
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
    renderList();
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
    renderList();
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
    renderList();
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
    renderList();
  },
});
const sortSelectTrigger = sortSlot.querySelector<HTMLButtonElement>('.oc-sdk-trigger');
if (sortSelectTrigger) {
  sortSelectTrigger.setAttribute('aria-label', t("Sort order"));
  sortSelectTrigger.removeAttribute('aria-labelledby');
}

const groupSelect = mountSelect(groupSelectRoot, {
  value: 'all',
  options: [{ id: 'all', label: t("All") }],
  onChange: (id) => {
    selectedGroup = id === 'all' ? null : id;
    render();
  },
});
const groupSelectTrigger = groupSelectRoot.querySelector<HTMLButtonElement>('.oc-sdk-trigger');
if (groupSelectTrigger) {
  groupSelectTrigger.setAttribute('aria-label', t("Filter by group"));
  groupSelectTrigger.removeAttribute('aria-labelledby');
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
    if (pendingOnlyGroup || pendingBulk !== null || pendingInvert) {
      event.preventDefault();
      pendingOnlyGroup = null;
      pendingBulk = null;
      pendingInvert = false;
      render();
      return;
    }
    if (groupDraft && !busy) {
      event.preventDefault();
      if (pendingDeleteGroup || pendingImportExamples) {
        pendingDeleteGroup = false;
        pendingImportExamples = false;
        render();
      } else {
        closeGroupEditor();
      }
    }
  }
});

const rootBlocked = (): boolean => Boolean(data?.root.error || data?.roots.some((root) => root.error));

const visibleSkills = (): SkillView[] => {
  const snapshot = data;
  if (!snapshot) return [];
  const group = selectedGroup ? groups.find((item) => item.id === selectedGroup) : null;
  const base = group
    ? group.skillIds
        .map((id) => findVisibleSkill(id))
        .filter((skill): skill is SkillView => Boolean(skill))
    : snapshot.skills;
  return filterAndSortSkills(base, { query: queryRaw, stateFilter, sourceFilter, sortMode });
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
    item.append(head, el('code', 'sk-source-path', root.path || t('No path')));
    if (root.error) item.append(el('p', 'sk-source-error', root.error));
    list.append(item);
  }
  sourcesRoot.append(list);
  sourcesRoot.open = open;
};

const renderNotice = (): void => {
  noticeRoot.replaceChildren();
  if (pendingOnlyGroup) {
    const group = pendingOnlyGroup;
    const memberIds = new Set(group.skillIds);
    const others = data ? data.skills.filter((skill) => !memberIds.has(skill.key) && !memberIds.has(skill.id)).length : 0;
    const node = el('div', 'sk-notice', t("Enable only \"{name}\": other skills disabled: {count}.", { name: group.name, count: others }));
    node.dataset.tone = 'warning';
    node.setAttribute('role', 'status');
    const actions = el('div', 'sk-notice-actions');
    actions.append(
      actionButton(t("Confirm"), () => void applyOnlyGroup(), true),
      actionButton(t("Cancel"), () => {
        pendingOnlyGroup = null;
        render();
      }),
    );
    node.append(actions);
    noticeRoot.append(node);
    return;
  }
  if (pendingInvert) {
    const plan = planInvertSkills(visibleSkills());
    const total = plan.enable.length + plan.disable.length;
    const node = el('div', 'sk-notice', t("Invert visible skills: enable {enable}, disable {disable}.", {
      enable: plan.enable.length,
      disable: plan.disable.length,
    }));
    node.dataset.tone = 'warning';
    node.setAttribute('role', 'status');
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
  if (notice) {
    const node = el('div', 'sk-notice', notice.text);
    node.dataset.tone = notice.tone;
    node.setAttribute('role', notice.tone === 'error' ? 'alert' : 'status');
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

const renderSummary = (): void => {
  if (!data) {
    summary.textContent = loading ? t("Reading skills…") : t("Skills not read yet.");
    summarySecondary.textContent = t("After disabling an entry document, OpenCode no longer discovers that skill.");
    return;
  }
  summary.textContent = t("Model sees {advertised} of {total} · about {tokens} tokens/step", {
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

/** Resolves stored keys or legacy bare IDs to current scope-qualified keys. */
const groupSkillIds = (group: SkillGroup): string[] =>
  group.skillIds
    .map((id) => findVisibleSkill(id)?.key)
    .filter((key): key is string => Boolean(key));

const groupState = (group: SkillGroup): string => {
  const skills = groupSkillIds(group)
    .map((id) => findVisibleSkill(id))
    .filter((skill): skill is SkillView => Boolean(skill));
  if (skills.length === 0) return t("No skills");
  if (skills.some((skill) => skill.state === 'conflict')) return t("Has conflicts");
  const enabled = skills.filter((skill) => skill.state === 'enabled').length;
  if (enabled === skills.length) return t("All on");
  if (enabled === 0) return t("All off");
  return t("Partial");
};

const focusGroupChip = (id: string): void => {
  const target = Array.from(groupsRoot.querySelectorAll<HTMLElement>('[data-group]')).find(
    (node) => node.dataset.group === id,
  );
  target?.focus();
};

const makeGroupId = (): string => {
  const suffix = globalThis.crypto?.randomUUID?.().slice(0, 8) ?? Math.random().toString(36).slice(2, 10);
  return `custom-${suffix}`;
};

const renderGroupsNote = (): void => {
  groupsNote.replaceChildren();
  if (groupsError) {
    const node = el('div', 'sk-notice', t("Cannot read group configuration: {error}", { error: groupsError }));
    node.dataset.tone = 'error';
    node.setAttribute('role', 'alert');
    const actions = el('div', 'sk-notice-actions');
    actions.append(actionButton(t("Reload"), () => void reloadGroups(), false, groupsLoading));
    node.append(actions);
    groupsNote.append(node);
    return;
  }
  if (groupsLoading || groups.length > 0 || !data || rootBlocked()) return;
  groupsNote.append(el('div', 'sk-notice', t("No groups yet. Click \"Edit groups\" to create one, or import example groups in the editor.")));
};

const startGroupDraft = (group: SkillGroup | null): void => {
  groupDraft = {
    id: group?.id ?? null,
    name: group?.name ?? '',
    members: group ? [...group.skillIds] : [],
  };
  memberFilterQuery = '';
  groupEditorError = null;
  pendingDeleteGroup = false;
  pendingImportExamples = false;
  render();
  const input = groupEditor.querySelector<HTMLInputElement>('.sk-group-name');
  input?.focus();
  input?.select();
};

const openGroupEditor = (): void => {
  if (groupsError || groupsLoading || !data || rootBlocked()) return;
  const group = groups.find((item) => item.id === selectedGroup) ?? groups[0] ?? null;
  startGroupDraft(group);
  groupEditor.scrollIntoView({ block: 'nearest' });
};

const closeGroupEditor = (): void => {
  if (busy) return;
  groupDraft = null;
  memberFilterQuery = '';
  groupEditorError = null;
  pendingDeleteGroup = false;
  pendingImportExamples = false;
  render();
  editGroups.focus();
};

const selectDraftGroup = (id: string): void => {
  if (id === 'new') {
    startGroupDraft(null);
    return;
  }
  const group = groups.find((item) => item.id === id);
  if (group) startGroupDraft(group);
};

const focusDraftName = (): void => {
  groupEditor.querySelector<HTMLInputElement>('.sk-group-name')?.focus();
};

const saveGroupDraft = async (): Promise<void> => {
  const draft = groupDraft;
  if (!draft || busy || groupsError) return;
  const name = draft.name.trim();
  if (!name) {
    groupEditorError = t("Enter a group name.");
    render();
    focusDraftName();
    return;
  }
  if (name.length > GROUP_NAME_MAX) {
    groupEditorError = t("Group names cannot exceed {count} characters.", { count: GROUP_NAME_MAX });
    render();
    focusDraftName();
    return;
  }
  if (groups.some((group) => group.id !== draft.id && group.name.trim().toLowerCase() === name.toLowerCase())) {
    groupEditorError = t("A group named \"{name}\" already exists.", { name });
    render();
    focusDraftName();
    return;
  }
  if (draft.members.length === 0) {
    groupEditorError = t("A group needs at least one member.");
    render();
    return;
  }
  const id = draft.id ?? makeGroupId();
  const saved: SkillGroup = { id, name, skillIds: [...draft.members] };
  const next = draft.id
    ? groups.map((group) => (group.id === draft.id ? saved : group))
    : [...groups, saved];
  busy = 'groups';
  groupEditorError = null;
  render();
  try {
    groups = parseGroups(await request('POST', '/groups', { version: 1, groups: next }));
    groupsError = null;
    selectedGroup = id;
    pendingOnlyGroup = null;
    const stored = groups.find((group) => group.id === id) ?? null;
    groupDraft = stored ? { id: stored.id, name: stored.name, members: [...stored.skillIds] } : null;
    notice = { text: t("Group \"{name}\" saved.", { name }), tone: 'success' };
    void host.toast({ kind: 'success', message: t("Group \"{name}\" saved.", { name }) }).catch(() => undefined);
  } catch (error) {
    groupEditorError = describeError(error);
  } finally {
    busy = null;
    render();
  }
};

const requestDeleteGroup = (): void => {
  if (!groupDraft?.id || busy) return;
  pendingDeleteGroup = true;
  pendingImportExamples = false;
  render();
};

const confirmDeleteGroup = async (): Promise<void> => {
  if (!groupDraft?.id || busy) return;
  const removed = groupDraft.id;
  const next = groups.filter((group) => group.id !== removed);
  busy = 'groups';
  pendingDeleteGroup = false;
  groupEditorError = null;
  render();
  try {
    groups = parseGroups(await request('POST', '/groups', { version: 1, groups: next }));
    groupsError = null;
    if (pendingOnlyGroup?.id === removed) pendingOnlyGroup = null;
    if (selectedGroup === removed) selectedGroup = null;
    const target = groups.find((group) => group.id === selectedGroup) ?? groups[0] ?? null;
    selectedGroup = target?.id ?? null;
    groupDraft = target ? { id: target.id, name: target.name, members: [...target.skillIds] } : null;
    notice = { text: t("Group deleted."), tone: 'success' };
  } catch (error) {
    groupEditorError = describeError(error);
  } finally {
    busy = null;
    render();
  }
};

const requestImportExamples = (): void => {
  if (busy || groupsLoading || groupsError) return;
  if (mergeExampleGroups(groups).added.length === 0) {
    notice = { text: t("Every example group name or ID already exists; nothing to import."), tone: 'info' };
    render();
    return;
  }
  pendingImportExamples = true;
  pendingDeleteGroup = false;
  render();
};

const confirmImportExamples = async (): Promise<void> => {
  if (busy) return;
  const { groups: next, added } = mergeExampleGroups(groups);
  pendingImportExamples = false;
  if (added.length === 0) {
    notice = { text: t("Every example group name or ID already exists; nothing to import."), tone: 'info' };
    render();
    return;
  }
  busy = 'groups';
  groupEditorError = null;
  render();
  try {
    groups = parseGroups(await request('POST', '/groups', { version: 1, groups: next }));
    groupsError = null;
    notice = { text: t("Example groups imported: {count}.", { count: added.length }), tone: 'success' };
  } catch (error) {
    groupEditorError = describeError(error);
  } finally {
    busy = null;
    render();
  }
};

const renderGroupEditor = (): void => {
  groupEditor.replaceChildren();
  if (!groupDraft) return;
  const draft = groupDraft;
  const card = el('section', 'sk-group-editor');
  card.setAttribute('aria-label', t("Edit groups"));
  const head = el('div', 'sk-section-head');
  head.append(el('h2', 'sk-section-title', t("Edit groups")), actionButton(t("Close"), closeGroupEditor, false, Boolean(busy)));
  card.append(head);

  const selectField = el('label', 'sk-field');
  selectField.append(el('span', 'sk-field-label', t("Choose a group")));
  const select = el('select', 'sk-input');
  select.setAttribute('aria-label', t("Choose a group"));
  const newOption = el('option', '', t("New group"));
  newOption.value = 'new';
  select.append(newOption);
  for (const group of groups) {
    const option = el('option', '', `${group.name} (${group.skillIds.length})`);
    option.value = group.id;
    select.append(option);
  }
  select.value = draft.id ?? 'new';
  select.disabled = Boolean(busy);
  select.addEventListener('change', () => selectDraftGroup(select.value));
  selectField.append(select);

  const nameField = el('label', 'sk-field');
  nameField.append(el('span', 'sk-field-label', t("Name")));
  const nameInput = el('input', 'sk-input sk-group-name') as HTMLInputElement;
  nameInput.type = 'text';
  nameInput.value = draft.name;
  nameInput.maxLength = GROUP_NAME_MAX;
  nameInput.placeholder = t("e.g. Daily development");
  nameInput.autocomplete = 'off';
  nameInput.spellcheck = false;
  nameInput.disabled = Boolean(busy);
  nameInput.addEventListener('input', () => {
    if (!groupDraft) return;
    groupDraft.name = nameInput.value;
    groupEditorError = null;
  });
  nameInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    if (event.isComposing || event.keyCode === 229) return;
    void saveGroupDraft();
  });
  nameField.append(nameInput);
  card.append(selectField, nameField);

  const members = el('fieldset', 'sk-members');
  const legend = el('legend', '', t("Members ({count})", { count: draft.members.length }));
  members.append(legend);
  const tools = el('div', 'sk-members-tools');
  const memberFilter = el('input', 'sk-member-filter') as HTMLInputElement;
  memberFilter.type = 'search';
  memberFilter.value = memberFilterQuery;
  memberFilter.placeholder = t("Filter member name or ID");
  memberFilter.setAttribute('aria-label', t("Filter member name or ID"));
  memberFilter.disabled = Boolean(busy);
  tools.append(
    memberFilter,
    actionButton(t("Select all"), () => {
      if (!groupDraft) return;
      const existing = data?.skills.map((skill) => skill.id) ?? [];
      const missing = groupDraft.members.filter((id) => !existing.includes(id));
      groupDraft.members = [...existing, ...missing];
      render();
    }, false, Boolean(busy)),
    actionButton(t("Clear"), () => {
      if (!groupDraft) return;
      groupDraft.members = [];
      render();
    }, false, Boolean(busy)),
  );
  members.append(tools);
  const memberList = el('div', 'sk-member-list');
  const orderBox = el('div', 'sk-order-box');

  const syncDraftUi = (focusKey?: string): void => {
    if (!groupDraft) return;
    legend.textContent = t("Members ({count})", { count: groupDraft.members.length });
    renderMemberChecklist();
    renderOrderBox(focusKey);
  };

  const renderMemberChecklist = (): void => {
    memberList.replaceChildren();
    if (!groupDraft) return;
    const allSkills = data?.skills ?? [];
    const visibleSkills = allSkills.filter((skill) =>
      matchesSkillQuery(skill, memberFilterQuery),
    );
    if (visibleSkills.length === 0) {
      memberList.append(el('p', 'sk-member-empty', t("No matching members")));
      return;
    }
    for (const skill of visibleSkills) {
      const row = el('label', 'sk-check');
      const checkbox = el('input') as HTMLInputElement;
      checkbox.type = 'checkbox';
      checkbox.checked = groupDraft.members.includes(skill.key);
      checkbox.disabled = Boolean(busy);
      checkbox.addEventListener('change', () => {
        if (!groupDraft) return;
        if (checkbox.checked) {
          if (!groupDraft.members.includes(skill.key)) groupDraft.members.push(skill.key);
        } else {
          groupDraft.members = groupDraft.members.filter((id) => id !== skill.key);
        }
        groupEditorError = null;
        legend.textContent = t("Members ({count})", { count: groupDraft.members.length });
        renderOrderBox();
      });
      const copy = el('span', 'sk-check-copy');
      copy.append(el('span', 'sk-check-name', skill.name), el('code', 'sk-check-id', skill.id));
      row.append(checkbox, copy);
      memberList.append(row);
    }
  };

  const renderOrderBox = (focusKey?: string): void => {
    orderBox.replaceChildren();
    if (!groupDraft || groupDraft.members.length === 0) return;
    orderBox.append(el('p', 'sk-order-title', t("Step order ({count})", { count: groupDraft.members.length })));
    const list = el('ol', 'sk-order-list');
    for (const [index, memberId] of groupDraft.members.entries()) {
      const skill = findVisibleSkill(memberId) ?? null;
      const memberLabel = skill ? skill.name : memberId;
      const item = el('li', 'sk-order-item');
      const label = el('span', 'sk-order-label');
      label.append(
        el('span', 'sk-step', String(index + 1)),
        el('span', 'sk-order-name', memberLabel),
      );
      const controls = el('span', 'sk-order-actions');
      const up = el('button', 'sk-order-btn', '↑');
      up.type = 'button';
      up.disabled = Boolean(busy) || index === 0;
      up.dataset.orderFocus = `up:${memberId}`;
      up.title = t("Move \"{name}\" up", { name: memberLabel });
      up.setAttribute('aria-label', t("Move \"{name}\" up", { name: memberLabel }));
      up.addEventListener('click', () => {
        if (!groupDraft) return;
        groupDraft.members = moveGroupMember(groupDraft.members, index, -1);
        syncDraftUi(`up:${memberId}`);
      });

      const down = el('button', 'sk-order-btn', '↓');
      down.type = 'button';
      down.disabled = Boolean(busy) || index === groupDraft.members.length - 1;
      down.dataset.orderFocus = `down:${memberId}`;
      down.title = t("Move \"{name}\" down", { name: memberLabel });
      down.setAttribute('aria-label', t("Move \"{name}\" down", { name: memberLabel }));
      down.addEventListener('click', () => {
        if (!groupDraft) return;
        groupDraft.members = moveGroupMember(groupDraft.members, index, 1);
        syncDraftUi(`down:${memberId}`);
      });

      const remove = el('button', 'sk-order-btn', '×');
      remove.type = 'button';
      remove.disabled = Boolean(busy);
      remove.title = t("Remove \"{name}\"", { name: memberLabel });
      remove.setAttribute('aria-label', t("Remove \"{name}\"", { name: memberLabel }));
      remove.addEventListener('click', () => {
        if (!groupDraft) return;
        groupDraft.members = groupDraft.members.filter((id) => id !== memberId);
        syncDraftUi();
      });

      controls.append(up, down, remove);
      item.append(label, controls);
      list.append(item);
    }
    orderBox.append(list);
    if (focusKey) {
      const btn = Array.from(orderBox.querySelectorAll<HTMLButtonElement>('[data-order-focus]')).find(
        (node) => node.dataset.orderFocus === focusKey && !node.disabled,
      );
      btn?.focus();
    }
  };

  memberFilter.addEventListener('input', () => {
    memberFilterQuery = memberFilter.value;
    renderMemberChecklist();
  });

  renderMemberChecklist();
  renderOrderBox();
  members.append(memberList, orderBox);

  const existingIds = new Set(data?.skills.flatMap((skill) => [skill.id, skill.key]) ?? []);
  const missing = draft.members.filter((id) => !existingIds.has(id));
  if (missing.length > 0) {
    const box = el('div', 'sk-missing');
    box.append(el('span', 'sk-missing-label', t("Missing from the directory:")));
    for (const id of missing) {
      const chip = el('button', 'sk-missing-chip', `${id} ×`);
      chip.type = 'button';
      chip.disabled = Boolean(busy);
      chip.title = t("Remove this missing member from the group");
      chip.addEventListener('click', () => {
        if (!groupDraft) return;
        groupDraft.members = groupDraft.members.filter((item) => item !== id);
        render();
      });
      box.append(chip);
    }
    members.append(box);
  }
  card.append(members);

  if (groupEditorError) {
    const error = el('p', 'sk-editor-error', groupEditorError);
    error.setAttribute('role', 'alert');
    card.append(error);
  }

  const actions = el('div', 'sk-editor-actions');
  if (draft.id) actions.append(actionButton(t("Delete group"), requestDeleteGroup, false, Boolean(busy)));
  actions.append(
    actionButton(t("Import example groups"), requestImportExamples, false, Boolean(busy)),
    actionButton(draft.id ? t("Save changes") : t("New group"), () => void saveGroupDraft(), true, Boolean(busy)),
  );
  card.append(actions);

  if (pendingDeleteGroup) {
    const confirm = el('div', 'sk-editor-confirm');
    confirm.dataset.tone = 'warning';
    confirm.append(el('p', '', t("Delete group \"{name}\"? The skills themselves are not deleted.", { name: draft.name.trim() || t("Unnamed") })));
    const buttons = el('div', 'sk-actions');
    buttons.append(
      actionButton(t("Confirm delete"), () => void confirmDeleteGroup(), true, Boolean(busy)),
      actionButton(t("Cancel"), () => { pendingDeleteGroup = false; render(); }, false, Boolean(busy)),
    );
    confirm.append(buttons);
    card.append(confirm);
  }

  if (pendingImportExamples) {
    const importable = mergeExampleGroups(groups).added.length;
    const confirm = el('div', 'sk-editor-confirm');
    confirm.dataset.tone = 'warning';
    confirm.append(el('p', '', t("Import example groups: {count}? Groups with the same name or ID are skipped; the current group is not overwritten.", { count: importable })));
    const buttons = el('div', 'sk-actions');
    buttons.append(
      actionButton(t("Confirm import"), () => void confirmImportExamples(), true, Boolean(busy)),
      actionButton(t("Cancel"), () => { pendingImportExamples = false; render(); }, false, Boolean(busy)),
    );
    confirm.append(buttons);
    card.append(confirm);
  }

  card.append(el('p', 'sk-editor-hint', t("Groups only affect panel filtering and bulk toggles; they do not change skills. Member order sets step numbers and is saved to groups.json.")));
  groupEditor.append(card);
};

const renderGroups = (): void => {
  groupsRoot.replaceChildren();
  const total = data?.skills.length ?? 0;
  const all = el('button', 'sk-chip', t("All {count}", { count: total }));
  all.type = 'button';
  all.dataset.group = 'all';
  all.setAttribute('aria-pressed', selectedGroup === null ? 'true' : 'false');
  all.addEventListener('click', () => {
    selectedGroup = null;
    render();
    focusGroupChip('all');
  });
  groupsRoot.append(all);
  for (const group of groups) {
    const count = groupSkillIds(group).length;
    const chip = el('button', 'sk-chip', `${group.name} ${count}`);
    chip.type = 'button';
    chip.dataset.group = group.id;
    chip.setAttribute('aria-pressed', selectedGroup === group.id ? 'true' : 'false');
    chip.addEventListener('click', () => {
      selectedGroup = group.id;
      render();
      focusGroupChip(group.id);
    });
    groupsRoot.append(chip);
  }
  editGroups.textContent = groupDraft ? t("Close editor") : t("Edit groups");
  editGroups.setAttribute('aria-pressed', groupDraft ? 'true' : 'false');
  editGroups.disabled = groupsLoading || Boolean(groupsError) || Boolean(busy) || !data || rootBlocked();
  editGroups.title = groupsLoading
    ? t("Reading groups…")
    : groupsError
      ? t("Cannot read the group configuration. Repair the file and reload.")
      : !data
        ? t("Skills not read yet")
        : rootBlocked()
          ? t("Skill directory cannot be read")
          : '';
  groupSelect.update({
    value: selectedGroup ?? 'all',
    options: [
      { id: 'all', label: t("All {count}", { count: total }) },
      ...groups.map((group) => ({
        id: group.id,
        label: `${group.name} ${groupSkillIds(group).length}`,
        hint: groupState(group),
      })),
    ],
  });
};

const renderGroupBar = (): void => {
  groupBarRoot.replaceChildren();
  if (!data || !selectedGroup) return;
  const group = groups.find((item) => item.id === selectedGroup);
  if (!group) return;
  const available = groupSkillIds(group);
  const missing = group.skillIds.filter((id) => !findVisibleSkill(id));
  const skills = available
    .map((id) => findVisibleSkill(id))
    .filter((skill): skill is SkillView => Boolean(skill));
  const conflict = skills.some((skill) => skill.state === 'conflict');
  const blocked = rootBlocked() || conflict || available.length === 0;
  const bar = el('div', 'sk-groupbar');
  const text = el('div', 'sk-groupbar-text');
  text.append(el('strong', '', group.name), el('span', 'sk-group-state', t("{state} · {count}", { count: available.length, state: groupState(group) })));
  if (missing.length > 0) text.append(el('p', 'sk-group-warning', t("Missing: {names}", { names: missing.join(', ') })));
  const actions = el('div', 'sk-groupbar-actions');
  actions.append(
    actionButton(t("Enable group"), () => void runGroup(group, true), false, blocked),
    actionButton(t("Disable group"), () => void runGroup(group, false), false, blocked),
  );
  const only = actionButton(t("Enable only this group"), () => requestOnlyGroup(group), false, blocked || missing.length > 0);
  if (missing.length > 0) only.title = t("The group has missing skills. Resolve them before enabling only this group.");
  actions.append(only);
  bar.append(text, actions);
  groupBarRoot.append(bar);
};

const runGroup = async (group: SkillGroup, enabled: boolean): Promise<void> => {
  if (!data || busy) return;
  const ids = groupSkillIds(group);
  if (ids.length === 0) return;
  busy = `group:${group.id}:${enabled ? 'on' : 'off'}`;
  pendingOnlyGroup = null;
  pendingBulk = null;
  pendingInvert = false;
  notice = null;
  render();
  try {
    data = parseResponse(await skillsRequest('POST', '/skills/batch', {
      enable: enabled ? ids : [],
      disable: enabled ? [] : ids,
    }));
    notice = {
      text: enabled ? t("Skills enabled in \"{name}\": {count}.", { name: group.name, count: ids.length }) : t("Skills disabled in \"{name}\": {count}.", { name: group.name, count: ids.length }),
      tone: 'success',
    };
    void host.toast({ kind: 'success', message: enabled ? t("Enabled \"{name}\"", { name: group.name }) : t("Disabled \"{name}\"", { name: group.name }) }).catch(() => undefined);
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

const requestOnlyGroup = (group: SkillGroup): void => {
  if (!data || busy) return;
  const available = groupSkillIds(group);
  const missing = group.skillIds.filter((id) => !findVisibleSkill(id));
  if (available.length === 0 || missing.length > 0) return;
  pendingOnlyGroup = group;
  pendingBulk = null;
  pendingInvert = false;
  notice = null;
  render();
  noticeRoot.scrollIntoView({ block: 'nearest' });
  noticeRoot.querySelector<HTMLButtonElement>('button')?.focus();
};

const applyOnlyGroup = async (): Promise<void> => {
  if (!data || busy || !pendingOnlyGroup) return;
  const group = pendingOnlyGroup;
  pendingOnlyGroup = null;
  pendingInvert = false;
  const enable = groupSkillIds(group);
  const missing = group.skillIds.filter((id) => !findVisibleSkill(id));
  if (enable.length === 0 || missing.length > 0) {
    notice = { text: t("The group has missing skills; nothing was run."), tone: 'error' };
    render();
    return;
  }
  const memberIds = new Set(enable);
  const disable = data.skills.filter((skill) => !memberIds.has(skill.key)).map((skill) => skill.key);
  busy = `group-only:${group.id}`;
  notice = null;
  render();
  try {
    data = parseResponse(await skillsRequest('POST', '/skills/batch', { enable, disable }));
    notice = {
      text: t("Enabled only \"{name}\"; other skills disabled: {count}.", { name: group.name, count: disable.length }),
      tone: 'success',
    };
    void host.toast({ kind: 'success', message: t("Enabled only \"{name}\"", { name: group.name }) }).catch(() => undefined);
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
  pendingOnlyGroup = null;
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
    data = parseResponse(await skillsRequest('POST', '/skills/batch', plan));
    notice = { text: t("Inverted {count} visible skills.", { count }), tone: 'success' };
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

  if (checked) note.textContent = blocked ? t("Directory cannot be read") : skill.advertised ? t("Visible to the model") : t("Not visible to the model");
  else note.textContent = blocked ? t("Directory cannot be read") : t("Entry disabled");
  top.append(control);
  appendSkillMenu(top, skill);
  holder.append(note, top);
  return holder;
};

const renderSkill = (skill: SkillView, step = 0): HTMLElement => {
  const row = el('article', 'sk-skill');
  row.dataset.state = skill.state;
  row.setAttribute('role', 'listitem');
  const main = el('div', 'sk-skill-main');
  const head = el('div', 'sk-skill-head');
  if (step > 0) {
    const marker = el('span', 'sk-step', String(step));
    marker.title = t("Step {step}", { step });
    marker.setAttribute('aria-label', t("Step {step}", { step }));
    head.append(marker);
  }
  head.append(
    el('strong', 'sk-name', skill.name),
    badge(stateText(skill), toneForState(skill)),
    badge(skill.scope === 'project' ? t('Project') : t('Global'), skill.scope === 'project' ? 'info' : 'neutral'),
  );
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
  renderList();
};

const renderList = (): void => {
  listRoot.replaceChildren();
  const snapshot = data;
  if (!snapshot) return;
  const group = selectedGroup ? groups.find((item) => item.id === selectedGroup) : null;
  const base = group
    ? group.skillIds
        .map((id) => findVisibleSkill(id))
        .filter((skill): skill is SkillView => Boolean(skill))
    : snapshot.skills;
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
          : group && base.length === 0
            ? t("This group has no available skills")
            : t("No matching skills"),
      ),
      el(
        'p',
        '',
        snapshot.skills.length === 0
          ? t("Check that a skill directory such as {path} exists, or rescan.", { path: snapshot.roots[0]?.path ?? t('the skills directory') })
          : group && base.length === 0
            ? t("Check whether the skills in this group were removed.")
            : t("Try another search term or change the status filter."),
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
    const memberIndex = group ? group.skillIds.indexOf(skill.key) : -1;
    const step = group && group.skillIds.length > 1 ? (memberIndex >= 0 ? memberIndex : group.skillIds.indexOf(skill.id)) + 1 : 0;
    listRoot.append(renderSkill(skill, step));
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
  renderGroupsNote();
  renderGroups();
  renderGroupEditor();
  renderGroupBar();
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
  if (loading) return;
  loading = true;
  if (!silent) loadError = null;
  if (showLoading) render();
  try {
    data = parseResponse(await skillsRequest('GET', '/skills'));
    loadError = null;
  } catch (error) {
    if (!silent) loadError = describeError(error);
  } finally {
    loading = false;
    render();
  }
};

const reloadGroups = async (force = false): Promise<void> => {
  if ((groupsLoading && !force) || groupDraft) return;
  groupsLoading = true;
  render();
  try {
    groups = parseGroups(await request('GET', '/groups'));
    groupsError = null;
    if (selectedGroup && !groups.some((group) => group.id === selectedGroup)) selectedGroup = null;
  } catch (error) {
    groupsError = describeGroupsError(error);
  } finally {
    groupsLoading = false;
    render();
  }
};

const toggleSkill = async (skill: SkillView, enabled: boolean): Promise<void> => {
  if (busy) return;
  busy = `toggle:${skill.id}`;
  pendingBulk = null;
  pendingOnlyGroup = null;
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
  pendingOnlyGroup = null;
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
  pendingOnlyGroup = null;
  pendingInvert = false;
  notice = null;
  render();
  noticeRoot.scrollIntoView({ block: 'nearest' });
  noticeRoot.querySelector<HTMLButtonElement>('button')?.focus();
};

const applyBulk = async (): Promise<void> => {
  if (pendingBulk === null || busy) return;
  const enabled = pendingBulk;
  pendingBulk = null;
  pendingOnlyGroup = null;
  pendingInvert = false;
  busy = 'bulk';
  notice = null;
  render();
  try {
    const raw = await skillsRequest('POST', '/skills/bulk', { enabled });
    const changed = raw && typeof raw === 'object' && Array.isArray((raw as Record<string, unknown>).changed)
      ? ((raw as Record<string, unknown>).changed as unknown[]).filter((item): item is string => typeof item === 'string')
      : [];
    data = parseResponse(raw);
    notice = {
      text: enabled ? t("Skills enabled: {count}.", { count: changed.length }) : t("Skills disabled: {count}.", { count: changed.length }),
      tone: 'success',
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

host.onReady((context) => {
  applyHostReady(context, document.documentElement);
  document.documentElement.lang = 'en';
  document.title = t("Skills Manager");
  const nextDirectory = typeof context.directory === 'string' && context.directory ? context.directory : null;
  if (initialized) {
    if (nextDirectory !== projectDirectory) {
      projectDirectory = nextDirectory;
      selectedGroup = null;
      void loadSkills(true);
      void reloadGroups();
    } else {
      render();
    }
    return;
  }
  initialized = true;
  projectDirectory = nextDirectory;
  void loadSkills(true);
  void reloadGroups(true);
});

document.title = t("Skills Manager");
render();
