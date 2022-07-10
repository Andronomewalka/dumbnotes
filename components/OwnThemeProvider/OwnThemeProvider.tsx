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
    if (selectedTheme === ThemeType.Light || selectedTheme === ThemeType.System) {
      setTheme(lightTheme);
    } else if (selectedTheme === ThemeType.Dark) {
      setTheme(darkTheme);
    }
  }, [selectedTheme]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
