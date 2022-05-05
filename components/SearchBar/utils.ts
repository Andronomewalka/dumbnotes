import { PostType } from './types';

export const removePostIfExist = (arr: Array<Partial<PostType>>, path: string) => {
  const index = arr.findIndex((cur) => cur.path === path);
  if (index !== -1) {
    arr.splice(index, 1);
  }
};
