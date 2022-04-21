import { useEffect, useRef } from 'react';

export const useDebounce = (callback: () => void, value: any, delay: number) => {
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, callback]);
};
