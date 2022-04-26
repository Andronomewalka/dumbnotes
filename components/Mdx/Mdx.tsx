import React, { FC, useState, useEffect } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import useSWR from 'swr';
import rehypeHighlight from 'rehype-highlight';
import {
  MdxImage,
  MdxInfo,
  MdxLink,
  MdxSources,
  MdxStaggerBlock,
  MdxStaggerContainer,
  MdxSubtitle,
} from 'components/MdxShared';
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
  MdxStaggerBlock,
  MdxSubtitle,
  MdxInfo,
  MdxHome,
  MdxAbout,
  MdxAboutInfo,
  MdxAboutDisclaimer,
  MdxAboutLinks,
  MdxLink,
  MdxImage,
  MdxSources,
};

export const Mdx: FC<MdxType> = ({ url, prefetchedData }) => {
  const { data: response } = useSWR(url);
  const [swrData, setSwrData] = useState<any>();

  useEffect(() => {
    if (response?.data?.content) {
      serialize(response.data.content, {
        mdxOptions: { rehypePlugins: [rehypeHighlight] },
      }).then((newData) => {
        setSwrData(newData);
      });
    }
    return () => {
      setSwrData(null);
    };
  }, [response]);

  return <MDXRemote {...(swrData ? swrData : prefetchedData)} components={components} />;
};
