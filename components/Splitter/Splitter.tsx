import React, { MouseEvent } from 'react';
import { SplitterProp } from './types';
import { Wrapper, Divider } from './styles';

const getPxValue = (value: string) => {
  return parseInt(value, 10);
};

export const Splitter: React.FC<SplitterProp> = ({
  containerRef,
  minContainerWidth,
}) => {
  const onDividerMouseDown = (e: MouseEvent) => {
    if (!containerRef.current) {
      return;
    }

    // without it mouseUp not firing in 5% cases if drag hard;
    e.preventDefault();

    const container = containerRef.current;
    const prevTransitionStyle = container.style.transition;
    container.style.transition = 'unset';
    container.style.width = window.getComputedStyle(container, null).width;
    const initX = e.clientX;
    let lastX = initX;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);

    function mouseMove(e: any) {
      if (container) {
        const newContainerWidth =
          getPxValue(container.style.width) + e.clientX - lastX;

        if (newContainerWidth > minContainerWidth) {
          container.style.width = `${newContainerWidth}px`;
          lastX = e.clientX;
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
