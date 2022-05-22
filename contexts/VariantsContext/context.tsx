import React, { FC, useState, useContext } from 'react';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';
import { AnimationProps } from 'framer-motion';
import { VairantsContextType } from './types';
import { noVariants, staggerVariants } from 'utils/staggerVariants';
import { offBeforePopState, onBeforePopState } from 'utils/beforePopStateChain';

const initValue: VairantsContextType = {
  variants: staggerVariants,
  setVariants: () => {},
};

const VariantsContext = React.createContext<VairantsContextType>(initValue);

export const useVariants = () => {
  return useContext(VariantsContext);
};

// MdxSection (and some others) variants value
export const VariantsProvider: FC = ({ children }) => {
  const [variants, setVariants] = useState<AnimationProps['variants']>(
    initValue.variants
  );

  useIsomorphicLayoutEffect(() => {
    // routing by history.back and history.forward also occurs flickering
    // for some reasons, disable variants before navigating
    const onPopState = () => {
      setVariants(noVariants);
      return true;
    };

    onBeforePopState(onPopState);
    return () => offBeforePopState(onPopState);
  }, []);

  return (
    <VariantsContext.Provider
      value={{
        variants,
        setVariants,
      }}
    >
      {children}
    </VariantsContext.Provider>
  );
};
