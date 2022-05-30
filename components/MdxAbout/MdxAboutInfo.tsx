import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { variantsState } from 'state';
import { MdxStyleType } from 'components/MdxShared';
import { MdxAboutInfoWrapper } from './styles';

export const MdxAboutInfo: FC<MdxStyleType> = ({ style, children }) => {
  const variants = useRecoilValue(variantsState);
  return (
    <MdxAboutInfoWrapper as={motion.div} variants={variants} style={style}>
      {children}
    </MdxAboutInfoWrapper>
  );
};
