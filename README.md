# Skills Manager for OpenChamber

Skills Manager enables or disables OpenCode file skills by renaming their entry files. It never rewrites skill bodies, never creates skills, and never deletes user files.

This fork is **English-only**. The former Chinese translation subsystem, its cache, its model capability, and its UI have been removed. No API keys or hosted model calls are involved.

## Credits and license

Based on [openchamber-skills](https://github.com/chenyuhao0628/openchamber-skills) by [@chenyuhao0628](https://github.com/chenyuhao0628), the original author. This fork is a modified English-only version with expanded skill-source coverage and cross-platform fixes. The original MIT license and copyright notice are retained in [`LICENSE`](LICENSE).

## Highlights

- Toggle `SKILL.md` <-> `SKILL.md.disabled` and flat `<id>.md` <-> `<id>.md.disabled`.
- Detect global and project skills, show their scope, source, and directory path, and toggle them independently.
- Detect entry conflicts, duplicate IDs within a source, unreadable files, empty entries, malformed frontmatter, manual-only entries, and missing descriptions.
- Search by name, description, warning, scope, or ID; press `/` to focus the search field and `Esc` to clear a pending action.
- Filter by state (All, Enabled, Disabled, Needs attention) and source (All, Global, Project). Sort by default order, estimated tokens, name, or attention level.
- Use **List actions** to copy the qualified IDs of the current view or invert the visible enabled/disabled skills. Ambiguous entries are skipped.
- Create and edit reusable groups with a member filter, step ordering, and safe example-group import. Group actions can enable, disable, or isolate a group.
- Review a live summary of visible skills, disabled skills, conflicts, warnings, estimated tokens, the detected source directories, and the last scan time.
- Runs as a loopback-only local service with Bearer-token checks. The service runs with the user's full permissions; the manifest declares no external network integration, executables, or sockets.

## Install

In OpenChamber, open **Settings → Extensions → Add extension → URL** and paste:

```text
https://github.com/Scarpy19/openchamber-skills
```

Requires OpenChamber **2.7.0 or newer** (the extension uses SDK 2.7.2 for its native UI controls). No `model` capability is requested.

For local development, run `npm ci && npm run build`, then choose **Add extension → Folder** and select this directory. Allow the local service when prompted. Development requires Node.js **22.6.0 or newer**.

> Enable all skills before disabling or uninstalling the extension. Disabling the extension stops the service; it does not restore skill files.

## How toggling works

- Disable: `SKILL.md` becomes `SKILL.md.disabled`; a flat `<id>.md` becomes `<id>.md.disabled`.
- Enable: rename the file back.

The service scans the same file-skill locations OpenCode discovers, including project directories supplied by the active OpenChamber panel. After a rename, the skill disappears from the model's available list and from the `skill` tool on the next scan. Skill bodies already loaded in the current session are not withdrawn; start a new session for a clean state.

### Qualified IDs

The same skill ID can exist globally and in a project. Each entry therefore has a stable qualified ID:

| Qualified ID | Meaning |
| --- | --- |
| `opencode-global:alpha` | `~/.config/opencode/skills/alpha` |
| `claude-global:alpha` | `~/.claude/skills/alpha` |
| `agents-global:alpha` | `~/.agents/skills/alpha` |
| `opencode-project:alpha` | `<project>/.opencode/skills/alpha` |
| `claude-project:alpha` | `<project>/.claude/skills/alpha` |
| `agents-project:alpha` | `<project>/.agents/skills/alpha` |

The panel shows the short ID plus a **Global** or **Project** badge, and the source label on each row. Copy actions and group memberships use qualified IDs so global and project copies never become ambiguous. The service also accepts a bare ID when only one source has that ID; otherwise it reports an ambiguity error.

## Panel guide

### Summary and toolbar

The header shows how many skills the model can see, the total, and the approximate token cost per step. The secondary line reports disabled skills, project skills when a project is open, conflicts, warnings, directory errors, and the last scan time.

The **Detected skill sources** section lists every scanned directory with its scope, availability, and full path. It is collapsed by default; an unreadable directory is also reported in the conflict check.

Use the toolbar to:

- Search the current list.
- Filter by state or source.
- Sort by default order, tokens (high to low), name (A–Z), or needs-attention first.
- Open **List actions** to:
  - **Copy visible IDs** to the clipboard as qualified IDs, one per line.
  - **Invert visible skills**, with an in-place confirmation showing how many entries will be enabled and disabled.

### Groups

Groups are panel metadata, not skills, so they do not add model context. Fresh installs start with no groups. Click **Edit groups** to create, rename, reorder, or delete groups, or to import the six bundled examples. Existing group names and IDs are never overwritten by an import.

| Example group | Members |
| --- | --- |
| macOS UI | appkit-interop, swiftui-patterns, window-management, liquid-glass, view-refactor |
| macOS Build | build-run-debug, test-triage, swiftpm-macos, signing-entitlements, packaging-notarization, telemetry |
| Reverse Engineering | reverse-engineering-unpacking, kuna-decompiler, reverse-engineer-anything |
| Cloudflare | cloudflare, workers-best-practices, wrangler |
| Video | yichen-jianying-edit |
| Browser | browser-skill |

- Group chips show the number of available members; narrow panels use a native dropdown instead.
- Selecting a group shows only its members with step numbers in the saved order.
- **Enable group** and **Disable group** affect only that group.
- **Enable only this group** also disables file skills outside the group and asks for confirmation.
- Group operations are blocked when the group has conflicts or missing members.

When the host sets `OPENCHAMBER_SERVICE_DATA_DIR`, groups are stored in `<data-dir>/groups.json`; otherwise the legacy `~/.config/openchamber/skills-manager/groups.json` path is used. OpenChamber removes its extension data directory on uninstall, so back up your groups first if you want to keep them. On POSIX systems the file is written with `0600` permissions; on Windows access controls determine the effective permissions. The file supports up to 50 groups, 40-character names, unique names and IDs, and 200 members per group. A malformed or unreadable file is reported without being silently replaced.

### Conflicts

| Condition | Behavior |
| --- | --- |
| `SKILL.md` and `SKILL.md.disabled` in the same directory | Blocking; choose **Keep enabled** or **Keep disabled**. The other file is backed up as `.conflict-<time>-<random>`. |
| Several entries share one ID within one source | Warning; the effective entry is shown and toggling affects all matching entries in that source. |
| Same ID in different sources | Not a conflict; shown as separate global/project entries with qualified IDs. |
| Unclosed frontmatter or empty entry | Warning; the entry switch still works, but OpenCode may skip the skill. |
| No `description` or `disable: true` in frontmatter | Warning; the model will not select the skill automatically. |
| Entry cannot be read | Warning; the entry switch remains available. |
| Any scanned skill directory cannot be read | Blocking; all write operations are stopped. |

Conflict resolution never deletes user files. Both choices preserve a backup of the unused entry.

## Scope

| Path | Managed? |
| --- | --- |
| `~/.config/opencode/skills` | Yes, global OpenCode |
| `$XDG_CONFIG_HOME/opencode/skills` | Yes, global OpenCode, when the environment variable is an absolute path |
| `~/.claude/skills` | Yes, global Claude-compatible |
| `~/.agents/skills` | Yes, global agent-compatible |
| `<project>/.opencode/skills` | Yes, project OpenCode, when the host panel supplies a project directory |
| `<project>/.claude/skills` | Yes, project Claude-compatible |
| `<project>/.agents/skills` | Yes, project agent-compatible |
| Custom `skills` paths in `opencode.json` | No; OpenChamber does not expose them to extensions |
| Built-in skills, remote catalogs, MCP tools | No |

The built-in `opencode` and `report` skills are not file entries and cannot be disabled by renaming.

## Windows and Linux compatibility

- All filesystem paths are composed with `node:path`; there are no hard-coded `/` separators in runtime path construction.
- Project directories come from the host panel context and are validated as absolute paths before use.
- The service honors `XDG_CONFIG_HOME` when it is present in its environment; OpenChamber may not forward it to services, in which case the user profile's `.config` directory is used.
- Windows `EPERM`/`EBUSY` locked-file errors are reported with an actionable message, and failed renames are rolled back.
- Frontmatter reading tolerates UTF-8 byte-order marks, CRLF line endings, quoted `#` characters, and unquoted comments.
- Tests avoid POSIX-only assumptions: permission-mode assertions run only on non-Windows platforms, and the test glob is quoted for cross-shell use.
- The service binds only to `127.0.0.1` and requires both a host-assigned port and Bearer token on every platform.

## Limitations

- There is no background watcher. Rescan after skills change or reopen the panel.
- Skill bodies already loaded in the current session remain available until a new session starts.
- There is no cross-process file lock. The service serializes its own reads and writes, but another editor can still race with it; the next scan reports the resulting conflict.
- The service runs with the current user's permissions and only listens on the loopback port assigned by the host.
- The extension does not manage translations. No translation cache or model request is created.

## Privacy and data

- Only skill entry filenames are changed. Frontmatter is read to display names and descriptions; skill bodies are not returned or logged.
- Group settings are written atomically with restrictive permissions.
- A disabled skill is represented by its `.disabled` file; conflict backups use `.conflict-*`. Nothing is deleted automatically.
- Tests and the preview use temporary directories or synthetic data; no real skill content is embedded.

## Development

```sh
npm ci
npm run typecheck
npm test
npm run build
npm run preview
```

`npm test` builds the bundles first. `npm run preview` serves the built panel with synthetic data on `127.0.0.1`; it never reads real skills.

The extension follows the [OpenChamber SDK documentation](https://docs.openchamber.dev/sdk/), including the [Host API](https://docs.openchamber.dev/sdk/host/). See `GUEST_SERVICES.md` in the installed SDK for the service process contract.

| Path | Responsibility |
| --- | --- |
| `src/core/skills.ts` | Scanning, frontmatter, conflicts, rename transactions, bulk toggles |
| `src/core/sources.ts` | Global/project source resolution, `XDG_CONFIG_HOME`, project-directory validation |
| `src/core/groups.ts` | Atomic group configuration storage and data-directory override |
| `src/service/main.ts` | Loopback HTTP service, Bearer checks, routing, serialized writes |
| `src/panel/main.ts` | Panel UI, source detection display, filters, sorting, list actions, groups, conflict prompts |
| `src/shared/filter.ts` | Search, state/source filters, sorting, invert planning |
| `src/shared/groups.ts` | Example groups, merge rules, types, validation |
| `src/shared/types.ts` | Shared panel/service data contract |
| `src/panel/style.css` | Panel-specific styles |
| `ui/native.css` | Host base styles inlined at build time |
| `scripts/preview.*` | Synthetic preview harness |
| `tests/` | Core, filter, group, storage, and service tests |
