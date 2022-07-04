import { ThemeType } from "state";

export interface ThemeSelectorItem {
	id: number;
	theme: ThemeType;
  icon: JSX.Element;
}