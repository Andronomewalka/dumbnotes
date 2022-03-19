export interface Response<T> {
  data: T;
  error: string;
}

export interface NameObjectType {
  name: string;
  path: string;
}

export interface DriveItemBaseType {
  id: string;
  name: string;
}

export interface DriveItemType extends DriveItemBaseType {
  path: string;
  content: string;
}

export type DriveItemPathIdType = Omit<DriveItemType, 'name' | 'content'>;
