import React, { FC, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';
import { AnimationProps } from 'framer-motion';
import { VairantsContextType } from './types';
import { staggerVariant } from 'utils/staggerVariant';
import { getRawIsMobile } from 'utils/getRawIsMobile';

const initValue: VairantsContextType = {
  variants: staggerVariant,
  setVariants: () => {},
};

const VariantsContext = React.createContext<VairantsContextType>(initValue);

export const useVariants = () => {
  return useContext(VariantsContext);
};

// MdxStaggerBlock (and some others) variants value
export const VariantsProvider: FC = ({ children }) => {
  const router = useRouter();
  const [variants, setVariants] = useState<AnimationProps['variants']>(
    initValue.variants
  );

  useIsomorphicLayoutEffect(() => {
    router.beforePopState(() => {
      // routing by history.back and history.forward history.back also
      // occurs flickering for some reasons, disable variants before navigating
      const mobile = getRawIsMobile();
      setVariants(mobile ? {} : staggerVariant);
      return true;
    });
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
