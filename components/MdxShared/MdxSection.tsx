import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { variantsState } from 'state';
import { MdxStyleType } from 'components/MdxShared';

export const MdxSection: FC<MdxStyleType> = ({ style, children }) => {
  const variants = useRecoilValue(variantsState);

  return (
    <motion.section variants={variants} style={style}>
      {children}
    </motion.section>
  );
};
