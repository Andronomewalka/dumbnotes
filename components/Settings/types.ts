import { RecoilState } from 'recoil';

export interface SettingsToggleType {
  label: string;
  state: RecoilState<boolean>;
}
