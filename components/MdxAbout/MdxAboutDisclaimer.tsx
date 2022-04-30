import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { MdxStyleType } from 'components/MdxShared';
import { staggerVariant } from 'utils/staggerVariant';
import { MdxAboutDisclaimerWrapper } from './styles';
import { useApplyVariants } from 'components/ApplyVariants';

export const MdxAboutDisclaimer: FC<MdxStyleType> = ({ children }) => {
  const applyVariants = useApplyVariants();
  return (
    <MdxAboutDisclaimerWrapper
      as={motion.div}
      variants={staggerVariant}
      custom={applyVariants}
    >
      {children}
    </MdxAboutDisclaimerWrapper>
  );
};
