import React, { FC, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { MdxLinkType } from './types';
import { PlainLink } from './styles';
import { useVariants } from 'components/VariantsContext';
import { staggerVariant } from 'utils/staggerVariant';

export const MdxLink: FC<MdxLinkType> = ({ children, url, external = false }) => {
  const router = useRouter();
  const { setVariants } = useVariants();
  const onRouteClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!external) {
      event.preventDefault();
      setVariants(staggerVariant);
      router.push(url);
    }
  };

  return (
    <PlainLink onClick={onRouteClick} href={url} target='_blank'>
      {children}
    </PlainLink>
  );
};
