import { useState, useEffect, useCallback } from 'react';
import { createMedia } from '@artsy/fresnel';

const untilIsMobileWidth = 768;
const untilIsTabletWidth = 1024;

export const mobile = untilIsMobileWidth + 1;
export const tablet = untilIsTabletWidth + 1;

const AppMedia = createMedia({
  breakpoints: {
    sm: 0,
    md: mobile,
    lg: tablet,
  },
});

export enum MediaType {
  None,
  Mobile,
  Tablet,
  Desktop,
}

// Generate CSS to be injected into the head
export const mediaStyle = AppMedia.createMediaStyle();
export const { Media, MediaContextProvider } = AppMedia;

export const useMedia = (): MediaType => {
  const [mediaType, setMediaType] = useState(MediaType.None);

  const deinfeMediaTypeHandler = useCallback((): MediaType => {
    if (window.innerWidth < mobile) {
      return MediaType.Mobile;
    } else if (window.innerWidth < tablet) {
      return MediaType.Tablet;
    }
    return MediaType.Desktop;
  }, []);

  useEffect(() => {
    setMediaType(deinfeMediaTypeHandler());
  }, [deinfeMediaTypeHandler]);

  return mediaType;
};
