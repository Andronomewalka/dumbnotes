export const staggerVariant = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    y: 60,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};
