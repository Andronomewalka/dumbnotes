import React, { FC } from 'react';
import { MdxStyleType } from 'components/MdxShared';
import { MdxInfoWrapper } from './styles';

export const MdxInfo: FC<MdxStyleType> = ({ style, children }) => {
  return <MdxInfoWrapper style={style}>{children}</MdxInfoWrapper>;
};
