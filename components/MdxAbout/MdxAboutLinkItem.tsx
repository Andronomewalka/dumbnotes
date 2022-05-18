import React, { FC } from 'react';
import { MdxAboutLinkA, MdxAboutLinkItemWrapper } from './styles';
import { MdxAboutLinkItemType } from './types';

export const MdxAboutLinkItem: FC<MdxAboutLinkItemType> = ({
  name,
  icon,
  link,
  download,
}) => {
  return (
    <MdxAboutLinkItemWrapper>
      <MdxAboutLinkA
        href={link}
        target='_blank'
        rel='noreferrer noopener'
        download={download ?? false}
      >
        {icon}
        {name}
      </MdxAboutLinkA>
    </MdxAboutLinkItemWrapper>
  );
};
