import path from 'path';
import { NavNodeBaseType } from 'components/Nav';
import { readFile, writeFile } from './fs-helpers';
import { getDriveIdByPath } from 'utility/getDriveIdByPath';
import { getDriveItem } from 'blog-app-shared';

const NAV_ITEMS_CACHE = path.resolve('.cache_nav_items.json');

let cachedNavItems = [] as NavNodeBaseType[];
let invalidate = false;

export const loadNavItems = async () => {
  const navId = await getDriveIdByPath('--nav--');
  if (!navId) {
    throw 'no navigation found';
  }
  try {
    const response = await getDriveItem(navId);
    const rawContent = response.data.content;
    cachedNavItems = JSON.parse(rawContent);
    invalidate = true;
  } catch (e: any) {
    throw "can't parse navigation";
  }
  writeFile(NAV_ITEMS_CACHE, JSON.stringify(cachedNavItems), 'utf8').catch(() => {});
};

export const getNavItems = async () => {
  if (invalidate || !cachedNavItems || cachedNavItems.length === 0) {
    try {
      cachedNavItems = JSON.parse(await readFile(NAV_ITEMS_CACHE, 'utf8'));
      invalidate = false;
    } catch {
      console.log(`can't read ${NAV_ITEMS_CACHE} JSON file`);
    }
  }
  return cachedNavItems;
};
