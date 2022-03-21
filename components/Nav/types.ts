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
  onClick?(node: NavNodeType): void;
  subItems?: NavNodeType[];
}

export type NavItemStyleType = Pick<NavNodeType, 'isOpen' | 'isSelected' | 'level'> & {
  hasSubItems: boolean;
};

export interface NavContextType {
  navItems: NavNodeBaseType[];
  setNavItems(items: NavNodeBaseType[]): void;
}
