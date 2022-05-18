import { mediaSize } from './media';

// if need to get isTablet without hook
export const getRawIsTablet = () => {
  const main = document.querySelector('main');
  if (main) {
    return main.clientWidth <= mediaSize.laptopBreakpoint;
  }
};
