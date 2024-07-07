export interface IFriendStore {
  friends: any[];
  friendIds: string[];
  error: any;
  getUsersEpic: () => void;
  addFriendEpic: (friendId: string) => void;
  acceptFriendEpic: (friendId: string) => void;
}
