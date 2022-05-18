export const mediaSize = {
  tabletBreakpoint: 450,
  laptopBreakpoint: 768,
};

export const device = {
  mobile: `(max-width: ${mediaSize.tabletBreakpoint}px)`,
  tablet: `(max-width: ${mediaSize.laptopBreakpoint}px)`,
  laptop: `(min-width: ${mediaSize.laptopBreakpoint + 1}px)`,
};
