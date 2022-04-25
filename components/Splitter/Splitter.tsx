import React, { MouseEvent } from 'react';
import { SplitterProp } from './types';
import { Wrapper, Divider } from './styles';

const getPxValue = (value: string) => {
  return parseInt(value, 10);
};

export const Splitter: React.FC<SplitterProp> = ({ containerRef, minContainerWidth }) => {
  const onDividerMouseDown = (mouseDownEvent: MouseEvent) => {
    if (!containerRef.current) {
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

  return (
    <Wrapper onMouseDown={onDividerMouseDown}>
      <Divider />
    </Wrapper>
  );
};
