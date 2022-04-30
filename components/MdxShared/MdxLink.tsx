import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { MdxLinkType } from './types';
import { PlainLink } from './styles';

//TODO:: rework this shitty code later
export const MdxLink: FC<MdxLinkType> = ({
  children,
  url,
  external = false,
  plain = true,
}) => {
  const router = useRouter();
  const onRouteClick = () => {
    // use reference in ApplyVariants to define should stagger animations apply to page or not
    // (mobile routing from Nav occurs flickering for some reasons)
    router.push(`${url}?reference=true`, url);
  };

  return (
    <>
      {external ? (
        plain ? (
          <PlainLink href={url} target='_blank'>
            {children}
          </PlainLink>
        ) : (
          children
        )
      ) : plain ? (
        <PlainLink onClick={onRouteClick}>{children}</PlainLink>
      ) : (
        children
      )}
    </>
  );
};
