import React, { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { SplitterProp } from './types';
import { Wrapper, Divider, ExpandButton } from './styles';
import { ExpandIcon } from './icons';
import { device, mediaSize } from 'utils/media';
import { getElemByDataId } from 'utils/getElemByDataId';
import { useRouter } from 'next/router';
import useMediaQuery from 'hooks/useMediaQuery';

const getPxValue = (value: string) => {
  return parseInt(value, 10);
};

export const Splitter: React.FC<SplitterProp> = ({ containerRef, minContainerWidth }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
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
    const mobile = window.screen.width <= mediaSize.laptopBreakpoint;
    if (container && expandButton) {
      container.classList.remove('is-hidden');
      console.log('isMobile', mobile);
      if (mobile) {
        expandButton.style.left = '95%';
        container.style.width = '100vw';
      } else {
        container.style.width = prevContainerWidth.current;
      }
    }
  }, [containerRef]);

  const closeContainer = useCallback(() => {
    const container = containerRef.current;
    const expandButton = expandButtonRef.current;
    const mobile = window.screen.width < mediaSize.laptopBreakpoint;
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
  }, [openContainer, closeContainer, isOpen]);

  // close container when isMobile changed
  useEffect(() => {
    setIsOpen(false);
    closeContainer();
  }, [closeContainer, containerRef, isMobile]);

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

    router.events.on('routeChangeStart', onRouteChanged);
    return () => router.events.off('routeChangeStart', onRouteChanged);
  }, [isMobile, router.events]);

  // fake like expand button is a part of search block on mobile
  useEffect(() => {
    if (!isMobile) {
      return;
    }

    let lastScrollTop = 0;
    const onScroll = (event: any) => {
      const curScrollTop = event.target.scrollTop;
      if (curScrollTop > lastScrollTop && expandButtonRef.current) {
        expandButtonRef.current.style.top = '-65px';
      } else if (expandButtonRef.current) {
        expandButtonRef.current.style.top = '20px';
      }
      lastScrollTop = curScrollTop;
    };

    const contentWrapper = getElemByDataId('content-wrapper');
    if (contentWrapper && expandButtonRef.current) {
      contentWrapper.addEventListener('scroll', onScroll, false);
      return () => void contentWrapper.removeEventListener('scroll', onScroll);
    }
  }, [isMobile]);

  return (
    <Wrapper onMouseDown={onDividerMouseDown}>
      <Divider className={isOpen ? 'is-open' : ''} />
      <ExpandButton ref={expandButtonRef} onClick={onExpandClick} isOpen={isOpen}>
        <ExpandIcon />
      </ExpandButton>
    </Wrapper>
  );
};
