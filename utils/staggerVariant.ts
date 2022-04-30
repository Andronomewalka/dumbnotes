export const staggerVariant = {
  initial: (applyVariants: boolean) => ({
    y: applyVariants ? 30 : 0,
    opacity: applyVariants ? 0 : 1,
  }),
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: (applyVariants: boolean) => ({
    y: applyVariants ? 30 : 0,
    opacity: applyVariants ? 0 : 1,
    transition: {
      duration: 0.3,
    },
  }),
};
