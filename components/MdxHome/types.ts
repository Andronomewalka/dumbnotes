import { AnimationControls } from 'framer-motion';
import { MdxStyleType } from 'components/MdxShared';

export interface MdxHomeType extends MdxStyleType {
  disclaimer: string;
  linkText: string;
  linkUrl: string;
}

export interface MdxHomeBrandType {
  animate: AnimationControls;
}

export interface DumbNotesDPathType {
  id: number;
  d: string;
}
