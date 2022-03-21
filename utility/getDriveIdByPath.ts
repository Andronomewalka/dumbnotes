import { getDrivePathes } from 'fetch-cache';

export const getDriveIdByPath = async (path: string) => {
  const items = await getDrivePathes();
  return items.find((cur) => cur.path === path)?.id;
};
