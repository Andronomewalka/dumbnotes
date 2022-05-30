import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { variantsState } from 'state';
import { staggerVariants } from 'utils/staggerVariants';
import {
  SearchBarResultsContainer,
  SearchBarResultsLi,
  SearchBarResultsLiHover,
  SearchBarResultsUl,
} from './styles';
import { PostType, SearchBarResultsType } from './types';

const containerVariants = {
  hide: {
    x: '-50%',
    y: 30,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  show: {
    x: '-50%',
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const itemVariants = {
  hide: {
    y: 30,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
  },
};

export const SearchBarResults: FC<SearchBarResultsType> = ({ itemsRaw }) => {
  const router = useRouter();
  const setVariants = useSetRecoilState(variantsState);
  const [hovered, setHovered] = useState<Partial<PostType>>();

  const onRouteClick = (url: string) => {
    setVariants(staggerVariants);
    router.push(url);
  };

  return (
    <SearchBarResultsContainer
      as={motion.div}
      initial='hide'
      animate='show'
      exit='hide'
      variants={containerVariants}
    >
      <SearchBarResultsUl as={motion.ul} layout>
        {itemsRaw.length > 0 ? (
          itemsRaw.map((cur, i) => (
            <SearchBarResultsLi
              key={cur.id}
              as={motion.li}
              layout
              initial='hide'
              animate='show'
              variants={itemVariants}
              onMouseEnter={() => setHovered(cur)}
              onFocus={() => setHovered(cur)}
            >
              <a
                tabIndex={0}
                onClick={() => onRouteClick(cur.path!)}
                onKeyPress={(event) => {
                  if (event.code === 'Enter') {
                    onRouteClick(cur.path!);
                  }
                }}
              >
                {cur.name}
              </a>
              {cur === hovered && (
                <SearchBarResultsLiHover
                  as={motion.div}
                  transition={{
                    layout: {
                      duration: 0.1,
                      ease: 'easeOut',
                    },
                  }}
                  layoutId='hover'
                />
              )}
            </SearchBarResultsLi>
          ))
        ) : (
          <SearchBarResultsLi
            as={motion.li}
            layout
            initial='hide'
            animate='show'
            variants={itemVariants}
          >
            Nothing found
          </SearchBarResultsLi>
        )}
      </SearchBarResultsUl>
    </SearchBarResultsContainer>
  );
};
