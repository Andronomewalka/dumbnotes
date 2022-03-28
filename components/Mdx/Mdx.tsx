import React, { FC, useState, useEffect } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import useSWR from 'swr';
import { MdxPlainCard } from './MdxPlainCard';
import { MdxLink } from './MdxLink';
import { MdxType } from './types';
import { MdxWrapper } from './styles';

const components = {
  MdxPlainCard,
  MdxLink,
};

export const Mdx: FC<MdxType> = ({ url, prefetchedData }) => {
  const { data: response } = useSWR(url);
  const [swrData, setSwrData] = useState<any>();

  useEffect(() => {
    if (response?.data?.content) {
      serialize(response.data.content).then((newData) => {
        setSwrData(newData);
      });
    }
    return () => {
      setSwrData(null);
    };
  }, [response]);

  return (
    <MdxWrapper>
      <MDXRemote {...(swrData ? swrData : prefetchedData)} components={components} />
    </MdxWrapper>
  );
};
