import { NavNodeBaseType } from 'blog-app-shared';

export interface NavNodeType extends NavNodeBaseType {
  isOpen: boolean;
  isSelected: boolean;
  level: number;
  parent: NavNodeType | null;
  onClick?(node: NavNodeType): void;
  subItems?: NavNodeType[];
}

export interface NavContextType {
  selected: NavNodeBaseType;
  setSelected(items: NavNodeBaseType): void;
}
