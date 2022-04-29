import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { MdxStyleType } from 'components/MdxShared';
import { staggerVariant } from 'utils/staggerVariant';
import { MdxAboutInfoWrapper } from './styles';

export const MdxAboutInfo: FC<MdxStyleType> = ({ style, children }) => {
  return (
    <MdxAboutInfoWrapper as={motion.div} variants={staggerVariant} style={style}>
      {children}
    </MdxAboutInfoWrapper>
  );
};
