import Link from 'next/link';
import React, { FC } from 'react';
import { MdxLinkType } from './types';

export const MdxLink: FC<MdxLinkType> = ({ children, url }) => {
  return (
    <Link href={`/${url}`} passHref>
      <a>{children}</a>
    </Link>
  );
};
