import React, { FC, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

const SystemNavigationContext = React.createContext<boolean>(false);

export const useSystemNavigation = () => {
  return useContext(SystemNavigationContext);
};

// write to systemNavigationOccured if history.back or history.forward occured
export const SystemNavigationProvider: FC = ({ children }) => {
  const router = useRouter();
  const [isOccured, setIsOccured] = useState(false);

  useEffect(() => {
    router.beforePopState(() => {
      setIsOccured(true);
      return true;
    });
  }, [router]);

  useEffect(() => {
    const onRouteChangeComplete = () => {
      setTimeout(() => {
        setIsOccured(false);
      }, 1000);
    };
    router.events.on('routeChangeComplete', onRouteChangeComplete);
    return () => {
      void router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <SystemNavigationContext.Provider value={isOccured}>
      {children}
    </SystemNavigationContext.Provider>
  );
};
