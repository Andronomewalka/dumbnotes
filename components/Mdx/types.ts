import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { CSSProperties } from 'react';

export interface MdxType {
  url: string;
  prefetchedData: MDXRemoteSerializeResult<Record<string, unknown>> | null;
}

export interface MdxStaggerContainerType {
  stagger?: number;
}

export interface MdxPlainCardType {
  style?: CSSProperties;
  background: PlainCardBackgroundColor;
}

export enum PlainCardBackgroundColor {
  lightGray1 = 'lightGray1',
  lightGray2 = 'lightGray2',
}

export interface MdxLinkType {
  url: string;
  external?: boolean;
  plain?: boolean;
}
