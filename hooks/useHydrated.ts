import { useState, useRef } from 'react';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';

// virtual dom should be the same during hydration
export const useHydrated = <T>(value: T) => {
  const [clientValue, setClientValue] = useState<T>();
  const serverValue = useRef<T>();

  // ssr
  if (typeof window === undefined) {
    serverValue.current = value;
  }

  useIsomorphicLayoutEffect(() => {
    setClientValue(value);
  }, [value]);

  return clientValue || serverValue.current;
};
