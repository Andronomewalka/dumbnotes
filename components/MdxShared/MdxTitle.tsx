import React, { FC } from 'react';
import { MdxSubtitleType } from 'components/MdxShared';

export const MdxTitle: FC<MdxSubtitleType> = ({ style, children }) => {
  return (
    <header style={style}>
      <h1>{children}</h1>
    </header>
  );
};
