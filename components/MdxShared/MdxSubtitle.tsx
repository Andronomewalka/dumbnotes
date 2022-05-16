import React, { FC, MouseEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { MdxSubtitleType } from 'components/MdxShared';
import { useIsSectionReady } from 'components/MdxSection';
import { MdxSubtitleWrapper } from './styles';

export const MdxSubtitle: FC<MdxSubtitleType> = ({ name, style, children }) => {
  const router = useRouter();
  const { isReady } = useIsSectionReady();
  const containerRef = useRef<HTMLHeadingElement>(null);

  const onAClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    containerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    window.history.replaceState('', '', event.currentTarget.hash);
  };

  useEffect(() => {
    if (isReady) {
      const anchor = router.asPath.substring(router.asPath.indexOf('#') + 1);
      if (anchor === name) {
        containerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  }, [isReady, name, router.asPath]);

  return (
    <MdxSubtitleWrapper id={name} style={style} ref={containerRef}>
      <a href={`#${name}`} onClick={onAClick}>
        {children}
      </a>
    </MdxSubtitleWrapper>
  );
};
