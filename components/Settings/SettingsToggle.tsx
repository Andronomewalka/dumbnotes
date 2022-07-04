import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { Toggle } from 'components/Toggle';
import { SettingsToggleType } from './types';

export const SettingsToggle: FC<SettingsToggleType> = ({ label, state }) => {
  const [value, setValue] = useRecoilState(state);
  return <Toggle checked={value} label={label} onToggle={(isOn) => setValue(isOn)} />;
};
