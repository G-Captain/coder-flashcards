import { useState, useEffect } from 'react';

import throttle from 'lodash.throttle';
import { Device } from '../types/Device';

const getDeviceConfig = (width: number): Device => {
  if (width > 1920) {
    return 'large';
  }
  if (width > 1440 && width <= 1920) {
    return 'desktop';
  }
  if (width > 1024 && width <= 1440) {
    return 'laptop';
  }
  if (width > 768 && width <= 1024) {
    return 'tablet';
  }
  return 'mobile';
};

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(() =>
    typeof window === 'undefined'
      ? 'mobile'
      : getDeviceConfig(window.innerWidth)
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const calcInnerWidth = throttle(() => {
      setBreakpoint(getDeviceConfig(window.innerWidth));
    }, 200);
    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return breakpoint;
};
export default useBreakpoint;
