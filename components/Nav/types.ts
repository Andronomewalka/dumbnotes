export interface NavNodeBaseType {
  id: string;
  name: string;
  path?: string;
  subItems?: NavNodeBaseType[];
}

export interface NavNodeType extends NavNodeBaseType {
  isOpen: boolean;
  isSelected: boolean;
  level: number;
  parent: NavNodeType | null;
  onClick?(node: NavNodeType): void;
  subItems?: NavNodeType[];
}

export type NavItemExpandableStyleType = Pick<NavNodeType, 'isOpen' | 'level'>;

export type NavItemLinkStyleType = Pick<NavNodeType, 'isSelected' | 'level'>;

export interface NavContextType {
  selected: NavNodeBaseType;
  setSelected(items: NavNodeBaseType): void;
}
