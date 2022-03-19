import { RefObject } from 'react';

export interface SplitterProp {
  containerRef: RefObject<HTMLElement | null>;
  minContainerWidth: number;
}
