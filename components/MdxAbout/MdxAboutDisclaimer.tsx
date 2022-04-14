import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { MdxStyleType } from 'components/Mdx';
import { MdxAboutDisclaimerWrapper } from './styles';
import { fadeInUp } from './utils';

export const MdxAboutDisclaimer: FC<MdxStyleType> = ({ style, children }) => {
  return (
    <MdxAboutDisclaimerWrapper as={motion.div} variants={fadeInUp} syle={style}>
      {children}
    </MdxAboutDisclaimerWrapper>
  );
};
