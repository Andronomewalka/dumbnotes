import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { MdxStyleType } from 'components/Mdx';
import { MdxAboutLinkDivider, MdxAboutLinksWrapper } from './styles';
import { MdxAboutLinkItem } from './MdxAboutLinkItem';
import { fadeInUp, socialsData, sourcesData } from './utils';

export const MdxAboutLinks: FC<MdxStyleType> = ({ style }) => {
  return (
    <MdxAboutLinksWrapper as={motion.div} variants={fadeInUp} style={style}>
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
