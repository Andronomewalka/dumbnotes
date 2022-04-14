import React, { FC } from 'react';
import Image from 'next/image';
import { MdxImageType } from './types';

export const MdxImage: FC<MdxImageType> = ({ src, width, height, alt }) => {
  return <Image src={src} width={width} height={height} alt={alt} />;
};
