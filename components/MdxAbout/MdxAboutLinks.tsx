import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { MdxStyleType } from 'components/MdxShared';
import { useVariants } from 'components/VariantsContext';
import { MdxAboutLinkItem } from './MdxAboutLinkItem';
import { MdxAboutLinkDivider, MdxAboutLinksWrapper } from './styles';
import { socialsData, sourcesData } from './utils';

export const MdxAboutLinks: FC<MdxStyleType> = ({ style }) => {
  const { variants } = useVariants();
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
