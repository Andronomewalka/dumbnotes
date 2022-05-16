import React, { FC, MouseEvent, useRef } from 'react';
import { MdxSubtitleType } from 'components/MdxShared';
import { MdxSubtitleWrapper } from './styles';

export const MdxSubtitle: FC<MdxSubtitleType> = ({ name, style, children }) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const onAClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    containerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    window.history.replaceState('', '', event.currentTarget.hash);
  };

  // own-{name} in id to prevent default scroll to anchor (for some reason, it doesn't respect scroll-margin)
  return (
    <MdxSubtitleWrapper id={`own-${name}`} style={style} ref={containerRef}>
      <a href={`#${name}`} onClick={onAClick}>
        {children}
      </a>
    </MdxSubtitleWrapper>
  );
};
