import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { MdxSubtitleType } from 'components/MdxShared';
import { useVariants } from 'contexts/VariantsContext';

export const MdxTitle: FC<MdxSubtitleType> = ({ style, children }) => {
  const { variants } = useVariants();
  return (
    <motion.header variants={variants} style={style}>
      <h1>{children}</h1>
    </motion.header>
  );
};
