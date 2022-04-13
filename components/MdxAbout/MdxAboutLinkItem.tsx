import React, { FC } from 'react';
import { MdxAboutLinkA, MdxAboutLinkItemWrapper } from './styles';
import { MdxAboutLinkItemType } from './types';

export const MdxAboutLinkItem: FC<MdxAboutLinkItemType> = ({ name, icon, link }) => {
  return (
    <MdxAboutLinkItemWrapper>
      <MdxAboutLinkA href={link} target='_blank' rel='noreferrer noopener'>
        {icon}
        {name}
      </MdxAboutLinkA>
    </MdxAboutLinkItemWrapper>
  );
};
