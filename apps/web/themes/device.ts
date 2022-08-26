const breakpointsInPcs = {
  mobile: 0,
  xs: 0,
  tablet: 768,
  sm: 768,
  laptop: 1024,
  md: 1024,
  desktop: 1440,
  lg: 1440,
  large: 1920,
  xl: 1920,
};

const breakpointsString = {
  tablet: `${breakpointsInPcs.tablet}px`,
  laptop: `${breakpointsInPcs.laptop}px`,
  desktop: `${breakpointsInPcs.desktop}px`,
  large: `${breakpointsInPcs.large}px`,
};

const device = {
  mobile: `(max-width: ${breakpointsString.tablet})`,
  tablet: `(max-width: ${breakpointsString.laptop})`,
  laptop: `(max-width: ${breakpointsString.desktop})`,
  desktop: `(max-width: ${breakpointsString.large})`,
};

export { breakpointsInPcs, device };
