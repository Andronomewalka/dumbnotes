import React, { FC } from 'react';
import { MdxStyleType } from './types';
import { MdxInfoWrapper } from './styles';

export const MdxInfo: FC<MdxStyleType> = ({ style, children }) => {
  return <MdxInfoWrapper style={style}>{children}</MdxInfoWrapper>;
};
