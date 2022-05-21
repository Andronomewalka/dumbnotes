import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { MdxStyleType } from 'components/MdxShared';
import { useVariants } from 'contexts/VariantsContext';
import { MdxAboutDisclaimerWrapper } from './styles';

export const MdxAboutDisclaimer: FC<MdxStyleType> = ({ children }) => {
  const { variants } = useVariants();
  return (
    <MdxAboutDisclaimerWrapper as={motion.div} variants={variants}>
      {children}
    </MdxAboutDisclaimerWrapper>
  );
};
