import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface MdxType {
  url: string;
  prefetchedData: MDXRemoteSerializeResult<Record<string, unknown>> | null;
}
