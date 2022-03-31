import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { PlainCardWrapper } from './styles';
import { MdxPlainCardType } from './types';

const easing = [0.6, -0.05, 0.01, 0.99];

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

export const MdxPlainCard: FC<MdxPlainCardType> = ({ background, style, children }) => {
  return (
    <PlainCardWrapper
      as={motion.div}
      variants={fadeInUp}
      style={style}
      background={background}
    >
      {children}
    </PlainCardWrapper>
  );
};
