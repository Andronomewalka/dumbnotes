import React, { FC, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MdxStaggerContainerType } from './types';

export const MdxStaggerContainer: FC<MdxStaggerContainerType> = ({
  stagger = 0.1,
  children,
}) => {
  const staggerVariant = useMemo(
    () => ({
      animate: {
        transition: {
          staggerChildren: stagger,
        },
      },
    }),
    [stagger]
  );
  return <motion.div variants={staggerVariant}>{children}</motion.div>;
};
