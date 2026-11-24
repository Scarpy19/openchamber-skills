import http from 'node:http';
import os from 'node:os';
import {
  SkillsError,
  batchSetEnabled,
  bulkSetEnabled,
  findSkill,
  resolveBoth,
  scanSkills,
  setSkillEnabled,
} from '../core/skills.ts';
import { normalizeProjectDirectory, type ScanConfig } from '../core/sources.ts';
import { BulkUndo } from '../core/undo.ts';

const port = Number(process.env.OPENCHAMBER_SERVICE_PORT);
const token = process.env.OPENCHAMBER_SERVICE_TOKEN ?? '';
if (!port || !token) {
  console.error('OPENCHAMBER_SERVICE_PORT and OPENCHAMBER_SERVICE_TOKEN are required');
  process.exit(1);
}

const HOME = os.homedir();
const undo = new BulkUndo();

const json = (res: http.ServerResponse, status: number, body: unknown): void => {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(body));
};

const readBody = (req: http.IncomingMessage): Promise<Record<string, unknown>> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    let failed = false;
    req.on('data', (chunk: Buffer) => {
      if (failed) return;
      size += chunk.length;
      if (size > 256 * 1024) {
        failed = true;
        chunks.length = 0;
        reject(new SkillsError('too-large', 413, 'The submitted content is too large.'));
        return;
      }
      chunks.push(chunk);
    });
    req.on('error', () => reject(new SkillsError('invalid-request', 400, 'The request was interrupted. Try again.')));
    req.on('end', () => {
      if (failed) return;
      try {
        const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
          throw new Error('not an object');
        }
        resolve(parsed as Record<string, unknown>);
      } catch {
        reject(new SkillsError('invalid-request', 400, 'The request body must be a valid JSON object.'));
      }
    });
  });

let queue: Promise<unknown> = Promise.resolve();
const exclusive = <T>(action: () => Promise<T>): Promise<T> => {
  const next = queue.then(() => action(), () => action());
  queue = next.catch(() => undefined);
  return next;
};

const stringField = (body: Record<string, unknown>, key: string, max: number): string => {
  const value = typeof body[key] === 'string' ? body[key].trim() : '';
  if (!value) throw new SkillsError('invalid-request', 400, `Missing ${key}.`);
  if (value.length > max) throw new SkillsError('invalid-request', 400, `${key} exceeds the length limit.`);
  return value;
};

/** Unlike other fields, paths must keep their exact bytes (spaces matter on Windows). */
const pathField = (body: Record<string, unknown>, key: string, max: number): string => {
  const value = typeof body[key] === 'string' ? body[key] : '';
  if (!value || value.length > max) throw new SkillsError('invalid-request', 400, `Missing ${key}.`);
  return value;
};

const booleanField = (body: Record<string, unknown>, key: string): boolean => {
  const value = body[key];
  if (typeof value !== 'boolean') throw new SkillsError('invalid-request', 400, `${key} must be a boolean.`);
  return value;
};

const stringArrayField = (body: Record<string, unknown>, key: string): string[] => {
  const value = body[key];
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || item.length === 0 || item.length > 256)) {
    throw new SkillsError('invalid-request', 400, `${key} must be an array of skill IDs.`);
  }
  if (value.length > 200) throw new SkillsError('invalid-request', 400, `Too many ${key} entries.`);
  return value as string[];
};

const scanFor = (directory: unknown): ScanConfig => ({
  home: HOME,
  projectDirectory: normalizeProjectDirectory(directory),
});

const verifyPreview = (expected: unknown, actual: string[]): void => {
  if (expected === undefined) return; // Compatibility with older panels.
  if (!Array.isArray(expected) || expected.some((item) => typeof item !== 'string')) {
    throw new SkillsError('invalid-request', 400, 'Invalid preview paths.');
  }
  const normalized = (paths: string[]) => [...new Set(paths)].sort();
  if (JSON.stringify(normalized(expected as string[])) !== JSON.stringify(normalized(actual))) {
    throw new SkillsError('conflict', 409, 'Skill files changed since the preview. Rescan and confirm again.');
  }
};

const handle = async (req: http.IncomingMessage, res: http.ServerResponse): Promise<void> => {
  if (req.headers.authorization !== `Bearer ${token}`) {
    throw new SkillsError('unauthorized', 401, 'unauthorized');
  }
  const url = new URL(req.url ?? '/', 'http://127.0.0.1');
  if (url.pathname === '/health' && req.method === 'GET') {
    json(res, 200, { ok: true });
    return;
  }
  if (url.pathname === '/skills' && req.method === 'GET') {
    const config = scanFor(url.searchParams.get('directory'));
    json(res, 200, await exclusive(() => scanSkills(config)));
    return;
  }
  if (url.pathname === '/skills/toggle' && req.method === 'POST') {
    const body = await readBody(req);
    const id = stringField(body, 'id', 256);
    const enabled = booleanField(body, 'enabled');
    const config = scanFor(body.directory);
    json(res, 200, await exclusive(() => {
      undo.clear();
      return setSkillEnabled(config, id, enabled);
    }));
    return;
  }
  if (url.pathname === '/skills/bulk' && req.method === 'POST') {
    const body = await readBody(req);
    const enabled = booleanField(body, 'enabled');
    const config = scanFor(body.directory);
    json(res, 200, await exclusive(async () => {
      undo.clear();
      const before = await scanSkills(config);
      verifyPreview(body.expectedPaths, before.skills.flatMap((skill) => enabled ? skill.disabledPaths : skill.activePaths));
      const captured = await undo.capture(before);
      const result = await bulkSetEnabled(config, enabled);
      return { ...result, undoAvailable: await undo.remember(before, result, captured) };
    }));
    return;
  }
  if (url.pathname === '/skills/batch' && req.method === 'POST') {
    const body = await readBody(req);
    const enable = stringArrayField(body, 'enable');
    const disable = stringArrayField(body, 'disable');
    const config = scanFor(body.directory);
    json(res, 200, await exclusive(async () => {
      undo.clear();
      const before = await scanSkills(config);
      verifyPreview(body.expectedPaths, [
        ...enable.flatMap((id) => findSkill(before.skills, id).disabledPaths),
        ...disable.flatMap((id) => findSkill(before.skills, id).activePaths),
      ]);
      const captured = await undo.capture(before);
      const result = await batchSetEnabled(config, enable, disable);
      return { ...result, undoAvailable: await undo.remember(before, result, captured) };
    }));
    return;
  }
  if (url.pathname === '/skills/undo' && req.method === 'POST') {
    const body = await readBody(req);
    const config = scanFor(body.directory);
    json(res, 200, await exclusive(async () => {
      await undo.undo(config.projectDirectory ?? null);
      return scanSkills(config);
    }));
    return;
  }
  if (url.pathname === '/skills/resolve' && req.method === 'POST') {
    const body = await readBody(req);
    const entryPath = pathField(body, 'path', 4096);
    const keep = body.keep === 'enabled' || body.keep === 'disabled' ? body.keep : null;
    if (!keep) throw new SkillsError('invalid-request', 400, 'keep must be enabled or disabled.');
    const config = scanFor(body.directory);
    json(res, 200, await exclusive(() => {
      undo.clear();
      return resolveBoth(config, entryPath, keep);
    }));
    return;
  }
  throw new SkillsError('not-found', 404, 'not-found');
};

const server = http.createServer((req, res) => {
  void handle(req, res).catch((error: unknown) => {
    if (res.headersSent || res.destroyed) return;
    if (error instanceof SkillsError) {
      json(res, error.status, {
        error: error.message,
        code: error.code,
        ...(error instanceof SkillsError && error.conflicts ? { conflicts: error.conflicts } : {}),
      });
      return;
    }
    console.error('skills service:', error instanceof Error ? error.message : error);
    json(res, 500, { error: 'The local service failed to process the request. Try again.', code: 'internal' });
  });
});

server.listen(port, '127.0.0.1');
