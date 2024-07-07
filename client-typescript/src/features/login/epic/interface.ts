export interface IAuthenStore {
  authInfo: any;
  authToken: string;
  loginEpic: (credentials: any) => void;
  signUpEpic: (credentials: any) => void;
  logoutEpic: () => void;
  getAuthenTokenEpic: () => void;
  getAuthenUserInfo: () => void;
}
