import { atom } from 'recoil';
import { AnimationProps } from 'framer-motion';
import { staggerVariants } from 'utils/staggerVariants';
import { popStateVariantsEffect } from './effects';

export const variantsState = atom<AnimationProps['variants']>({
  key: 'variantsState',
  default: staggerVariants,
  effects: [popStateVariantsEffect],
});
