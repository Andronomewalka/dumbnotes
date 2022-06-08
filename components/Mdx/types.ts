import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface MdxType {
  url: string;
  prefetchedPost: MDXRemoteSerializeResult<Record<string, unknown>>;
  prefetchedDate: string;
}
