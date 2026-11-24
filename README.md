# Skills Manager for OpenChamber

Skills Manager enables or disables OpenCode file skills by renaming their entry files. It never rewrites skill bodies, never creates skills, and never deletes user files.

This fork is **English-only**. The former Chinese translation subsystem, its cache, its model capability, and its UI have been removed. No API keys or hosted model calls are involved.

[Install in OpenChamber](openchamber://extensions/install?url=https%3A%2F%2Fgithub.com%2FScarpy19%2Fopenchamber-skills)

## Credits and license

Based on [openchamber-skills](https://github.com/chenyuhao0628/openchamber-skills) by [@chenyuhao0628](https://github.com/chenyuhao0628), the original author. This fork is a modified English-only version with expanded skill-source coverage and cross-platform fixes. The original MIT license and copyright notice are retained in [`LICENSE`](LICENSE).

## Highlights

- Toggle `SKILL.md` <-> `SKILL.md.disabled` and flat `<id>.md` <-> `<id>.md.disabled`.
- Detect global and project skills, show their scope, source, and directory path, and toggle them independently.
- Detect entry conflicts, duplicate IDs within a source, unreadable files, empty entries, malformed frontmatter, manual-only entries, and missing descriptions.
- Search by name, description, warning, scope, or ID; press `/` to focus the search field and `Esc` to clear a pending action.
- Filter by state (All, Enabled, Disabled, Needs attention) and source (All, Global, Project). Sort by default order, estimated tokens, name, or attention level.
- Use **List actions** to copy the qualified IDs of the current view or invert the visible enabled/disabled skills. Ambiguous entries are skipped.
- Preview the files affected by bulk actions and undo the last bulk action while the service is running, provided those files have not changed.
- Review a live summary of visible skills, disabled skills, conflicts, warnings, estimated tokens, the detected source directories, and the last scan time.
- Runs as a loopback-only local service with Bearer-token checks. The service runs with the user's full permissions; the manifest declares no external network integration, executables, or sockets.

## Install

In OpenChamber, open **Settings → Extensions → Add extension → URL** and paste:

```text
https://github.com/Scarpy19/openchamber-skills
```

Requires OpenChamber **2.7.0 or newer** (the extension uses SDK 2.7.2 for its native UI controls). No `model` capability is requested.

The extension uses a local service and asks for your approval. The service runs with your user account's filesystem permissions so it can read and rename skill files. It does not request a model, account, or external network integration.

This fork keeps the original extension's `skills-manager` panel ID. If the original is already installed, remove it before installing this fork; OpenChamber requires extension IDs to be unique. Enable any disabled skills before removing either extension.

For local development, run `npm ci && npm run build`, then choose **Add extension → Folder** and select this directory. Allow the local service when prompted. Development requires Node.js **22.6.0 or newer**.

> Enable all skills before disabling or uninstalling the extension. Disabling the extension stops the service; it does not restore skill files.

## How toggling works

- Disable: `SKILL.md` becomes `SKILL.md.disabled`; a flat `<id>.md` becomes `<id>.md.disabled`.
- Enable: rename the file back.

The service scans the locations listed in [Scope](#scope), including the project directory supplied by the active OpenChamber panel. A disabled entry is not discoverable from that file. If another enabled copy of the same skill exists, OpenCode may still discover that copy. Skill bodies already loaded in the current session are not withdrawn; start a new session for a clean state.

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

The panel shows the short ID plus a **Global** or **Project** badge, and the source label on each row. Copy actions use qualified IDs so global and project copies never become ambiguous. The service also accepts a bare ID when only one source has that ID; otherwise it reports an ambiguity error.

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

### Conflicts

| Condition | Behavior |
| --- | --- |
| `SKILL.md` and `SKILL.md.disabled` in the same directory | Blocking; choose **Keep enabled** or **Keep disabled**. The other file is backed up as `.conflict-<time>-<random>`. |
| Several entries share one ID within one source | Warning; the panel shows an entry for display and toggling affects all matching entries in that source. |
| Same ID in different sources | Shown separately with a warning. The panel identifies the highest-precedence scanned entry when possible; disabling one does not disable the others. |
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
| `<project>/.opencode/skills` | Yes, including ancestors through the detected Git root |
| `<project>/.claude/skills` | Yes, including ancestors through the detected Git root |
| `<project>/.agents/skills` | Yes, including ancestors through the detected Git root |
| Local `skills` paths in standard `opencode.json` / `opencode.jsonc` files | Yes, for the scanned global and project/ancestor configuration files |
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
- Duplicate precedence applies only to scanned sources. Built-in skills, other configuration sources, remote catalogs, OpenCode version differences and agent permissions can change the effective result.
- Ancestor discovery stops at the nearest `.git` file or directory. If no Git root is detected, only the current project directory is scanned. Local paths from standard global and scanned project config files are included; remote catalogs and other config locations are not.
- Windows has not yet been verified on a Windows machine; the code and automated tests are designed to be portable.
- Skill bodies already loaded in the current session remain available until a new session starts.
- There is no cross-process file lock. The service serializes its own reads and writes, but another editor can still race with it; the next scan reports the resulting conflict.
- Undo applies only to the most recent bulk or invert action in this service process; a later modification or service restart clears it. Undo checks content, metadata and destination paths but cannot prevent a concurrent external process from racing with a rename.
- The service runs with the current user's permissions and only listens on the loopback port assigned by the host.
- The extension does not manage translations. No translation cache or model request is created.

## Privacy and data

- Only skill entry filenames are changed. Frontmatter is read to display names and descriptions; skill bodies are not returned or logged.
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
| `src/service/main.ts` | Loopback HTTP service, Bearer checks, routing, serialized writes |
| `src/panel/main.ts` | Panel UI, source detection display, filters, sorting, list actions, conflict prompts |
| `src/shared/filter.ts` | Search, state/source filters, sorting, invert planning |
| `src/shared/types.ts` | Shared panel/service data contract |
| `src/panel/style.css` | Panel-specific styles |
| `ui/native.css` | Host base styles inlined at build time |
| `scripts/preview.*` | Synthetic preview harness |
| `tests/` | Core, filter, and service tests |
