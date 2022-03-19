import { driveItems } from './state';

export const getDriveIdByPath = (path: string) => {
  return driveItems.find((cur) => cur.path === path)?.id;
};
