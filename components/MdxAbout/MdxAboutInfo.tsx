import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { MdxStyleType } from 'components/MdxShared';
import { useVariants } from 'components/VariantsContext';
import { MdxAboutInfoWrapper } from './styles';

export const MdxAboutInfo: FC<MdxStyleType> = ({ style, children }) => {
  const { variants } = useVariants();
  return (
    <MdxAboutInfoWrapper as={motion.div} variants={variants} style={style}>
      {children}
    </MdxAboutInfoWrapper>
  );
};
