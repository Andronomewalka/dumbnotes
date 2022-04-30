import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { MdxStyleType } from 'components/MdxShared';
import { staggerVariant } from 'utils/staggerVariant';
import { MdxAboutInfoWrapper } from './styles';
import { useApplyVariants } from 'components/ApplyVariants';

export const MdxAboutInfo: FC<MdxStyleType> = ({ style, children }) => {
  const applyVariants = useApplyVariants();
  return (
    <MdxAboutInfoWrapper
      as={motion.div}
      variants={staggerVariant}
      custom={applyVariants}
      style={style}
    >
      {children}
    </MdxAboutInfoWrapper>
  );
};
