import React, { FC, useState } from 'react';
import { useRecoilValue } from 'recoil';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'GlobalStyle';
import { settingsThemeState, ThemeType } from 'state';

export const OwnThemeProvider: FC = ({ children }) => {
  const selectedTheme = useRecoilValue(settingsThemeState);
  const [theme, setTheme] = useState(lightTheme);

  useIsomorphicLayoutEffect(() => {
    if (selectedTheme === ThemeType.Light) {
      setTheme(lightTheme);
    } else if (selectedTheme === ThemeType.Dark) {
      setTheme(darkTheme);
    } else if (selectedTheme === ThemeType.System) {
      const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
      if (darkThemeMq.matches) {
        setTheme(darkTheme);
      } else {
        setTheme(lightTheme);
      }
    }
  }, [selectedTheme]);

  useIsomorphicLayoutEffect(() => {
    const darkThemeMqCallback = (e: MediaQueryListEvent) => {
      if (selectedTheme === ThemeType.System) {
        if (e.matches) {
          setTheme(darkTheme);
        } else {
          setTheme(lightTheme);
        }
      }
    };

    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    darkThemeMq.addEventListener('change', darkThemeMqCallback);
    return () => darkThemeMq.removeEventListener('change', darkThemeMqCallback);
  }, [selectedTheme]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
