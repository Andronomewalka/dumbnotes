import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { MdxStyleType } from 'components/MdxShared';
import { useVariants } from 'components/VariantsContext';
import { useIsSectionReady } from './context';

export const MdxSectionMotion: FC<MdxStyleType> = ({ style, children }) => {
  const { variants } = useVariants();
  const { setIsReady } = useIsSectionReady();

  const onAnimationComplete = (stage: string) => {
    if (stage === 'animate') {
      setIsReady(true);
    }
  };

  return (
    <motion.section
      variants={variants}
      style={style}
      onAnimationComplete={onAnimationComplete}
    >
      {children}
    </motion.section>
  );
};
