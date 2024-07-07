export interface IShareStore {
  friends: any[];
  shareImages: any[];
  error: any;
  isLoading: boolean;
  getFriendsEpic: () => void;
  getShareItemEpic: (friendId: string) => void;
}
