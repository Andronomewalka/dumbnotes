import React, { FC, MouseEvent, useRef } from 'react';
import { MdxSubtitleType } from 'components/MdxShared';
import { MdxSubtitleWrapper } from './styles';

export const MdxSubtitle: FC<MdxSubtitleType> = ({ name, style, children }) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const onAClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <MdxSubtitleWrapper id={name} style={style} ref={containerRef}>
      <a href={`#${name}`} onClick={onAClick}>
        {children}
      </a>
    </MdxSubtitleWrapper>
  );
};
