import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { MdxStyleType } from 'components/MdxShared';
import { staggerVariant } from 'utils/staggerVariant';
import { useApplyVariants } from 'components/ApplyVariants';

export const MdxStaggerBlock: FC<MdxStyleType> = ({ style, children }) => {
  const applyVariants = useApplyVariants();
  return (
    <motion.div variants={staggerVariant} custom={applyVariants} style={style}>
      {children}
    </motion.div>
  );
};
