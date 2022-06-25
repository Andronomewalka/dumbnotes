import React, { FC, useState, useEffect } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import useSWR from "swr";
import rehypeHighlight from "rehype-highlight";
import { client } from "utils/client";
import { getPostCache, setPostCache, usePostCache } from "hooks/usePostCache";
import {
  MdxArticle,
  MdxImage,
  MdxInfo,
  MdxLink,
  MdxSection,
  MdxSourceLink,
  MdxSources,
  MdxSubtitle,
  MdxTitle,
  MdxToggle,
} from "components/MdxShared";
import {
  MdxAbout,
  MdxAboutDisclaimer,
  MdxAboutInfo,
  MdxAboutLinks,
} from "components/MdxAbout";
import { MdxHome } from "components/MdxHome";
import { MdxSettings } from "components/MdxSettings";
import { MdxType } from "./types";

const components = {
  MdxArticle,
  MdxImage,
  MdxInfo,
  MdxLink,
  MdxSection,
  MdxSourceLink,
  MdxSources,
  MdxSubtitle,
  MdxTitle,
  MdxToggle,
  MdxAbout,
  MdxAboutDisclaimer,
  MdxAboutInfo,
  MdxAboutLinks,
  MdxHome,
  MdxSettings,
};

/*
  Cache strategy: 
  1. Show prefetchedData (created at build time by SSG or runtime ISR) on the first time of each post
  2. Add prefetchedData to cache, if it isn't already there
  3. If lastUpdated has changed create updateCacheCallback
  4. Run that callback on the next routeChangeComplete to not bother the user
  5. Show cached post on the next navigation to the post
*/

export const Mdx: FC<MdxType> = ({ url, prefetchedPost, prefetchedDate }) => {
  const { data: response } = useSWR(`${url}?exclude=["name","content","path"]`);

  const [updateCacheCallback, setUpdateCacheCallback] = useState<() => void>(
    () => () => {}
  );

  usePostCache(updateCacheCallback);

  const cachedPost = getPostCache(url);
  if (!cachedPost) {
    setPostCache(url, {
      cachedPost: prefetchedPost,
      cachedDate: prefetchedDate,
    });
  }
  const [lastUpdated, setLastUpdated] = useState(
    cachedPost?.cachedDate ?? prefetchedDate
  );

  const post = (cachedPost?.cachedPost ?? prefetchedPost) as any;

  useEffect(() => {
    const reponseDate = response?.data?.date;
    if (reponseDate && reponseDate !== lastUpdated) {
      setUpdateCacheCallback(() => async () => {
        try {
          const response = await client.get(url);
          const payload = response.data;
          const sourceRaw = payload.data.content;
          const newDate = payload.data.date;
          const mdxSource = await serialize(sourceRaw, {
            mdxOptions: { rehypePlugins: [rehypeHighlight] },
          });
          setPostCache(url, {
            cachedPost: mdxSource,
            cachedDate: newDate,
          });
        } catch {}
      });

      setLastUpdated(reponseDate);
    }
  }, [lastUpdated, response?.data?.date, url]);

  return <MDXRemote {...post} components={components} />;
};
