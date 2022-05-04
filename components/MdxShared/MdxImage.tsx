import React, { FC } from 'react';
import Image from 'next/image';
import { MdxImageType } from './types';
import { MdxImageWrapper } from './styles';

export const MdxImage: FC<MdxImageType> = ({ src, width, height, stretch, alt }) => {
  return (
    <>
      {stretch ? (
        <MdxImageWrapper>
          <Image src={src} layout='fill' objectFit='contain' alt={alt} />
        </MdxImageWrapper>
      ) : (
        <Image src={src} width={width} height={height} alt={alt} />
      )}
    </>
  );
};
