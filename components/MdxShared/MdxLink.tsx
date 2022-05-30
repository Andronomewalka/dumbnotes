import React, { FC, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { variantsState } from 'state';
import { staggerVariants } from 'utils/staggerVariants';
import { MdxLinkType } from './types';
import { PlainLink } from './styles';

export const MdxLink: FC<MdxLinkType> = ({ children, url, external = false }) => {
  const router = useRouter();
  const setVariants = useSetRecoilState(variantsState);
  const onRouteClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!external) {
      event.preventDefault();
      setVariants(staggerVariants);
      router.push(url);
    }
  };

  return (
    <PlainLink onClick={onRouteClick} href={url} target='_blank'>
      {children}
    </PlainLink>
  );
};
