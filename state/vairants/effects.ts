import { AtomEffect } from 'recoil';
import { AnimationProps } from 'framer-motion';
import { offBeforePopState, onBeforePopState } from 'utils/beforePopStateChain';
import { noVariants } from 'utils/staggerVariants';

export const popStateVariantsEffect: AtomEffect<AnimationProps['variants']> = ({
  setSelf,
}) => {
  const onPopState = () => {
    setSelf(noVariants);
    return true;
  };

  onBeforePopState(onPopState);
  return () => offBeforePopState(onPopState);
};
