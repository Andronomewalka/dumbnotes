import React, { FC } from 'react';
import { MdxLink } from './MdxLink';
import { MdxLinkType } from './types';

export const MdxSourceLink: FC<MdxLinkType> = ({ children, url }) => {
  return (
    <li>
      <MdxLink url={url} external>
        {children}
      </MdxLink>
    </li>
  );
};
