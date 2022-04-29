import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { staggerVariant } from 'utils/staggerVariant';
import { MdxStyleType } from 'components/MdxShared';
import { MdxAboutLinkItem } from './MdxAboutLinkItem';
import { MdxAboutLinkDivider, MdxAboutLinksWrapper } from './styles';
import { socialsData, sourcesData } from './utils';

export const MdxAboutLinks: FC<MdxStyleType> = ({ style }) => {
  return (
    <MdxAboutLinksWrapper as={motion.ul} variants={staggerVariant} style={style}>
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
