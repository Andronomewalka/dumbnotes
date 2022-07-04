import React, { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { SettingsModal } from './SettingsModal';
import { SettingsIcon } from './icons';
import { SettingsButton, SettingsWrapper } from './styles';

export const Settings: FC = () => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    const onDocumentClick = (event: any) => {
      // click outside of modal
      if (modalRef.current && !modalRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, [isOpen]);

  const onSettingsClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SettingsWrapper>
      <SettingsButton title='Settings' type='button' onClick={onSettingsClick}>
        <SettingsIcon />
      </SettingsButton>
      <AnimatePresence>
        {isOpen && <SettingsModal key='settings-modal' ref={modalRef} />}
      </AnimatePresence>
    </SettingsWrapper>
  );
};
