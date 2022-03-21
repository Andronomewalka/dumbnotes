import { serialize } from 'next-mdx-remote/serialize';

export const serializeMdx = async (sourceRaw: any) => {
  return await serialize(sourceRaw);
};
