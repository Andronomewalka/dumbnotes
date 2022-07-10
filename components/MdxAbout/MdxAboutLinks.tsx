import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { useTheme } from 'styled-components';
import { variantsState } from 'state';
import { MdxStyleType } from 'components/MdxShared';
import { MdxAboutLinkItem } from './MdxAboutLinkItem';
import { MdxAboutLinkDivider, MdxAboutLinksWrapper } from './styles';
import { getSourcesData, getSocialsData } from './utils';

export const MdxAboutLinks: FC<MdxStyleType> = ({ style }) => {
  const variants = useRecoilValue(variantsState);
  const theme = useTheme();

  return (
    <MdxAboutLinksWrapper as={motion.ul} variants={variants} style={style}>
      {getSocialsData(theme.colorScheme).map((cur) => (
        <MdxAboutLinkItem key={cur.id} {...cur} />
      ))}
      <MdxAboutLinkDivider />
      {getSourcesData(theme.colorScheme).map((cur) => (
        <MdxAboutLinkItem key={cur.id} {...cur} />
      ))}
    </MdxAboutLinksWrapper>
  );
};
