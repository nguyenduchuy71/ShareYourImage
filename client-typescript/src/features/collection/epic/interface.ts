interface IItem {
  bucket: string;
  cacheControl?: any;
  contentDisposition?: any;
  contentEncoding: string;
  contentLanguage?: any;
  contentType: string;
  customMetadata?: any;
  fullPath: string;
  generation: string;
  md5Hash?: string;
  metageneration?: string;
  name: string;
  size: Number;
  srcImage: string;
  timeCreated: string;
  type: string;
  updated: string;
}

export interface ICollectionStore {
  collections: IItem[];
  isLoading: boolean;
  error: any;
  getCollectionEpic: () => void;
  uploadCollectionEpic: (userUpdate: any) => void;
  deteleCollectionEpic: (imageId: string) => void;
  shareImageEpic: (item: any, friendId: string) => void;
}
