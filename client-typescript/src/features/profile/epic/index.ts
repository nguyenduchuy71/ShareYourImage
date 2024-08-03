import { create } from 'zustand';
import axios from 'axios';
import { configHeaders, handleErrorStatus } from '@/utils/helpers';
import { triggerNotify } from '@/utils/messages';
import { IProfileStore, IUserUpdate, IUserInfo } from './interface';
import { storage } from '@/firebase/config';
import { uploadFile } from '@/lib/utils';
import { messages } from './messages'

const BASEURL = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}`;

export const useProfileStore = create<IProfileStore>((set) => ({
  userInfo: {},
  error: null,
  getUserEpic: async () => {
    try {
      const accessToken = sessionStorage.getItem('auth');
      const headers = configHeaders(accessToken);
      const res = await axios.get(`${BASEURL}/users/profile/me`, { headers });
      if (res.status === 200) {
        set({ userInfo: res.data });
      }
    } catch (error) {
      handleErrorStatus(error);
    }
  },
  updateUserInfoEpic: async (userUpdate: IUserUpdate) => {
    try {
      const accessToken = sessionStorage.getItem('auth');
      const userInfo: IUserInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      const headers = configHeaders(accessToken);
      const pathUpload: string = `${userInfo.userId}/avatar/${userUpdate.avatar.name}`;
      const downloadURL = await uploadFile(userUpdate.avatar, pathUpload, storage);
      const userInfoUpdate = {
        email: userUpdate.email,
        username: userUpdate.username,
        bio: userUpdate.bio,
        avatar: downloadURL,
      };
      const res = await axios.patch(
        `${BASEURL}/users/update/me`,
        { ...userInfoUpdate },
        { headers },
      );
      if (res.status === 200) {
        set({ userInfo: res.data });
        triggerNotify(messages.saveProfileSuccess);
      }
    } catch (error) {
      handleErrorStatus(error);
    }
  },
}));
