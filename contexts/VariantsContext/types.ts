import { AnimationProps } from 'framer-motion';

export interface VairantsContextType {
  variants: AnimationProps['variants'];
  setVariants(varians: AnimationProps['variants']): void;
}
