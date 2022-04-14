import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { MdxStyleType } from 'components/Mdx';
import { MdxAboutInfoWrapper } from './styles';
import { fadeInUp } from './utils';

export const MdxAboutInfo: FC<MdxStyleType> = ({ style, children }) => {
  return (
    <MdxAboutInfoWrapper as={motion.div} variants={fadeInUp} style={style}>
      {children}
      {/* <MdxAboutInfoImageContainer>
        <MdxImage src='/about_kitty.png' width={230} height={230} alt='wat kitty' />
      </MdxAboutInfoImageContainer> */}
    </MdxAboutInfoWrapper>
  );
};
