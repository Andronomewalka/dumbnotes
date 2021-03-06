export interface PostBaseType {
  id: string;
  name: string;
  path: string;
}

export interface PostType extends PostBaseType {
  content: string;
  date: string;
}

export interface SearchBarInputType {
  onSubmit(input: string): void;
}

export interface SearchBarResultsType {
  itemsRaw: Partial<PostType>[];
}
