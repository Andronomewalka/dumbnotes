import React from 'react';
import { motion } from 'framer-motion';
import { ThemeSelector } from 'components/ThemeSelector';
import { settingsAnimationsState, settingsLevelIndicatorState } from 'state';
import { SettingsModalWrapper } from './styles';
import { SettingsToggle } from './SettingsToggle';

const containerVariants = {
  hide: {
    y: -30,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

export const SettingsModal = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <SettingsModalWrapper
      as={motion.div}
      initial='hide'
      animate='show'
      exit='hide'
      variants={containerVariants}
      ref={ref}
    >
      <ThemeSelector />
      <SettingsToggle label='Page animations' state={settingsAnimationsState} />
      <SettingsToggle
        label='Navigation level indicator'
        state={settingsLevelIndicatorState}
      />
    </SettingsModalWrapper>
  );
});

SettingsModal.displayName = 'SettingsModal';
