import React, { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { SplitterProp } from './types';
import { Wrapper, Divider, ExpandButton, HoverArea } from './styles';
import { ExpandIcon } from './icons';
import { device, mediaSize } from 'utils/media';
import { useRouter } from 'next/router';
import useMediaQuery from 'hooks/useMediaQuery';
import { getRawIsMobile } from 'utils/getRawIsMobile';

const getPxValue = (value: string) => {
  return parseInt(value, 10);
};

export const Splitter: React.FC<SplitterProp> = ({ containerRef, minContainerWidth }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const isOpenRef = useRef(isOpen);
  const prevContainerWidth = useRef('-1px');
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const isMobile = useMediaQuery(device.mobile);

  const onDividerMouseDown = (mouseDownEvent: MouseEvent) => {
    if (!containerRef.current || !isOpen) {
      return;
    }

    // without it mouseUp not firing in 5% cases if drag hard;
    mouseDownEvent.preventDefault();

    const container = containerRef.current;
    const prevTransitionStyle = container.style.transition;
    container.style.transition = 'unset';
    container.style.width = window.getComputedStyle(container, null).width;
    const initX = mouseDownEvent.clientX;
    let lastX = initX;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);

    function mouseMove(mouseMoveEvent: any) {
      if (container) {
        const newContainerWidth =
          getPxValue(container.style.width) + mouseMoveEvent.clientX - lastX;

        if (newContainerWidth > minContainerWidth) {
          container.style.width = `${newContainerWidth}px`;
          lastX = mouseMoveEvent.clientX;
        }
      } else {
        mouseUp();
      }
    }

    function mouseUp() {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
      container.style.transition = prevTransitionStyle;
    }
  };

  const openContainer = useCallback(() => {
    const container = containerRef.current;
    const expandButton = expandButtonRef.current;
    const mobile = getRawIsMobile();
    if (container && expandButton) {
      container.classList.remove('is-hidden');
      if (mobile) {
        expandButton.style.left = '93%';
        container.style.width = '100vw';
      } else {
        expandButton.style.left = '';
        container.style.width = prevContainerWidth.current;
      }
    }
  }, [containerRef]);

  const closeContainer = useCallback(() => {
    const container = containerRef.current;
    const expandButton = expandButtonRef.current;
    const mobile = getRawIsMobile();
    if (container && expandButton) {
      prevContainerWidth.current = window.getComputedStyle(container, null).width;
      container.classList.add('is-hidden');
      container.style.width = '0';
      if (mobile) {
        expandButton.style.left = '10px';
      } else {
        expandButton.style.left = '';
      }
    }
  }, [containerRef]);

  useEffect(() => {
    if (isOpen) {
      openContainer();
    } else {
      closeContainer();
    }
    isOpenRef.current = isOpen;
  }, [openContainer, closeContainer, isOpen]);

  // close container when isMobile changed
  useEffect(() => {
    if (isMobile && !isOpenRef.current) {
      closeContainer();
    } else if (isMobile && isOpenRef.current) {
      setIsOpen(false);
    } else if (!isMobile && isOpenRef.current) {
      prevContainerWidth.current = `${minContainerWidth}px`;
      openContainer();
    } else if (!isMobile && !isOpenRef.current) {
      setIsOpen(true);
    }
  }, [openContainer, closeContainer, containerRef, isMobile, minContainerWidth]);

  const onExpandClick = () => {
    setIsOpen(!isOpen);
  };

  // close container on mobile when route changed
  useEffect(() => {
    const onRouteChanged = () => {
      if (isMobile) {
        setIsOpen(false);
      }
    };

    router.events.on('routeChangeComplete', onRouteChanged);
    return () => router.events.off('routeChangeComplete', onRouteChanged);
  }, [isMobile, router.events]);

  return (
    <Wrapper onMouseDown={onDividerMouseDown}>
      <HoverArea isOpen={isOpen} />
      <Divider />
      <ExpandButton ref={expandButtonRef} onClick={onExpandClick} isOpen={isOpen}>
        <ExpandIcon />
      </ExpandButton>
    </Wrapper>
  );
};
