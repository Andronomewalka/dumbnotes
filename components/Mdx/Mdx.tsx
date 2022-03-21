import React, { FC, useState, useEffect, useRef } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import useSWR from 'swr';
import { MdxType } from './types';
import { serializeMdx } from './utility';

export const Mdx: FC<MdxType> = ({ getUrl }) => {
  const { data } = useSWR(getUrl);
  const [swrData, setSwrData] = useState<any>();
  const isSwrDataReady = useRef(false);
  const preRenderData = useRef();

  if (!preRenderData.current) {
    preRenderData.current = { ...data };
  }

  useEffect(() => {
    (async () => {
      if (data?.data?.content) {
        const newData = await serializeMdx(data.data.content);
        setSwrData(newData);
        isSwrDataReady.current = true;
      }
    })();
  }, [data]);

  return <MDXRemote {...(isSwrDataReady.current ? swrData : preRenderData.current)} />;
};
