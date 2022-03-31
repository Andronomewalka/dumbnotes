import Link from 'next/link';
import React, { FC } from 'react';
import { MdxLinkType } from './types';
import { PlainLink } from './styles';

//TODO:: rework this shitty code later
export const MdxLink: FC<MdxLinkType> = ({ children, url, external, plain }) => {
  return (
    <>
      {external ? (
        plain ? (
          <PlainLink>{children}</PlainLink>
        ) : (
          children
        )
      ) : plain ? (
        <Link href={`/${url}`} passHref>
          <PlainLink>{children}</PlainLink>
        </Link>
      ) : (
        children
      )}
    </>
  );
};
