import React, { FC, useMemo } from 'react';
import { useRouter } from 'next/router';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';
import { motion } from 'framer-motion';
import { MdxStaggerContainerType } from './types';
import { MdxStaggerWrapper } from './styles';
import { hideContentScrollBar, showContentScrollBar } from './utils';

export const MdxStaggerContainer: FC<MdxStaggerContainerType> = ({
  stagger = 0.1,
  hideScrollBar,
  stretch,
  style,
  children,
}) => {
  const router = useRouter();
  const staggerVariant = useMemo(
    () => ({
      animate: {
        transition: {
          staggerChildren: stagger,
        },
      },
    }),
    [stagger]
  );

  // useLayoutEffect for ssr
  useIsomorphicLayoutEffect(() => {
    const onRouteChangeStart = () => {
      hideContentScrollBar();
    };
    if (hideScrollBar) {
      router.events.on('routeChangeStart', onRouteChangeStart); // hide scrollBar on navigate from cur page
      hideContentScrollBar(); // hide scrollBar on navigate to cur page
      return () => {
        void router.events.off('routeChangeStart', onRouteChangeStart);
      };
    } else {
      // if scrollBar for navigated from page is hidden, and for navigated to page is shown
      // show it on first paint
      showContentScrollBar();
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (stretch) {
      const article = document.querySelector('article');
      if (article) {
        article.style.height = '100%';
        article.style.width = '100%';
      }
    }
  });

  const onAnimationComplete = (definition: string) => {
    if (definition === 'animate') {
      showContentScrollBar();
    }
  };

  return (
    <MdxStaggerWrapper
      as={motion.div}
      variants={staggerVariant}
      style={style}
      onAnimationComplete={onAnimationComplete}
      stretch={stretch}
    >
      {children}
    </MdxStaggerWrapper>
  );
};
