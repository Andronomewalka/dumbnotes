import { atom } from 'recoil';
import { settingsEffect } from './effects';
import { ThemeType, SettingsType } from './types';

export const settingsStateInitialValue: SettingsType = {
  theme: ThemeType.System,
  isAnimationsEnabled: true,
  isLevelIndicatorVisible: false
};

export const settingsState = atom<SettingsType>({
  key: 'settingsState',
  default: settingsStateInitialValue,
  effects: [settingsEffect]
});
