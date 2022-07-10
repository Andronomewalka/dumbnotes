import { DefaultValue, selector } from 'recoil';
import { settingsState, settingsStateInitialValue } from './atom';
import { ThemeType } from './types';

export const settingsThemeState = selector<ThemeType>({
  key: 'settingsThemeState',
  get: ({ get }) => get(settingsState).theme,
  set: ({ get, set }, newValue) =>
    set(
      settingsState,
      newValue instanceof DefaultValue
        ? settingsStateInitialValue
        : { ...get(settingsState), theme: newValue }
    ),
});

export const settingsAnimationsState = selector<boolean>({
  key: 'settingsAnimationsState',
  get: ({ get }) => get(settingsState).isAnimationsEnabled,
  set: ({ get, set }, newValue) =>
    set(
      settingsState,
      newValue instanceof DefaultValue
        ? settingsStateInitialValue
        : { ...get(settingsState), isAnimationsEnabled: newValue }
    ),
});

export const settingsLevelIndicatorState = selector<boolean>({
  key: 'settingsLevelIndicatorState',
  get: ({ get }) => get(settingsState).isLevelIndicatorVisible,
  set: ({ get, set }, newValue) =>
    set(
      settingsState,
      newValue instanceof DefaultValue
        ? settingsStateInitialValue
        : { ...get(settingsState), isLevelIndicatorVisible: newValue }
    ),
});
