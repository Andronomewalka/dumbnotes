import React, { FC, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import useSWR from 'swr';
import { SearchBarInput } from './SearchBarInput';
import { SearchBarResults } from './SearchBarResults';
import { SearchBarWrapper } from './styles';
import { getElemByDataId } from 'utils/getElemByDataId';

export const SearchBar: FC = () => {
  const router = useRouter();
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('');
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const { data: payload } = useSWR(
    filter && filter.length > 1 ? `/posts?filter=${filter}` : null
  );

  const onSubmit = (input: string) => {
    setFilter(input);
    setIsResultsOpen(input?.length > 1);
  };

  useEffect(() => {
    let lastScrollTop = 0;
    const onScroll = (e: any) => {
      const curScrollTop = e.target.scrollTop;
      if (curScrollTop > lastScrollTop && searchWrapperRef.current) {
        searchWrapperRef.current.style.top = '-65px';
      } else if (searchWrapperRef.current) {
        searchWrapperRef.current.style.top = '0';
      }
      lastScrollTop = curScrollTop;
    };

    const contentWrapper = getElemByDataId('content-wrapper');
    if (contentWrapper && searchWrapperRef.current) {
      contentWrapper.addEventListener('scroll', onScroll, false);
      return () => void contentWrapper.removeEventListener('scroll', onScroll);
    }
  }, []);

  useEffect(() => {
    setIsResultsOpen(false);
  }, [router.asPath]);

  return (
    <SearchBarWrapper
      ref={searchWrapperRef}
      as={motion.div}
      onBlur={() => setIsResultsOpen(false)}
      onFocus={() => setIsResultsOpen(!!filter)}
    >
      <SearchBarInput onSubmit={onSubmit} />
      <AnimatePresence>
        {isResultsOpen && (
          <SearchBarResults key='search-bar-results' itemsRaw={payload?.data || []} />
        )}
      </AnimatePresence>
    </SearchBarWrapper>
  );
};
