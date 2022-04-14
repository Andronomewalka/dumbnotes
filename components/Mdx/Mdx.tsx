import React, { FC, useState, useEffect } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import useSWR from 'swr';
import { MdxImage, MdxLink, MdxStaggerContainer } from 'components/MdxShared';
import {
  MdxAbout,
  MdxAboutDisclaimer,
  MdxAboutInfo,
  MdxAboutLinks,
} from 'components/MdxAbout';
import { MdxType } from './types';
import { MdxHome } from 'components/MdxHome';

const components = {
  MdxStaggerContainer,
  MdxHome,
  MdxAbout,
  MdxAboutInfo,
  MdxAboutDisclaimer,
  MdxAboutLinks,
  MdxLink,
  MdxImage,
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

  return <MDXRemote {...(swrData ? swrData : prefetchedData)} components={components} />;
};
