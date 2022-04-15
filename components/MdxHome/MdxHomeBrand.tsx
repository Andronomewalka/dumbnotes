import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'styled-components';
import { MdxHomeBrandType } from './types';
import { dumbNotesDPathes } from './utils';

export const MdxHomeBrand: FC<MdxHomeBrandType> = ({ animate }) => {
  const theme = useTheme();

  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='100%'
      height='70'
      viewBox='0 0 300 55'
      xmlSpace='preserve'
    >
      {dumbNotesDPathes.map((cur) => (
        <motion.path
          key={cur.id}
          fill={theme.palette.accent}
          stroke={theme.palette.accent}
          strokeWidth='1'
          strokeLinecap='round'
          initial={{ fillOpacity: 0, pathLength: 0 }}
          animate={animate}
          d={cur.d}
        />
      ))}
    </svg>
  );
};
