import axios from 'axios';
import { create } from 'zustand';
import { triggerNotify } from '@/utils/messages';
import { IAuthenStore } from './interface';
import { messages } from './messages'
const BASEURL = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}`;

export const useAuthStore = create<IAuthenStore>((set) => ({
  authInfo: {},
  authToken: null,
  error: null,
  loginEpic: async (credentials: any) => {
    let message = messages.loginSuccess;
    try {
      const res = await axios.post(`${BASEURL}/login`, credentials);
      if (res.status === 200) {
        const userInfo = JSON.stringify({
          email: credentials.email,
          userId: res.data.userId,
        });
        sessionStorage.setItem('userInfo', userInfo);
        sessionStorage.setItem('auth', res.data.token);
        set({ authToken: res.data.token });
        set({ authInfo: userInfo });
      }
    } catch (error) {
      message = messages.loginFail;
      set({ error });
    } finally {
      triggerNotify(message);
    }
  },
  signUpEpic: async (credentials: any) => {
    let message = messages.signUpSuccess;
    try {
      const res = await axios.post(`${BASEURL}/signup`, credentials);
      if (res.status === 200) {
        const userInfo = JSON.stringify({
          email: credentials.email,
          userId: res.data.userId,
        });

        sessionStorage.setItem('userInfo', userInfo);
        sessionStorage.setItem('auth', res.data.token);
        set({ authToken: res.data.token });
        set({ authInfo: userInfo });
      }
    } catch (error) {
      message = messages.signUpFail;
      set({ error });
    }
    finally {
      triggerNotify(message);
    }
  },
  logoutEpic: () => {
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('auth');
  },
  getAuthenTokenEpic: () => {
    set({ authToken: sessionStorage.getItem('auth') });
  },
  getAuthenUserInfo: () => {
    set({ authInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {} });
  },
}));
