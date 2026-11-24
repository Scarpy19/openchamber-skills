// src/service/main.ts
import http from "node:http";
import os from "node:os";

// src/core/skills.ts
import fs from "node:fs/promises";
import path2 from "node:path";
import { randomUUID } from "node:crypto";

// src/core/sources.ts
import path from "node:path";
var configHome = (home) => {
  const override = process.env.XDG_CONFIG_HOME;
  return override && path.isAbsolute(override) ? override : path.join(home, ".config");
};
var normalizeProjectDirectory = (value) => {
  if (typeof value !== "string") return null;
  const text = value.trim();
  if (!text || text.length > 4096 || !path.isAbsolute(text)) return null;
  return path.resolve(text);
};
var resolveSources = ({ home, projectDirectory }) => {
  const config = configHome(home);
  const global = [
    { id: "opencode-global", scope: "global", label: "Global OpenCode", path: path.join(config, "opencode", "skills"), priority: 30 },
    { id: "claude-global", scope: "global", label: "Global Claude-compatible", path: path.join(home, ".claude", "skills"), priority: 20 },
    { id: "agents-global", scope: "global", label: "Global agent-compatible", path: path.join(home, ".agents", "skills"), priority: 10 }
  ];
  if (!projectDirectory) return global;
  return [
    ...global,
    { id: "opencode-project", scope: "project", label: "Project OpenCode", path: path.join(projectDirectory, ".opencode", "skills"), priority: 60 },
    { id: "claude-project", scope: "project", label: "Project Claude-compatible", path: path.join(projectDirectory, ".claude", "skills"), priority: 50 },
    { id: "agents-project", scope: "project", label: "Project agent-compatible", path: path.join(projectDirectory, ".agents", "skills"), priority: 40 }
  ];
};
var scanConfig = (value) => typeof value === "string" ? { home: value } : value;

// src/core/skills.ts
var MAX_DEPTH = 6;
var MAX_SKILL_BYTES = 2e6;
var IGNORED_DIRS = /* @__PURE__ */ new Set(["node_modules", ".git", ".svn", ".hg"]);
var CONFLICT_ORDER = {
  both: 0,
  "read-error": 1,
  duplicate: 2,
  invalid: 3,
  empty: 4,
  manual: 5,
  "no-description": 6
};
var SkillsError = class extends Error {
  code;
  status;
  conflicts;
  constructor(code, status, message, conflicts) {
    super(message);
    this.name = "SkillsError";
    this.code = code;
    this.status = status;
    this.conflicts = conflicts;
  }
};
var describeFs = (error) => {
  const code = error.code;
  if (code === "EBUSY" || code === "EPERM") {
    return "The file is locked or permission was denied. Close it in other applications and rescan.";
  }
  if (code === "EACCES") return "Permission denied";
  if (code === "ENOENT") return "Path does not exist";
  if (code === "ENOTDIR") return "Not a directory";
  if (code === "EISDIR") return "Is a directory";
  return error instanceof Error ? error.message : "File system error";
};
var parseBoolean = (value) => {
  const text = value.trim().toLowerCase();
  if (["true", "yes", "on", "1"].includes(text)) return true;
  if (["false", "no", "off", "0"].includes(text)) return false;
  return void 0;
};
var unquote = (value) => {
  const text = value.trim();
  if (text.length >= 2 && text.startsWith('"') && text.endsWith('"')) {
    return text.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\\\/g, "\\");
  }
  if (text.length >= 2 && text.startsWith("'") && text.endsWith("'")) {
    return text.slice(1, -1).replace(/''/g, "'");
  }
  return text;
};
var stripComment = (value) => {
  let quote = null;
  for (let index = 0; index < value.length; index += 1) {
    const char = value[index] ?? "";
    if (quote) {
      if (char === quote && value[index - 1] !== "\\") quote = null;
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === "#" && (index === 0 || /\s/.test(value[index - 1] ?? ""))) {
      return value.slice(0, index).trimEnd();
    }
  }
  return value;
};
var fallbackFrontmatter = (id) => ({
  name: id,
  description: "",
  autoInvokeOff: false,
  hasFrontmatter: false,
  valid: true,
  empty: false
});
var parseFrontmatter = (text, id) => {
  const withoutBom = text.replace(/^\uFEFF/, "");
  if (withoutBom.trim().length === 0) {
    return { ...fallbackFrontmatter(id), empty: true };
  }
  const lines = withoutBom.split(/\r?\n/);
  if (lines[0]?.trim() !== "---") return fallbackFrontmatter(id);
  let end = -1;
  for (let index = 1; index < lines.length; index += 1) {
    const value = lines[index]?.trim();
    if (value === "---" || value === "...") {
      end = index;
      break;
    }
  }
  if (end < 0) {
    return { ...fallbackFrontmatter(id), hasFrontmatter: true, valid: false };
  }
  const block = lines.slice(1, end);
  let name = "";
  let description = "";
  let disable;
  let metaAutoInvoke;
  for (let index = 0; index < block.length; index += 1) {
    const line = block[index] ?? "";
    if (line.trim().length === 0 || /^\s/.test(line)) continue;
    const match = /^([^:]+):\s*(.*)$/.exec(line);
    if (!match) continue;
    const key = (match[1] ?? "").trim().replace(/^["']|["']$/g, "");
    const raw = stripComment((match[2] ?? "").trim());
    if (key === "name" || key === "description") {
      let value = raw;
      if (/^[>|][+-]?$/.test(value)) {
        const folded = value.startsWith(">");
        const collected = [];
        let cursor = index + 1;
        while (cursor < block.length) {
          const next = block[cursor] ?? "";
          if (next.trim().length > 0 && !/^\s/.test(next)) break;
          collected.push(next);
          cursor += 1;
        }
        const indents = collected.filter((item) => item.trim().length > 0).map((item) => item.match(/^\s*/)?.[0].length ?? 0);
        const base = indents.length > 0 ? Math.min(...indents) : 0;
        value = collected.map((item) => item.slice(Math.min(base, item.length))).join(folded ? " " : "\n").trim();
        index = cursor - 1;
      } else {
        value = unquote(value);
      }
      if (key === "name") name = value.trim();
      else description = value.trim();
      continue;
    }
    if (key === "disable-model-invocation") {
      disable = parseBoolean(unquote(raw));
      continue;
    }
    if (key === "metadata") {
      if (raw.startsWith("{")) {
        const inline = /["']?opencode\/autoinvoke["']?\s*:\s*(true|false|yes|no|on|off|1|0)/i.exec(raw);
        if (inline) metaAutoInvoke = parseBoolean(inline[1] ?? "");
        continue;
      }
      let cursor = index + 1;
      while (cursor < block.length) {
        const next = block[cursor] ?? "";
        if (next.trim().length > 0 && !/^\s/.test(next)) break;
        const nested = /^\s+["']?opencode\/autoinvoke["']?\s*:\s*(.*)$/.exec(next);
        if (nested) metaAutoInvoke = parseBoolean(unquote(nested[1] ?? ""));
        cursor += 1;
      }
      index = cursor - 1;
    }
  }
  return {
    name: name.trim() || id,
    description: description.trim(),
    autoInvokeOff: metaAutoInvoke !== void 0 ? !metaAutoInvoke : disable === true,
    hasFrontmatter: true,
    valid: true,
    empty: false
  };
};
var rootView = async (source) => {
  try {
    const info = await fs.stat(source.path);
    return {
      sourceId: source.id,
      scope: source.scope,
      label: source.label,
      path: source.path,
      exists: info.isDirectory(),
      error: info.isDirectory() ? null : "Not a directory"
    };
  } catch (error) {
    const code = error.code;
    return {
      sourceId: source.id,
      scope: source.scope,
      label: source.label,
      path: source.path,
      exists: false,
      error: code === "ENOENT" ? null : describeFs(error)
    };
  }
};
var classify = async (directory, entry) => {
  if (entry.isFile()) return "file";
  if (entry.isDirectory()) return "dir";
  if (!entry.isSymbolicLink()) return "other";
  try {
    const info = await fs.stat(path2.join(directory, entry.name));
    return info.isFile() ? "file" : info.isDirectory() ? "dir" : "other";
  } catch {
    return "other";
  }
};
var readFrontmatterFor = async (id, activePath, disabledPath) => {
  let activeError = null;
  if (activePath) {
    try {
      const info = await fs.stat(activePath);
      if (info.size > MAX_SKILL_BYTES) activeError = "The entry file exceeds 2 MB";
      else {
        const text = await fs.readFile(activePath, "utf8");
        return { frontmatter: parseFrontmatter(text, id), error: null };
      }
    } catch (error) {
      activeError = describeFs(error);
    }
  }
  if (disabledPath) {
    try {
      const info = await fs.stat(disabledPath);
      if (info.size > MAX_SKILL_BYTES) {
        return { frontmatter: fallbackFrontmatter(id), error: activeError ?? "The disabled entry exceeds 2 MB" };
      }
      const text = await fs.readFile(disabledPath, "utf8");
      return { frontmatter: parseFrontmatter(text, id), error: activeError };
    } catch (error) {
      return { frontmatter: fallbackFrontmatter(id), error: activeError ?? describeFs(error) };
    }
  }
  return { frontmatter: fallbackFrontmatter(id), error: activeError ?? "Could not read the entry file" };
};
var scanDirectory = async (root, source, directory, depth, entries, visited) => {
  let dirents;
  try {
    dirents = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (!root.error) root.error = `Could not read ${directory}: ${describeFs(error)}`;
    return;
  }
  const visible = dirents.filter((entry) => !entry.name.startsWith(".") && !IGNORED_DIRS.has(entry.name));
  const classified = await Promise.all(visible.map(async (entry) => ({ entry, kind: await classify(directory, entry) })));
  const active = classified.find((item) => item.kind === "file" && item.entry.name === "SKILL.md");
  const disabled = classified.find((item) => item.kind === "file" && item.entry.name === "SKILL.md.disabled");
  if (active || disabled) {
    const id = path2.basename(directory);
    const activePath = active ? path2.join(directory, "SKILL.md") : null;
    const disabledPath = disabled ? path2.join(directory, "SKILL.md.disabled") : null;
    const { frontmatter, error } = await readFrontmatterFor(id, activePath, disabledPath);
    entries.push({ id, source, activePath, disabledPath, frontmatter, error });
    if (active) return;
  }
  if (depth === 0) {
    const flat = classified.filter(
      (item) => item.kind === "file" && item.entry.name !== "SKILL.md.disabled" && (item.entry.name.endsWith(".md") || item.entry.name.endsWith(".md.disabled"))
    );
    const ids = /* @__PURE__ */ new Set();
    for (const item of flat) {
      ids.add(item.entry.name.endsWith(".md.disabled") ? item.entry.name.slice(0, -".md.disabled".length) : item.entry.name.slice(0, -".md".length));
    }
    for (const id of ids) {
      const activeItem = flat.find((item) => item.entry.name === `${id}.md`);
      const disabledItem = flat.find((item) => item.entry.name === `${id}.md.disabled`);
      const activePath = activeItem ? path2.join(directory, activeItem.entry.name) : null;
      const disabledPath = disabledItem ? path2.join(directory, disabledItem.entry.name) : null;
      if (!activePath && !disabledPath) continue;
      const { frontmatter, error } = await readFrontmatterFor(id, activePath, disabledPath);
      entries.push({ id, source, activePath, disabledPath, frontmatter, error });
    }
  }
  if (depth >= MAX_DEPTH) return;
  for (const item of classified) {
    if (item.kind !== "dir") continue;
    const child = path2.join(directory, item.entry.name);
    let real = child;
    try {
      real = await fs.realpath(child);
    } catch {
    }
    if (visited.has(real)) continue;
    visited.add(real);
    await scanDirectory(root, source, child, depth + 1, entries, visited);
  }
};
var addConflict = (conflicts, seen, conflict) => {
  const key = [conflict.kind, conflict.skillId, conflict.activePath ?? "", conflict.disabledPath ?? "", conflict.message].join("|");
  if (seen.has(key)) return;
  seen.add(key);
  conflicts.push(conflict);
};
var estimateTokens = (name, id, description) => Math.max(1, Math.ceil((name.length + id.length + description.length) / 4) + 8);
var compareText = (left, right) => left < right ? -1 : left > right ? 1 : 0;
var buildResponse = (roots, entries, projectDirectory) => {
  const groups = /* @__PURE__ */ new Map();
  for (const entry of entries) {
    const key = `${entry.source.id}:${entry.id}`;
    const group = groups.get(key);
    if (group) group.push(entry);
    else groups.set(key, [entry]);
  }
  const skills = [];
  for (const [key, group] of groups) {
    const id = group[0]?.id ?? key;
    const source = group[0]?.source;
    group.sort(
      (left, right) => right.source.priority - left.source.priority || compareText(left.activePath ?? left.disabledPath ?? "", right.activePath ?? right.disabledPath ?? "")
    );
    const active = group.filter((entry) => entry.activePath);
    const disabled = group.filter((entry) => entry.disabledPath);
    const loadable = active.filter((entry) => !entry.error && entry.frontmatter.valid && !entry.frontmatter.empty);
    const winner = loadable.at(-1) ?? active.at(-1) ?? group[0] ?? null;
    const both = group.some((entry) => entry.activePath && entry.disabledPath);
    const state = both ? "conflict" : active.length > 0 && disabled.length > 0 ? "mixed" : active.length > 0 ? "enabled" : "disabled";
    const conflicts2 = [];
    const seen = /* @__PURE__ */ new Set();
    for (const entry of group) {
      if (entry.activePath && entry.disabledPath) {
        addConflict(conflicts2, seen, {
          kind: "both",
          skillId: key,
          message: "Both an enabled and a disabled entry exist in the same directory. Choose which one to keep first.",
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: true
        });
      }
      if (entry.error) {
        addConflict(conflicts2, seen, {
          kind: "read-error",
          skillId: key,
          message: `Could not read the entry: ${entry.error}`,
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: false
        });
      }
      if (!entry.frontmatter.valid) {
        addConflict(conflicts2, seen, {
          kind: "invalid",
          skillId: key,
          message: "The frontmatter is not closed; OpenCode may skip this skill, but the entry switch still works.",
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: false
        });
      }
      if (entry.frontmatter.empty) {
        addConflict(conflicts2, seen, {
          kind: "empty",
          skillId: key,
          message: "The entry file is empty; OpenCode will not load it.",
          activePath: entry.activePath,
          disabledPath: entry.disabledPath,
          blocking: false
        });
      }
    }
    if (group.length > 1) {
      const winnerLabel = winner ? winner.activePath ?? winner.disabledPath ?? "Unknown entry" : "None (entry cannot be loaded)";
      addConflict(conflicts2, seen, {
        kind: "duplicate",
        skillId: key,
        message: `There are ${group.length} entries with this ID; the effective entry is ${winnerLabel}.`,
        activePath: winner?.activePath ?? null,
        disabledPath: winner?.disabledPath ?? null,
        blocking: false
      });
    }
    if (winner?.activePath && winner.frontmatter.autoInvokeOff) {
      addConflict(conflicts2, seen, {
        kind: "manual",
        skillId: key,
        message: "The entry is enabled but marked for manual invocation only; the model cannot see it.",
        activePath: winner.activePath,
        disabledPath: winner.disabledPath,
        blocking: false
      });
    }
    if (winner?.activePath && !winner.error && winner.frontmatter.valid && !winner.frontmatter.empty && !winner.frontmatter.description.trim()) {
      addConflict(conflicts2, seen, {
        kind: "no-description",
        skillId: key,
        message: "The entry is enabled but has no description; the model will not select it automatically.",
        activePath: winner.activePath,
        disabledPath: winner.disabledPath,
        blocking: false
      });
    }
    const advertised = Boolean(
      winner && winner.activePath && !winner.error && winner.frontmatter.valid && !winner.frontmatter.empty && winner.frontmatter.description.trim().length > 0 && !winner.frontmatter.autoInvokeOff
    );
    const name = winner?.frontmatter.name || id;
    const description = winner?.frontmatter.description ?? "";
    skills.push({
      key,
      id,
      scope: source?.scope ?? "global",
      sourceId: source?.id ?? "opencode-global",
      rootPath: source?.path ?? "",
      name,
      description,
      state,
      advertised,
      autoInvokeOff: winner?.frontmatter.autoInvokeOff ?? false,
      activePaths: active.flatMap((entry) => entry.activePath ? [entry.activePath] : []),
      disabledPaths: disabled.flatMap((entry) => entry.disabledPath ? [entry.disabledPath] : []),
      conflicts: conflicts2,
      warnings: Array.from(new Set(conflicts2.filter((conflict) => !conflict.blocking).map((conflict) => conflict.message))),
      estimatedTokens: advertised ? estimateTokens(name, id, description) : 0
    });
  }
  skills.sort((left, right) => compareText(left.key, right.key));
  const conflicts = skills.flatMap((skill) => skill.conflicts);
  conflicts.sort((left, right) => {
    if (left.blocking !== right.blocking) return left.blocking ? -1 : 1;
    const kind = CONFLICT_ORDER[left.kind] - CONFLICT_ORDER[right.kind];
    return kind !== 0 ? kind : compareText(left.skillId, right.skillId);
  });
  const summary = {
    total: skills.length,
    advertised: skills.filter((skill) => skill.advertised).length,
    disabled: skills.filter((skill) => skill.state === "disabled").length,
    blockingConflicts: conflicts.filter((conflict) => conflict.blocking).length,
    warnings: conflicts.filter((conflict) => !conflict.blocking).length,
    estimatedTokens: skills.reduce((sum, skill) => sum + skill.estimatedTokens, 0)
  };
  return {
    skills,
    conflicts,
    summary,
    root: roots[0] ?? {
      sourceId: "opencode-global",
      scope: "global",
      label: "Global OpenCode",
      path: "",
      exists: false,
      error: null
    },
    roots,
    projectDirectory,
    scannedAt: Date.now()
  };
};
var scanSkills = async (value) => {
  const config = scanConfig(value);
  const sources = resolveSources(config);
  const roots = await Promise.all(sources.map((source) => rootView(source)));
  const entries = [];
  for (const [index, root] of roots.entries()) {
    const source = sources[index];
    if (!root.exists || !source) continue;
    const visited = /* @__PURE__ */ new Set();
    try {
      visited.add(await fs.realpath(root.path));
    } catch {
      visited.add(root.path);
    }
    await scanDirectory(root, source, root.path, 0, entries, visited);
  }
  return buildResponse(roots, entries, config.projectDirectory ?? null);
};
var findSkill = (skills, idOrKey) => {
  const exact = skills.find((skill) => skill.key === idOrKey);
  if (exact) return exact;
  const matches = skills.filter((skill) => skill.id === idOrKey);
  if (matches.length === 1 && matches[0]) return matches[0];
  if (matches.length > 1) {
    throw new SkillsError(
      "ambiguous",
      400,
      `Several sources have a skill named "${idOrKey}": ${matches.map((skill) => skill.key).join(", ")}.`
    );
  }
  throw new SkillsError("not-found", 404, `Skill ${idOrKey} was not found.`);
};
var exists = async (file) => {
  try {
    await fs.lstat(file);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
};
var applyMoves = async (moves) => {
  if (moves.length === 0) return;
  try {
    for (const move of moves) {
      if (await exists(move.to)) {
        throw new SkillsError("conflict", 409, `The target entry already exists: ${move.to}`);
      }
      if (!await exists(move.from)) {
        throw new SkillsError("conflict", 409, `The entry changed. Rescan: ${move.from}`);
      }
    }
  } catch (error) {
    if (error instanceof SkillsError) throw error;
    throw new SkillsError("io", 500, `Could not inspect the entry: ${describeFs(error)}`);
  }
  const done = [];
  try {
    for (const move of moves) {
      if (await exists(move.to)) {
        throw new SkillsError("conflict", 409, `The target entry already exists: ${move.to}`);
      }
      await fs.rename(move.from, move.to);
      done.push(move);
      if (await exists(move.from) || !await exists(move.to)) {
        throw new SkillsError("io", 500, `Verification failed after renaming: ${move.to}`);
      }
    }
  } catch (error) {
    for (const move of done.reverse()) {
      try {
        if (await exists(move.to) && !await exists(move.from)) await fs.rename(move.to, move.from);
      } catch {
      }
    }
    if (error instanceof SkillsError) throw error;
    throw new SkillsError("io", 500, `Rename failed: ${describeFs(error)}`);
  }
};
var assertRootReadable = (scan) => {
  const broken = scan.roots.find((root) => root.error);
  if (broken) {
    throw new SkillsError("read-error", 409, `Could not read the ${broken.label} skill directory: ${broken.error}`);
  }
};
var setSkillEnabled = async (value, id, enabled) => {
  const config = scanConfig(value);
  const before = await scanSkills(config);
  assertRootReadable(before);
  const skill = findSkill(before.skills, id);
  if (skill.conflicts.some((conflict) => conflict.kind === "both")) {
    throw new SkillsError("conflict", 409, `Skill ${id} has unresolved entry conflicts.`, skill.conflicts);
  }
  const moves = [];
  if (!enabled) {
    for (const activePath of skill.activePaths) {
      moves.push({ id, from: activePath, to: `${activePath}.disabled` });
    }
  } else {
    for (const disabledPath of skill.disabledPaths) {
      if (!disabledPath.endsWith(".disabled")) {
        throw new SkillsError("io", 500, `Could not identify the disabled entry: ${disabledPath}`);
      }
      moves.push({ id, from: disabledPath, to: disabledPath.slice(0, -".disabled".length) });
    }
  }
  if (moves.length > 0) await applyMoves(moves);
  return scanSkills(config);
};
var batchSetEnabled = async (value, enable, disable) => {
  const config = scanConfig(value);
  const before = await scanSkills(config);
  assertRootReadable(before);
  const enableIds = Array.from(new Set(enable));
  const disableIds = Array.from(new Set(disable));
  if (enableIds.some((id) => disableIds.includes(id))) {
    throw new SkillsError("invalid-request", 400, "A skill cannot be enabled and disabled at the same time.");
  }
  if (enableIds.length + disableIds.length > 200) {
    throw new SkillsError("invalid-request", 400, "Too many skills in one operation.");
  }
  const selected = /* @__PURE__ */ new Map();
  for (const id of [...enableIds, ...disableIds]) {
    const skill = findSkill(before.skills, id);
    if (skill.conflicts.some((conflict) => conflict.kind === "both")) {
      throw new SkillsError("conflict", 409, `Skill ${id} has unresolved entry conflicts.`, skill.conflicts);
    }
    selected.set(id, skill);
  }
  const moves = [];
  for (const id of enableIds) {
    const skill = selected.get(id);
    if (!skill) continue;
    for (const disabledPath of skill.disabledPaths) {
      if (!disabledPath.endsWith(".disabled")) continue;
      moves.push({ id, from: disabledPath, to: disabledPath.slice(0, -".disabled".length) });
    }
  }
  for (const id of disableIds) {
    const skill = selected.get(id);
    if (!skill) continue;
    for (const activePath of skill.activePaths) {
      moves.push({ id, from: activePath, to: `${activePath}.disabled` });
    }
  }
  if (moves.length > 0) await applyMoves(moves);
  const after = await scanSkills(config);
  return { ...after, changed: Array.from(new Set(moves.map((move) => move.id))) };
};
var bulkSetEnabled = async (value, enabled) => {
  const config = scanConfig(value);
  const before = await scanSkills(config);
  assertRootReadable(before);
  const blocking = before.conflicts.filter((conflict) => conflict.kind === "both");
  if (blocking.length > 0) {
    throw new SkillsError("conflict", 409, "Unresolved entry conflicts remain; bulk operations are blocked.", blocking);
  }
  const moves = [];
  for (const skill of before.skills) {
    if (!enabled) {
      for (const activePath of skill.activePaths) {
        moves.push({ id: skill.key, from: activePath, to: `${activePath}.disabled` });
      }
    } else {
      for (const disabledPath of skill.disabledPaths) {
        if (!disabledPath.endsWith(".disabled")) continue;
        moves.push({ id: skill.key, from: disabledPath, to: disabledPath.slice(0, -".disabled".length) });
      }
    }
  }
  if (moves.length > 0) await applyMoves(moves);
  const after = await scanSkills(config);
  return { ...after, changed: Array.from(new Set(moves.map((move) => move.id))) };
};
var resolveBoth = async (value, entryPath, keep) => {
  const config = scanConfig(value);
  const before = await scanSkills(config);
  assertRootReadable(before);
  const skill = before.skills.find(
    (item) => item.activePaths.includes(entryPath) || item.disabledPaths.includes(entryPath)
  );
  if (!skill) throw new SkillsError("not-found", 404, "This entry conflict was not found. Rescan.");
  let activePath = null;
  let disabledPath = null;
  if (skill.activePaths.includes(entryPath)) {
    activePath = entryPath;
    disabledPath = `${entryPath}.disabled`;
  } else if (skill.disabledPaths.includes(entryPath)) {
    disabledPath = entryPath;
    activePath = entryPath.endsWith(".disabled") ? entryPath.slice(0, -".disabled".length) : null;
  }
  if (!activePath || !disabledPath || !skill.activePaths.includes(activePath) || !skill.disabledPaths.includes(disabledPath)) {
    throw new SkillsError("not-found", 404, "This entry conflict was not found. Rescan.");
  }
  const backupPath = `${disabledPath}.conflict-${Date.now()}-${randomUUID().slice(0, 8)}`;
  if (keep === "enabled") {
    await applyMoves([{ id: skill.key, from: disabledPath, to: backupPath }]);
  } else {
    await applyMoves([{ id: skill.key, from: disabledPath, to: backupPath }]);
    try {
      await applyMoves([{ id: skill.key, from: activePath, to: disabledPath }]);
    } catch (error) {
      try {
        await applyMoves([{ id: skill.key, from: backupPath, to: disabledPath }]);
      } catch {
      }
      throw error;
    }
  }
  const after = await scanSkills(config);
  return { ...after, backupPath };
};

// src/service/main.ts
var port = Number(process.env.OPENCHAMBER_SERVICE_PORT);
var token = process.env.OPENCHAMBER_SERVICE_TOKEN ?? "";
if (!port || !token) {
  console.error("OPENCHAMBER_SERVICE_PORT and OPENCHAMBER_SERVICE_TOKEN are required");
  process.exit(1);
}
var HOME = os.homedir();
var json = (res, status, body) => {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(body));
};
var readBody = (req) => new Promise((resolve, reject) => {
  const chunks = [];
  let size = 0;
  let failed = false;
  req.on("data", (chunk) => {
    if (failed) return;
    size += chunk.length;
    if (size > 256 * 1024) {
      failed = true;
      chunks.length = 0;
      reject(new SkillsError("too-large", 413, "The submitted content is too large."));
      return;
    }
    chunks.push(chunk);
  });
  req.on("error", () => reject(new SkillsError("invalid-request", 400, "The request was interrupted. Try again.")));
  req.on("end", () => {
    if (failed) return;
    try {
      const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("not an object");
      }
      resolve(parsed);
    } catch {
      reject(new SkillsError("invalid-request", 400, "The request body must be a valid JSON object."));
    }
  });
});
var queue = Promise.resolve();
var exclusive = (action) => {
  const next = queue.then(() => action(), () => action());
  queue = next.catch(() => void 0);
  return next;
};
var stringField = (body, key, max) => {
  const value = typeof body[key] === "string" ? body[key].trim() : "";
  if (!value) throw new SkillsError("invalid-request", 400, `Missing ${key}.`);
  if (value.length > max) throw new SkillsError("invalid-request", 400, `${key} exceeds the length limit.`);
  return value;
};
var pathField = (body, key, max) => {
  const value = typeof body[key] === "string" ? body[key] : "";
  if (!value || value.length > max) throw new SkillsError("invalid-request", 400, `Missing ${key}.`);
  return value;
};
var booleanField = (body, key) => {
  const value = body[key];
  if (typeof value !== "boolean") throw new SkillsError("invalid-request", 400, `${key} must be a boolean.`);
  return value;
};
var stringArrayField = (body, key) => {
  const value = body[key];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || item.length === 0 || item.length > 256)) {
    throw new SkillsError("invalid-request", 400, `${key} must be an array of skill IDs.`);
  }
  if (value.length > 200) throw new SkillsError("invalid-request", 400, `Too many ${key} entries.`);
  return value;
};
var scanFor = (directory) => ({
  home: HOME,
  projectDirectory: normalizeProjectDirectory(directory)
});
var handle = async (req, res) => {
  if (req.headers.authorization !== `Bearer ${token}`) {
    throw new SkillsError("unauthorized", 401, "unauthorized");
  }
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  if (url.pathname === "/health" && req.method === "GET") {
    json(res, 200, { ok: true });
    return;
  }
  if (url.pathname === "/skills" && req.method === "GET") {
    const config = scanFor(url.searchParams.get("directory"));
    json(res, 200, await exclusive(() => scanSkills(config)));
    return;
  }
  if (url.pathname === "/skills/toggle" && req.method === "POST") {
    const body = await readBody(req);
    const id = stringField(body, "id", 256);
    const enabled = booleanField(body, "enabled");
    const config = scanFor(body.directory);
    json(res, 200, await exclusive(() => setSkillEnabled(config, id, enabled)));
    return;
  }
  if (url.pathname === "/skills/bulk" && req.method === "POST") {
    const body = await readBody(req);
    const enabled = booleanField(body, "enabled");
    const config = scanFor(body.directory);
    json(res, 200, await exclusive(() => bulkSetEnabled(config, enabled)));
    return;
  }
  if (url.pathname === "/skills/batch" && req.method === "POST") {
    const body = await readBody(req);
    const enable = stringArrayField(body, "enable");
    const disable = stringArrayField(body, "disable");
    const config = scanFor(body.directory);
    json(res, 200, await exclusive(() => batchSetEnabled(config, enable, disable)));
    return;
  }
  if (url.pathname === "/skills/resolve" && req.method === "POST") {
    const body = await readBody(req);
    const entryPath = pathField(body, "path", 4096);
    const keep = body.keep === "enabled" || body.keep === "disabled" ? body.keep : null;
    if (!keep) throw new SkillsError("invalid-request", 400, "keep must be enabled or disabled.");
    const config = scanFor(body.directory);
    json(res, 200, await exclusive(() => resolveBoth(config, entryPath, keep)));
    return;
  }
  throw new SkillsError("not-found", 404, "not-found");
};
var server = http.createServer((req, res) => {
  void handle(req, res).catch((error) => {
    if (res.headersSent || res.destroyed) return;
    if (error instanceof SkillsError) {
      json(res, error.status, {
        error: error.message,
        code: error.code,
        ...error instanceof SkillsError && error.conflicts ? { conflicts: error.conflicts } : {}
      });
      return;
    }
    console.error("skills service:", error instanceof Error ? error.message : error);
    json(res, 500, { error: "The local service failed to process the request. Try again.", code: "internal" });
  });
});
server.listen(port, "127.0.0.1");
