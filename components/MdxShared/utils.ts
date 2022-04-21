import { getElemByDataId } from 'utils/getElemByDataId';

export const hideContentScrollBar = () => {
  const contentWrapper = getElemByDataId('content-wrapper');
  if (contentWrapper) {
    contentWrapper.style.overflowY = 'hidden';
  }
};

export const showContentScrollBar = () => {
  const contentWrapper = getElemByDataId('content-wrapper');
  if (contentWrapper) {
    contentWrapper.style.overflowY = '';
  }
};
