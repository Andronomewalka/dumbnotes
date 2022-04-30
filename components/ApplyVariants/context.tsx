import React, { FC, useState, useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import useMediaQuery from 'hooks/useMediaQuery';
import { device } from 'utils/media';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';

const ApplyVariantsContext = React.createContext<boolean>(false);

export const useApplyVariants = () => {
  return useContext(ApplyVariantsContext);
};

// mobile routing from Nav occurs flickering for some reasons
// also it occurs on history.back and history.forward on mobile
export const ApplyVariantsProvider: FC = ({ children }) => {
  const router = useRouter();
  const isMobile = useMediaQuery(device.mobile);
  const [applyStagger, setApplyStagger] = useState(true);

  const isSystemNavigation = useRef(false);

  useIsomorphicLayoutEffect(() => {
    router.beforePopState(() => {
      isSystemNavigation.current = true;
      return true;
    });
  }, [router]);

  useEffect(() => {
    const onRouteChange = () => {
      if (isMobile && isSystemNavigation.current) {
        setApplyStagger(false);
        isSystemNavigation.current = false;
      } else if (isMobile && !router.query.reference) {
        setApplyStagger(false);
      } else {
        setApplyStagger(true);
      }
    };
    router.events.on('routeChangeStart', onRouteChange);
    onRouteChange();
    return () => {
      void router.events.off('routeChangeStart', onRouteChange);
    };
  }, [isMobile, router.events, router.query.reference]);

  return (
    <ApplyVariantsContext.Provider value={applyStagger}>
      {children}
    </ApplyVariantsContext.Provider>
  );
};
