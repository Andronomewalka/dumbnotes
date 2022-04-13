import React, { FC, useMemo } from 'react';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';
import { motion } from 'framer-motion';
import { MdxStaggerContainerType } from './types';
import { MdxStaggerWrapper } from './styles';

export const MdxStaggerContainer: FC<MdxStaggerContainerType> = ({
  stagger = 0.1,
  style,
  children,
}) => {
  const staggerVariant = useMemo(
    () => ({
      animate: {
        transition: {
          staggerChildren: stagger,
        },
      },
    }),
    [stagger]
  );

  useIsomorphicLayoutEffect(() => {
    // hide scrollbar on animation
    const mdxRoot = document.body.querySelector('section');
    if (mdxRoot) {
      mdxRoot.style.overflow = 'hidden';
    }
  }, []);

  const onAnimationComplete = () => {
    const mdxRoot = document.body.querySelector('section');
    if (mdxRoot) {
      mdxRoot.style.overflow = 'inherit';
    }
  };

  return (
    <MdxStaggerWrapper
      as={motion.div}
      variants={staggerVariant}
      style={style}
      onAnimationComplete={onAnimationComplete}
    >
      {children}
    </MdxStaggerWrapper>
  );
};
