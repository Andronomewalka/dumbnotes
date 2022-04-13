import React, { FC } from 'react';
import { MdxStyleType } from 'components/Mdx';
import { MdxAboutWrapper } from './styles';

export const MdxAbout: FC<MdxStyleType> = ({ style, children }) => {
  return <MdxAboutWrapper style={style}>{children}</MdxAboutWrapper>;
};
