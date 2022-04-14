import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { CSSProperties } from 'react';

export interface MdxType {
  url: string;
  prefetchedData: MDXRemoteSerializeResult<Record<string, unknown>> | null;
}

export interface MdxStyleType {
  style?: CSSProperties;
}

export interface MdxStaggerContainerType extends MdxStyleType {
  stagger?: number;
}

export interface MdxLinkType {
  url: string;
  external?: boolean;
  plain?: boolean;
}

export interface MdxImageType {
  src: string;
  width: number;
  height: number;
  alt: string;
}
