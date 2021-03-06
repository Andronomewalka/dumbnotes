import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { device } from 'utils/media';
import { SplitterProp } from './types';
import { Wrapper, Divider, ExpandButton, HoverArea } from './styles';
import { ExpandIcon } from './icons';
import { getRawIsTablet } from 'utils/getRawIsTablet';

const getPxValue = (value: string) => {
  return parseInt(value, 10);
};

const getClientX = (args: any) => {
  return IS_TOUCH ? args.touches?.[0].clientX : args.clientX;
};

let IS_TOUCH = false;

export const Splitter: React.FC<SplitterProp> = ({ containerRef, minContainerWidth }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const isOpenRef = useRef(isOpen);
  const hoverRef = useRef<HTMLDivElement>(null);
  const prevContainerWidth = useRef('-1px');
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const isTablet = useMediaQuery(device.tablet);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    IS_TOUCH = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  const onDividerMouseDown = (downEvent: any) => {
    if (!containerRef.current || !isOpen) {
      return;
    }

    // if touch on expand button
    if (expandButtonRef.current?.contains(downEvent.target)) {
      return;
    }

    // without it mouseUp not firing in 5% cases if drag hard;
    if (typeof downEvent.clientX === 'number') {
      downEvent.preventDefault();
    }

    const container = containerRef.current;
    const prevTransitionStyle = container.style.transition;
    container.style.transition = 'unset';
    container.style.width = window.getComputedStyle(container, null).width;
    const initX = getClientX(downEvent);
    let lastX = initX;

    if (IS_TOUCH) {
      document.addEventListener('touchmove', mouseMove);
      document.addEventListener('touchend', mouseUp);
      document.addEventListener('touchendoutside', mouseUp);
      document.addEventListener('touchcancel', mouseUp);
    } else {
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);
    }

    if (IS_TOUCH && hoverRef.current) {
      hoverRef.current.classList.add('hover-from-touch');
    }

    function mouseMove(moveEvent: any) {
      const moveX = getClientX(moveEvent);
      if (container) {
        const newContainerWidth = getPxValue(container.style.width) + moveX - lastX;

        if (newContainerWidth > minContainerWidth) {
          container.style.width = `${newContainerWidth}px`;
          lastX = moveX;
        }
      } else {
        mouseUp();
      }
    }

    function mouseUp() {
      if (IS_TOUCH) {
        document.removeEventListener('touchmove', mouseMove);
        document.removeEventListener('touchend', mouseUp);
        document.removeEventListener('touchendoutside', mouseUp);
        document.removeEventListener('touchcancel', mouseUp);
      } else {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
      }

      if (IS_TOUCH && hoverRef.current) {
        hoverRef.current.classList.remove('hover-from-touch');
      }

      container.style.transition = prevTransitionStyle;
    }
  };

  const openContainer = useCallback(() => {
    const container = containerRef.current;
    const expandButton = expandButtonRef.current;
    const tablet = getRawIsTablet();
    if (container && expandButton) {
      container.classList.remove('is-hidden');
      if (tablet) {
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
    const tablet = getRawIsTablet();
    if (container && expandButton) {
      prevContainerWidth.current = window.getComputedStyle(container, null).width;
      container.classList.add('is-hidden');
      container.style.width = '0';
      if (tablet) {
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

  // close container when isTablet changed
  useIsomorphicLayoutEffect(() => {
    if (isFirstRenderRef.current) {
      return;
    } else if (isTablet && !isOpenRef.current) {
      closeContainer();
    } else if (isTablet && isOpenRef.current) {
      setIsOpen(false);
    } else if (!isTablet && isOpenRef.current) {
      prevContainerWidth.current = `${minContainerWidth}px`;
      openContainer();
    } else if (!isTablet && !isOpenRef.current) {
      prevContainerWidth.current = `${minContainerWidth}px`;
      setIsOpen(true);
    }
  }, [openContainer, closeContainer, containerRef, isTablet, minContainerWidth]);

  // prevent upper useEffect on page load to remove transition artifacts
  useIsomorphicLayoutEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
    }
  }, [isTablet]);

  // hide navigation before transitions on first load on tablet
  useIsomorphicLayoutEffect(() => {
    if (isTablet) {
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.classList.add('is-tablet-loaded');
        }
      }, 50);
    }
  }, [containerRef.current, isTablet]);

  const onExpandClick = () => {
    setIsOpen(!isOpen);
  };

  // close container on tablet when route changed
  useEffect(() => {
    const onRouteChanged = () => {
      if (isTablet) {
        setIsOpen(false);
      }
    };

    router.events.on('routeChangeComplete', onRouteChanged);
    return () => router.events.off('routeChangeComplete', onRouteChanged);
  }, [isTablet, router.events]);

  return (
    <Wrapper onTouchStart={onDividerMouseDown} onMouseDown={onDividerMouseDown}>
      <HoverArea ref={hoverRef} isOpen={isOpen} />
      <Divider />
      <ExpandButton
        title={isOpen ? 'Collapse' : 'Expand'}
        type='button'
        ref={expandButtonRef}
        onClick={onExpandClick}
        isOpen={isOpen}
      >
        <ExpandIcon />
      </ExpandButton>
    </Wrapper>
  );
};
