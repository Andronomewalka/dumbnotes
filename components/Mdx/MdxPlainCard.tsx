import React, { FC } from 'react';
import { PlainCardWrapper } from './styles';
import { MdxPlainCardType } from './types';

export const MdxPlainCard: FC<MdxPlainCardType> = ({ background, style, children }) => {
  return (
    <PlainCardWrapper style={style} background={background}>
      {children}
    </PlainCardWrapper>
  );
};
