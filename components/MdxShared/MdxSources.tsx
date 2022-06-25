import React, { FC } from 'react';
import { MdxStyleType } from './types';
import { MdxSourcesWrapper } from './styles';

export const MdxSources: FC<MdxStyleType> = ({ style, children }) => {
  return <MdxSourcesWrapper style={style}>{children}</MdxSourcesWrapper>;
};
