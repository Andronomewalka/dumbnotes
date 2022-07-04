export enum ThemeType {
	Light = 'Light', Dark = 'Dark', System = 'System'
}

export interface SettingsType {
	theme: ThemeType;
	isAnimationsEnabled: boolean;
	isLevelIndicatorVisible: boolean;
}