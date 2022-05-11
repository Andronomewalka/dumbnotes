import { CSSProperties } from 'react';

export interface MdxStyleType {
  style?: CSSProperties;
}

export interface MdxArticleType extends MdxStyleType {
  hideScrollBar?: boolean;
  stretch?: boolean;
}

export interface MdxSubtitleType extends MdxStyleType {
  name: string;
}

export interface MdxLinkType {
  url: string;
  external?: boolean;
}

export interface MdxImageType {
  src: string;
  width?: number;
  height?: number;
  stretch?: boolean;
  alt: string;
}
