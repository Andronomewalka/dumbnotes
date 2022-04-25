import { CSSProperties } from 'react';

export interface MdxStyleType {
  style?: CSSProperties;
}

export interface MdxStaggerContainerType extends MdxStyleType {
  stagger?: number;
  hideScrollBar?: boolean;
  stretch?: boolean;
}

export interface MdxSubtitleType extends MdxStyleType {
  name: string;
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
