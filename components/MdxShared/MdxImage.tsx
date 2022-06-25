import React, { FC } from 'react';
import Image from 'next/image';
import { MdxImageType } from './types';
import { MdxImageWrapper } from './styles';

export const MdxImage: FC<MdxImageType> = ({ style, src, width, height, stretch, alt }) => {
  return (
    <>
      {stretch ? (
        // if we don't know width and height aot
        <MdxImageWrapper style={style}>
          <Image src={src} layout='fill' objectFit='contain' alt={alt} />
        </MdxImageWrapper>
      ) : (
        <Image style={style} src={src} width={width} height={height} alt={alt} />
      )}
    </>
  );
};
