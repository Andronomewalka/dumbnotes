import { useState } from 'react';
import { useRouter } from 'next/router';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';
import { useSystemNavigation } from 'components/SystemNavigation';
import { device } from 'utils/media';
import useMediaQuery from './useMediaQuery';

// mobile routing from Nav occurs flickering for some reasons
// also it occurs on history.back and history.forward on mobile
export const useStaggerAnimation = () => {
  const router = useRouter();
  const isMobile = useMediaQuery(device.mobile);
  const [applyStagger, setApplyStagger] = useState(true);
  const isSystemNavigationOccured = useSystemNavigation();

  useIsomorphicLayoutEffect(() => {
    if (isMobile && isSystemNavigationOccured) {
      setApplyStagger(false);
    } else if (isMobile && !router.query.reference) {
      setApplyStagger(false);
    } else {
      setApplyStagger(true);
    }
  }, [isMobile, router, isSystemNavigationOccured]);

  return applyStagger;
};
