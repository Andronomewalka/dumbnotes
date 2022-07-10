import React, { FC, useMemo, useState } from 'react';
import { useTheme } from 'styled-components';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { settingsThemeState, ThemeType } from 'state';
import { DarkThemeIcon, LightThemeIcon, SystemThemeIcon } from './icons';
import {
  ThemeSelectorLi,
  ThemeSelectorLiContent,
  ThemeSelectorLiHover,
  ThemeSelectorUl,
} from './styles';
import { ThemeSelectorItem } from './types';

export const ThemeSelector: FC = () => {
  const styledTheme = useTheme();
  const [theme, setTheme] = useRecoilState(settingsThemeState);
  const [hovered, setHovered] = useState<ThemeSelectorItem>();

  const onThemeClick = (theme: ThemeType) => {
    setTheme(theme);
  };

  const themeItems = useMemo(
    () => [
      {
        id: 0,
        theme: ThemeType.Dark,
        icon: DarkThemeIcon(styledTheme.palette.staticDark),
      },
      {
        id: 1,
        theme: ThemeType.System,
        icon: SystemThemeIcon(styledTheme.palette.staticDark),
      },
      {
        id: 2,
        theme: ThemeType.Light,
        icon: LightThemeIcon(styledTheme.palette.staticDark),
      },
    ],
    [styledTheme.palette.staticDark]
  );

  return (
    <ThemeSelectorUl as={motion.ul} layout onMouseLeave={() => setHovered(undefined)}>
      {themeItems.map((cur) => (
        <ThemeSelectorLi
          key={cur.id}
          onMouseEnter={() => setHovered(cur)}
          onFocus={() => setHovered(cur)}
          onClick={() => onThemeClick(cur.theme)}
        >
          {cur === hovered && (
            <ThemeSelectorLiHover
              as={motion.div}
              transition={{
                layout: {
                  duration: 0.1,
                  ease: 'easeOut',
                },
              }}
              layoutId='hover'
            />
          )}
          <ThemeSelectorLiContent isSelected={cur.theme === theme}>
            {cur.theme}
            {cur.icon}
          </ThemeSelectorLiContent>
        </ThemeSelectorLi>
      ))}
    </ThemeSelectorUl>
  );
};
