import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';
import { getElemByDataId } from 'utils/getElemByDataId';
import { staggerContainerVariants } from 'utils/staggerContainerVariants';
import { MdxArticleType } from './types';
import { MdxArticleWrapper } from './styles';
import { hideContentScrollBar, showContentScrollBar } from './utils';
import { staggerVariants } from 'utils/staggerVariants';

export const MdxArticle: FC<MdxArticleType> = ({
  hideScrollBar,
  stretch,
  style,
  children,
}) => {
  const router = useRouter();

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

  const onAnimationStart = (stage: string) => {
    if (stage === 'animate') {
      const hasAnchor = router.asPath.includes('#');
      const contentWrapper = getElemByDataId('content-wrapper');
      if (contentWrapper && !hasAnchor) {
        contentWrapper.scrollTop = 0;
      } else if (hasAnchor) {
        const anchor = router.asPath.substring(router.asPath.indexOf('#') + 1);
        if (anchor) {
          const anchorElem = document.querySelector(`a[href$="${anchor}"]`);
          anchorElem?.parentElement?.scrollIntoView({
            behavior: 'auto',
            block: 'start',
          });
          contentWrapper.scrollTop -= staggerVariants.initial.y; // scrollIntoView respects translateY, which is 'y' on animation start
        }
      }
    }
  };

  const onAnimationComplete = (stage: string) => {
    if (stage === 'animate') {
      showContentScrollBar();
    }
  };

  return (
    <MdxArticleWrapper
      as={motion.article}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={staggerContainerVariants}
      style={style}
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
      $stretch={stretch ?? false}
    >
      {children}
    </MdxArticleWrapper>
  );
};
