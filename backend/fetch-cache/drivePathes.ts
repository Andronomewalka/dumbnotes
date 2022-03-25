import path from 'path';
import { readFile, writeFile } from './fs-helpers';
import { DriveItemPathIdType, getAllDriveItems } from 'blog-app-shared';

const DRIVE_PATHES_CACHE = path.resolve('.cache_drive_pathes.json');

export const loadDrivePathes = async () => {
  try {
    const response = await getAllDriveItems();
    const drivePathes = response.data.map((cur) => ({ id: cur.id, path: cur.path }));
    writeFile(DRIVE_PATHES_CACHE, JSON.stringify(drivePathes), 'utf8').catch(() => {});
  } catch (e: any) {
    throw "can't get allDriveItems";
  }
};

export const getDrivePathes = async () => {
  try {
    return JSON.parse(
      await readFile(DRIVE_PATHES_CACHE, 'utf8')
    ) as DriveItemPathIdType[];
  } catch {
    console.log(`can't read ${DRIVE_PATHES_CACHE} JSON file`);
    return [];
  }
};
