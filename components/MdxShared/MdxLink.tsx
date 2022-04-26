import Link from 'next/link';
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
        <Link href={url} passHref>
          <PlainLink>{children}</PlainLink>
        </Link>
      ) : (
        children
      )}
    </>
  );
};
