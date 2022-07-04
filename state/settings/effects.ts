import { AtomEffect } from 'recoil';
import { SettingsType, ThemeType } from './types';

export const settingsEffect: AtomEffect<SettingsType> = ({ onSet, setSelf }) => {
  // ssr
  if (typeof document !== 'object') {
    return;
  }

  const storage = window.localStorage;

  setSelf(() => ({
    theme: (storage.getItem('theme') as ThemeType) ?? ThemeType.System,
    isAnimationsEnabled: (storage.getItem('isAnimationsEnabled') ?? 'true') === 'true',
    isLevelIndicatorVisible:
      (storage.getItem('isLevelIndicatorVisible') ?? 'false') === 'true',
  }));

  onSet((settings) => {
    storage.setItem('theme', settings.theme);
    storage.setItem('isAnimationsEnabled', settings.isAnimationsEnabled + '');
    storage.setItem('isLevelIndicatorVisible', settings.isLevelIndicatorVisible + '');
  });
};
