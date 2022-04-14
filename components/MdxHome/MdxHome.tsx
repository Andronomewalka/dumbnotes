import { motion, useAnimation } from 'framer-motion';
import React, { FC, useEffect } from 'react';
import { MdxHomeBrand } from './MdxHomeBrand';
import { MdxHomeDisclaimerWrapper, MdxHomeWrapper } from './styles';
import { MdxHomeType } from './types';

const homeStaggerVariant = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const strokeTransition = {
  duration: 3,
  ease: 'easeInOut',
};

const fillTransition = {
  duration: 1,
  ease: 'easeInOut',
};

const disclaimerTransition = {
  duration: 0.6,
};

export const MdxHome: FC<MdxHomeType> = ({ disclaimer }) => {
  const animateControl = useAnimation();

  useEffect(() => {
    animateControl.start({ pathLength: 1, transition: strokeTransition }).then(() => {
      animateControl.start({ fillOpacity: 1, transition: fillTransition }).then(() => {
        animateControl.start({ y: 0, opacity: 1, transition: disclaimerTransition });
      });
    });
  }, [animateControl]);

  return (
    <MdxHomeWrapper as={motion.div} variants={homeStaggerVariant}>
      <MdxHomeBrand animation={animateControl} />
      <MdxHomeDisclaimerWrapper
        as={motion.div}
        initial={{ y: 15, opacity: 0 }}
        animate={animateControl}
      >
        {disclaimer}
      </MdxHomeDisclaimerWrapper>
    </MdxHomeWrapper>
  );
};
