import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import {
  GroupFileError,
  normalizeGroupsFile,
  type GroupsFile,
} from '../shared/groups.ts';

const DATA_DIR = ['.config', 'openchamber', 'skills-manager'] as const;
const GROUPS_FILE = 'groups.json';

export class GroupError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(code: string, status: number, message: string) {
    super(message);
    this.name = 'GroupError';
    this.code = code;
    this.status = status;
  }
}

const defaults = (): GroupsFile => ({ version: 1, groups: [] });

const legacyDataDir = (home: string): string => path.join(home, ...DATA_DIR);
const dataDirFor = (home: string, override?: string): string => override ?? legacyDataDir(home);
const groupsFile = (dir: string): string => path.join(dir, GROUPS_FILE);

export const readGroups = async (home: string, dataDirOverride?: string): Promise<GroupsFile> => {
  const file = groupsFile(dataDirFor(home, dataDirOverride));
  let raw: string;
  try {
    raw = await fs.readFile(file, 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return defaults();
    throw new GroupError('read-error', 500, `Could not read the group configuration at ${file}. Check file permissions.`);
  }
  try {
    return normalizeGroupsFile(JSON.parse(raw));
  } catch {
    throw new GroupError('invalid-groups', 500, `The group configuration is malformed; the original file was not changed (${file}).`);
  }
};

export const writeGroups = async (home: string, value: unknown, dataDirOverride?: string): Promise<GroupsFile> => {
  let normalized: GroupsFile;
  try {
    normalized = normalizeGroupsFile(value);
  } catch (error) {
    if (error instanceof GroupFileError) {
      throw new GroupError('invalid-groups', 400, error.message);
    }
    throw new GroupError('invalid-groups', 400, 'The group configuration format is invalid.');
  }

  const dir = dataDirFor(home, dataDirOverride);
  const file = groupsFile(dir);
  const temporary = `${file}.${randomUUID()}.tmp`;
  try {
    await fs.mkdir(dir, { recursive: true, mode: 0o700 });
    await fs.writeFile(temporary, `${JSON.stringify(normalized, null, 2)}\n`, {
      encoding: 'utf8',
      mode: 0o600,
    });
    await fs.rename(temporary, file);
    return await readGroups(home, dataDirOverride);
  } catch (error) {
    try {
      await fs.unlink(temporary);
    } catch {
    }
    if (error instanceof GroupError) throw error;
    throw new GroupError('write-error', 500, 'Could not save the group configuration. Check directory permissions.');
  }
};
