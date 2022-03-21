import path from 'path';
import { readFile, writeFile } from './fs-helpers';
import { DriveItemPathIdType, getAllDriveItems } from 'blog-app-shared';

const DRIVE_PATHES_CACHE = path.resolve('.cache_drive_pathes.json');

let cachedDrivePathes = [] as DriveItemPathIdType[];
let invalidate = false;

export const loadDrivePathes = async () => {
  try {
    const response = await getAllDriveItems();
    cachedDrivePathes = response.data.map((cur) => ({ id: cur.id, path: cur.path }));
    invalidate = true;
  } catch (e: any) {
    throw "can't get allDriveItems";
  }
  writeFile(DRIVE_PATHES_CACHE, JSON.stringify(cachedDrivePathes), 'utf8').catch(
    () => {}
  );
};

export const getDrivePathes = async () => {
  if (invalidate || !cachedDrivePathes || cachedDrivePathes.length === 0) {
    try {
      cachedDrivePathes = JSON.parse(await readFile(DRIVE_PATHES_CACHE, 'utf8'));
      invalidate = false;
    } catch {
      console.log(`can't read ${DRIVE_PATHES_CACHE} JSON file`);
    }
  }
  return cachedDrivePathes;
};
