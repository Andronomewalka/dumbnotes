import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { MdxStyleType } from 'components/MdxShared';
import { staggerVariant } from 'utils/staggerVariant';

export const MdxStaggerBlock: FC<MdxStyleType> = ({ style, children }) => {
  return (
    <motion.div variants={{}} style={style}>
      {children}
    </motion.div>
  );
};
