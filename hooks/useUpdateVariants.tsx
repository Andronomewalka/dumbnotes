import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { settingsAnimationsState, variantsState } from 'state';
import { noVariants } from 'utils/staggerVariants';

export const useUpdateVariants = () => {
  const isAnimationsEnabled = useRecoilValue(settingsAnimationsState);
  const setVariants = useSetRecoilState(variantsState);

  const updateVariants = useCallback(
    (variants) => {
      setVariants(isAnimationsEnabled ? variants : noVariants);
    },
    [setVariants, isAnimationsEnabled]
  );

  return updateVariants;
};
