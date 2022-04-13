import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { MdxStyleType } from 'components/Mdx';
import { MdxAboutInfoWrapper } from './styles';

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
};

export const MdxAboutInfo: FC<MdxStyleType> = ({ style, children }) => {
  return (
    <MdxAboutInfoWrapper as={motion.div} variants={fadeInUp} style={style}>
      {children}
    </MdxAboutInfoWrapper>
  );
};
