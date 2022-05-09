import React, { FC, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import useSWR from 'swr';
import { SearchBarInput } from './SearchBarInput';
import { SearchBarResults } from './SearchBarResults';
import { SearchBarWrapper } from './styles';
import { PostType } from './types';
import { removePostIfExist } from './utils';

export const SearchBar: FC = () => {
  const router = useRouter();
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('');
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const { data: payload } = useSWR(
    filter && filter.length > 1 ? `/posts?filter=${filter}&exclude=["content"]` : null
  );

  const onSubmit = (input: string) => {
    setFilter(input);
    setIsResultsOpen(input?.length > 1);
  };

  useEffect(() => {
    setIsResultsOpen(false);
  }, [router.asPath]);

  let itemsResult: Array<Partial<PostType>> = [];

  if (Array.isArray(payload?.data)) {
    itemsResult = [...payload.data];
    removePostIfExist(itemsResult, 'home');
    removePostIfExist(itemsResult, 'about');
  }

  return (
    <SearchBarWrapper
      ref={searchWrapperRef}
      as={motion.header}
      onBlur={() => setIsResultsOpen(false)}
      onFocus={() => setIsResultsOpen(!!filter)}
    >
      <SearchBarInput onSubmit={onSubmit} />
      <AnimatePresence>
        {isResultsOpen && (
          <SearchBarResults key='search-bar-results' itemsRaw={itemsResult} />
        )}
      </AnimatePresence>
    </SearchBarWrapper>
  );
};
