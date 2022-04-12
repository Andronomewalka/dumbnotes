export interface NavNodeBaseType {
  id: string;
  name: string;
  path?: string;
  bottom?: boolean;
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

export interface NavContextType {
  selected: NavNodeBaseType;
  setSelected(items: NavNodeBaseType): void;
}
