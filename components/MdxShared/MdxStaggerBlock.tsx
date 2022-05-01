import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { MdxStyleType } from 'components/MdxShared';
import { useVariants } from 'components/VariantsContext';

export const MdxStaggerBlock: FC<MdxStyleType> = ({ style, children }) => {
  const { variants } = useVariants();
  return (
    <motion.div variants={variants} style={style}>
      {children}
    </motion.div>
  );
};
