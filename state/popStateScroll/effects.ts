import { AtomEffect } from 'recoil';
import { Router } from 'next/router';
import { offBeforePopState, onBeforePopState } from 'utils/beforePopStateChain';
import { getElemByDataId } from 'utils/getElemByDataId';
import { popStateScrollInitialValue } from './atom';
import { PopStateScrollType } from './type';

export const popStateScrollEffect: AtomEffect<PopStateScrollType> = ({ setSelf }) => {
  // ssr
  if (typeof document !== 'object') {
    return;
  }

  const scrollPositions = <Array<number>>[];
  let lastIdx = 0;
  let popsStateWasOccured = popStateScrollInitialValue.popStateOccured;
  let resetPopStateOccured = popStateScrollInitialValue.popStateOccured;

  const regPageScroll = (idx: number) => {
    const contentWrapper = getElemByDataId('content-wrapper');
    if (contentWrapper) {
      if (idx >= scrollPositions.length) {
        // new route
        scrollPositions.push(contentWrapper.scrollTop);
      } else {
        // old route (retrieve by history.forward)
        scrollPositions[idx] = contentWrapper.scrollTop;
      }
    }
    // console.log('scrollPositions', scrollPositions);
  };

  // callback order on popstate event:
  // 1. onPopState
  // 2. onRouteChangeStart
  // 3. onRouteChangeComplete
  // set popStateOccuredRef to true, then on the next nopopstate onRouteChangeStart set it back to false

  const onPopState = () => {
    // console.log('onPopState idx', history.state.idx);
    setSelf(
      (curState) =>
        ({
          ...curState,
          popStateOccured: true,
          contentScrollTop: scrollPositions[history.state.idx],
        } as PopStateScrollType)
    );
    popsStateWasOccured = true;
    return true;
  };

  const onRouteChangeStart = () => {
    // console.log('onRouteChangeStart lastIdx', lastIdx);

    // no popstate occured, reset
    if (!popsStateWasOccured && resetPopStateOccured) {
      resetPopStateOccured = false;
      setSelf(
        (curState) => ({ ...curState, popStateOccured: false } as PopStateScrollType)
      );
    }

    // change on next no popstate route
    if (popsStateWasOccured) {
      popsStateWasOccured = false;
      resetPopStateOccured = true;
    }

    setSelf((curState) => ({ ...curState, isReady: false } as PopStateScrollType));
    regPageScroll(lastIdx);
  };

  const onRouteChangeComplete = () => {
    // console.log('onRouteChangeComplete');
    lastIdx = history.state.idx;
    setSelf((curState) => ({ ...curState, isReady: true } as PopStateScrollType));
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
};
