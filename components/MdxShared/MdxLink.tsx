import React, { FC, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { useUpdateVariants } from 'hooks/useUpdateVariants';
import { staggerVariants } from 'utils/staggerVariants';
import { MdxLinkType } from './types';
import { PlainLink } from './styles';

export const MdxLink: FC<MdxLinkType> = ({ style, children, url, external = false }) => {
  const router = useRouter();
  const setVariants = useUpdateVariants();
  const onRouteClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (url.startsWith('#')) {
      event.preventDefault();
      const elemAcnhor = document.getElementById(`own-${url.slice(1)}`);
      if (elemAcnhor) {
        elemAcnhor.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        window.history.replaceState(history.state, '', url);
      }
    } else if (!external) {
      event.preventDefault();
      setVariants(staggerVariants);
      router.push(url);
    }
  };

  return (
    <PlainLink style={style} onClick={onRouteClick} href={url} target='_blank'>
      {children}
    </PlainLink>
  );
};
