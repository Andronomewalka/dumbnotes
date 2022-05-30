import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { variantsState } from 'state';
import { MdxStyleType } from 'components/MdxShared';
import { MdxAboutLinkItem } from './MdxAboutLinkItem';
import { MdxAboutLinkDivider, MdxAboutLinksWrapper } from './styles';
import { socialsData, sourcesData } from './utils';

export const MdxAboutLinks: FC<MdxStyleType> = ({ style }) => {
  const variants = useRecoilValue(variantsState);
  return (
    <MdxAboutLinksWrapper as={motion.ul} variants={variants} style={style}>
      {socialsData.map((cur) => (
        <MdxAboutLinkItem key={cur.id} {...cur} />
      ))}
      <MdxAboutLinkDivider />
      {sourcesData.map((cur) => (
        <MdxAboutLinkItem key={cur.id} {...cur} />
      ))}
    </MdxAboutLinksWrapper>
  );
};
