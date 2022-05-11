import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { NavStubItem } from './styles';

const arr = new Array(5).fill(null);

export const NavStub: FC = () => {
  return (
    <>
      {arr.map((_, i) => (
        <NavStubItem
          as={motion.li}
          number={i}
          key={i}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.3,
            delay: 0.3,
          }}
        />
      ))}
    </>
  );
};
