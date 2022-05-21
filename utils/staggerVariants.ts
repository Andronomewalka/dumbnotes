const visible = {
  y: 0,
  opacity: 1,
};

export const staggerVariants = {
  initial: {
    y: 30,
    opacity: 0,
  },
  animate: {
    ...visible,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    y: 30,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const noVariants = {
  initial: visible,
  animate: visible,
  exit: visible,
};
