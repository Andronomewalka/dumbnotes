import React, { FC } from 'react';
import { MdxStyleType } from 'components/MdxShared';
import { MdxSectionMotion } from './MdxSectionMotion';
import { SectionReadyProvider } from './context';

export const MdxSection: FC<MdxStyleType> = ({ style, children }) => {
  return (
    <SectionReadyProvider>
      <MdxSectionMotion style={style}>{children}</MdxSectionMotion>
    </SectionReadyProvider>
  );
};
