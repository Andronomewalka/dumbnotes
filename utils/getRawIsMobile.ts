import { mediaSize } from './media';

// if need to get isMobile without hook
export const getRawIsMobile = () => {
  const main = document.querySelector('main');
  if (main) {
    return main.clientWidth <= mediaSize.laptopBreakpoint;
  }
};
