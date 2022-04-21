import React, { FC, useState } from 'react';
import Link from 'next/link';
import {
  SearchBarResultsContainer,
  SearchBarResultsLi,
  SearchBarResultsLiHover,
  SearchBarResultsNoItems,
  SearchBarResultsUl,
} from './styles';
import { PostType, SearchBarResultsType } from './types';
import { AnimatePresence, motion } from 'framer-motion';

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
  const [hovered, setHovered] = useState<PostType>();

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
            >
              <Link href={cur.path}>
                <a>{cur.name}</a>
              </Link>
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
