import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { MdxStyleType } from 'components/MdxShared';
import { staggerVariant } from 'utils/staggerVariant';
import { MdxAboutDisclaimerWrapper } from './styles';

export const MdxAboutDisclaimer: FC<MdxStyleType> = ({ children }) => {
  return (
    <MdxAboutDisclaimerWrapper as={motion.div} variants={staggerVariant}>
      {children}
    </MdxAboutDisclaimerWrapper>
  );
};
