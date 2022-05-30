import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { variantsState } from 'state';
import { MdxStyleType } from 'components/MdxShared';
import { MdxAboutDisclaimerWrapper } from './styles';

export const MdxAboutDisclaimer: FC<MdxStyleType> = ({ children }) => {
  const variants = useRecoilValue(variantsState);
  return (
    <MdxAboutDisclaimerWrapper as={motion.div} variants={variants}>
      {children}
    </MdxAboutDisclaimerWrapper>
  );
};
