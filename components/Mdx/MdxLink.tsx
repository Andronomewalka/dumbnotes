import Link from 'next/link';
import React, { FC } from 'react';
import { MdxLinkType } from './types';
import { LinkWrapper } from './styles';

export const MdxLink: FC<MdxLinkType> = ({ children, url, external }) => {
  return (
    <>
      {external ? (
        <LinkWrapper href={url}>{children}</LinkWrapper>
      ) : (
        <Link href={`/${url}`} passHref>
          <LinkWrapper>{children}</LinkWrapper>
        </Link>
      )}
    </>
  );
};
