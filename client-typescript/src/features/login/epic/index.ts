import axios from 'axios';
import { create } from 'zustand';
import { triggerNotify } from '@/utils/messages';
import { IAuthenStore } from './interface';
const BASEURL = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}`;

export const useAuthStore = create<IAuthenStore>((set) => ({
  authInfo: {},
  authToken: null,
  error: null,
  loginEpic: async (credentials: any) => {
    try {
      const res = await axios.post(`${BASEURL}/login`, credentials);
      const userInfo = JSON.stringify({
        email: credentials.email,
        userId: res.data.userId,
      });
      sessionStorage.setItem('userInfo', userInfo);
      sessionStorage.setItem('auth', res.data.token);
      set({ authToken: res.data.token });
      set({ authInfo: userInfo });
      triggerNotify('Login successful');
    } catch (error) {
      set({ error });
    }
  },
  signUpEpic: async (credentials: any) => {
    try {
      let message = 'Sign up successful';
      const res = await axios.post(`${BASEURL}/signup`, credentials);
      if (res.data.status_code === 200) {
        const userInfo = JSON.stringify({
          email: credentials.email,
          userId: res.data.userId,
        });

        sessionStorage.setItem('userInfo', userInfo);
        sessionStorage.setItem('auth', res.data.token);
        set({ authToken: res.data.token });
        set({ authInfo: userInfo });
      } else if (res.data.status_code === 400) {
        message = res.data.detail;
      }
      triggerNotify(message);
    } catch (error) {
      set({ error });
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
