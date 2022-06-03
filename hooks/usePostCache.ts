import { useEffect } from 'react';
import Router from 'next/router';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface CachedPostType {
  cachedPost: MDXRemoteSerializeResult<Record<string, unknown>>;
  cachedDate: string;
}

const postsCache = new Map();

export const getPostCache = (key: string): CachedPostType => {
  return postsCache.get(key);
};

export const setPostCache = (key: string, post: CachedPostType) => {
  postsCache.set(key, post);
};

export const usePostCache = (updateCache: () => void) => {
  useEffect(() => {
    const onRouteChangeComplete = (route: string) => {
      updateCache();
    };

    Router.events.on('routeChangeComplete', onRouteChangeComplete);
    return () => {
      Router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [updateCache]);
};
