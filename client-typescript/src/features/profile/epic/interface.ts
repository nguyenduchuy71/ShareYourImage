export interface IUserUpdate {
  email: string;
  username?: string;
  bio?: string;
  avatar?: File;
}

export interface IUserInfo {
  email: string;
  userId: string;
}

export interface IProfileStore {
  userInfo: any;
  error: any;
  getUserEpic: () => void;
  updateUserInfoEpic: (userUpdate: IUserUpdate) => void;
}
