import React, { FC, useState, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';
import { PopStateScrollContextType } from './types';
import { getElemByDataId } from 'utils/getElemByDataId';

const initValue: PopStateScrollContextType = {
  popStateOccured: false,
  contentScrollTop: 0,
};

const PopStateScrollContext = React.createContext<PopStateScrollContextType>(initValue);

export const usePopStateScroll = () => {
  return useContext(PopStateScrollContext);
};

// remembers scroll on each route by idx, then set it in MdxArticle when popstate event is occured.
export const PopStateScrollProvider: FC = ({ children }) => {
  const router = useRouter();
  const [popStateOccured, setPopStateOccured] = useState(initValue.popStateOccured);
  const [contentScrollTop, setContentScrollTop] = useState(0);

  const scrollPositions = useRef<Array<number>>([]);
  const curIdx = useRef(0);
  const lastIdx = useRef(0);

  useIsomorphicLayoutEffect(() => {
    const regPageScroll = (idx: number) => {
      const contentWrapper = getElemByDataId('content-wrapper');
      if (contentWrapper) {
        if (idx >= scrollPositions.current.length) {
          // new route
          scrollPositions.current.push(contentWrapper.scrollTop);
        } else {
          // old route (retrieve by history.forward)
          scrollPositions.current[idx] = contentWrapper.scrollTop;
        }
      }
    };

    // callback order on popstate event:
    // 1. onRouteChangeStart
    // 2. onPopState
    // 3. onRouteChangeComplete
    // set isPopStateOccured to true, then on the next onRouteChangeStart set it back to false

    const onRouteChangeStart = () => {
      // reset on next route change start
      if (popStateOccured) {
        setPopStateOccured(false);
      }
      regPageScroll(lastIdx.current);
    };

    const onRouteChangeComplete = () => {
      curIdx.current = history.state.idx;
      setContentScrollTop(scrollPositions.current[curIdx.current]);
      lastIdx.current = curIdx.current;
    };

    history.scrollRestoration = 'manual';
    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', onRouteChangeComplete);
    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [popStateOccured, router.events]);

  useIsomorphicLayoutEffect(() => {
    const onPopState = () => {
      setPopStateOccured(true);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <PopStateScrollContext.Provider
      value={{
        popStateOccured,
        contentScrollTop,
      }}
    >
      {children}
    </PopStateScrollContext.Provider>
  );
};
