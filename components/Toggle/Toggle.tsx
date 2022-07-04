import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { ToggleType } from './types';
import { ToggleTrack, ToggleThumb, ToggleWrapper } from './styles';

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

export const Toggle: FC<ToggleType> = ({ checked, label, onToggle }) => {
  const toggleSwitch = () => onToggle(!checked);

  return (
    <ToggleWrapper $isOn={checked} onClick={toggleSwitch}>
      <ToggleTrack>
        <ToggleThumb as={motion.span} layout transition={spring} />
      </ToggleTrack>
      {label}
    </ToggleWrapper>
  );
};
