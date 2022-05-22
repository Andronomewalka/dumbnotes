import React, { FC, useState, useContext, useRef } from 'react';
import Router, { useRouter } from 'next/router';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';
import { PopStateScrollContextType } from './types';
import { getElemByDataId } from 'utils/getElemByDataId';
import { offBeforePopState, onBeforePopState } from 'utils/beforePopStateChain';

const initValue: PopStateScrollContextType = {
  popStateOccured: false,
  contentScrollTop: 0,
  isReady: false,
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
  const [isReady, setIsReady] = useState(false);

  const scrollPositions = useRef<Array<number>>([]);
  const lastIdx = useRef(0);
  const popStateOccuredRef = useRef(popStateOccured);
  const resetPopStateOccuredRef = useRef(popStateOccured);

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
      // console.log('scrollPositions', scrollPositions.current);
    };

    // callback order on popstate event:
    // 1. onPopState
    // 2. onRouteChangeStart
    // 3. onRouteChangeComplete
    // set popStateOccuredRef to true, then on the next nopopstate onRouteChangeStart set it back to false

    const onRouteChangeStart = () => {
      // reset on next route change start
      // console.log('onRouteChangeStart lastIdx', lastIdx.current);

      if (!popStateOccuredRef.current && resetPopStateOccuredRef.current) {
        resetPopStateOccuredRef.current = false;
        setPopStateOccured(false);
      }

      // change on next nopopstate route
      if (popStateOccuredRef.current) {
        popStateOccuredRef.current = false;
        resetPopStateOccuredRef.current = true;
      }

      setIsReady(false);
      regPageScroll(lastIdx.current);
    };

    const onPopState = () => {
      // console.log('onPopState idx', history.state.idx);
      setPopStateOccured(true);
      setContentScrollTop(scrollPositions.current[history.state.idx]);
      popStateOccuredRef.current = true;
      return true;
    };

    const onRouteChangeComplete = () => {
      // console.log('onRouteChangeComplete');
      lastIdx.current = history.state.idx;
      setIsReady(true);
    };

    history.scrollRestoration = 'manual';
    onRouteChangeComplete();
    onBeforePopState(onPopState);
    Router.events.on('routeChangeStart', onRouteChangeStart);
    Router.events.on('routeChangeComplete', onRouteChangeComplete);
    return () => {
      offBeforePopState(onPopState);
      Router.events.off('routeChangeStart', onRouteChangeStart);
      Router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  return (
    <PopStateScrollContext.Provider
      value={{
        popStateOccured,
        contentScrollTop,
        isReady,
      }}
    >
      {children}
    </PopStateScrollContext.Provider>
  );
};
