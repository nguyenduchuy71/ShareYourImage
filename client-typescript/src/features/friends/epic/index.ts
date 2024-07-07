import { create } from 'zustand';
import axios from 'axios';
import { handleUpdateFriend } from '@/utils/handleFriend';
import { configHeaders, handleErrorStatus } from '@/utils/helpers';
import { IFriendStore } from './interface';
const BASEURL = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}`;

export const useFriendStore = create<IFriendStore>((set) => ({
  friends: [],
  friendIds: [],
  error: null,
  getUsersEpic: async () => {
    try {
      const accessToken = sessionStorage.getItem('auth');
      const headers = configHeaders(accessToken);
      const res = await axios.get(`${BASEURL}/users`, { headers });
      if (res.status === 200) {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        const listFriend = res.data.filter((item) => item.email !== userInfo.email);
        const listFriendId = handleUpdateFriend(res.data, userInfo.email);
        set({ friends: listFriend });
        set({ friendIds: listFriendId });
      }
    } catch (error) {
      handleErrorStatus(error);
    }
  },
  addFriendEpic: async (friend_id: string) => {
    try {
      const accessToken = sessionStorage.getItem('auth');
      const headers = configHeaders(accessToken);
      const res = await axios.post(
        `${BASEURL}/users/addfriend`,
        { friend_id: friend_id },
        {
          headers: headers,
        },
      );
      if (res.status === 200) {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        const listFriend = res.data.filter((item) => item.email !== userInfo.email);
        const listFriendId = handleUpdateFriend(res.data, userInfo.email);
        set({ friends: listFriend });
        set({ friendIds: listFriendId });
      }
    } catch (error) {
      handleErrorStatus(error);
    }
  },
  acceptFriendEpic: async (friend_id: string) => {
    try {
      const accessToken = sessionStorage.getItem('auth');
      const headers = configHeaders(accessToken);
      const res = await axios.post(
        `${BASEURL}/users/acceptfriend`,
        { friend_id: friend_id },
        {
          headers: headers,
        },
      );
      if (res.status === 200) {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        const listFriend = res.data.filter((item) => item.email !== userInfo.email);
        const listFriendId = handleUpdateFriend(res.data, userInfo.email);
        set({ friends: listFriend });
        set({ friendIds: listFriendId });
      }
    } catch (error) {
      handleErrorStatus(error);
    }
  },
}));
