import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { variantsState } from 'state';
import { MdxSubtitleType } from 'components/MdxShared';

export const MdxTitle: FC<MdxSubtitleType> = ({ style, children }) => {
  const variants = useRecoilValue(variantsState);

  return (
    <motion.header variants={variants} style={style}>
      <h1>{children}</h1>
    </motion.header>
  );
};
