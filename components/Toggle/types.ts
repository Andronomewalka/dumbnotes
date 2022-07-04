export interface ToggleType {
    checked: boolean;
    label: string;
    onToggle(checked: boolean): void;
}