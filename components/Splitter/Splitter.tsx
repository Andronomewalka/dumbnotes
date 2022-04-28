import React, { MouseEvent, useRef, useState } from 'react';
import { SplitterProp } from './types';
import { Wrapper, Divider, ExpandButton } from './styles';
import { ExpandIcon } from './icons';

const getPxValue = (value: string) => {
  return parseInt(value, 10);
};

export const Splitter: React.FC<SplitterProp> = ({ containerRef, minContainerWidth }) => {
  const [isOpen, setIsOpen] = useState(true);
  const prevContainerWidth = useRef('-1px');

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

  const onExpandClick = () => {
    const container = containerRef.current;
    if (container) {
      if (isOpen) {
        // from open to close
        prevContainerWidth.current = window.getComputedStyle(container, null).width;
        container.classList.add('is-hidden');
        container.style.width = '0';
      } else {
        // from close to open
        container.classList.remove('is-hidden');
        container.style.width = prevContainerWidth.current;
      }

      setIsOpen(!isOpen);
    }
  };

  return (
    <Wrapper onMouseDown={onDividerMouseDown}>
      <Divider className={isOpen ? 'is-open' : ''} />
      <ExpandButton onClick={onExpandClick} isOpen={isOpen}>
        <ExpandIcon />
      </ExpandButton>
    </Wrapper>
  );
};
