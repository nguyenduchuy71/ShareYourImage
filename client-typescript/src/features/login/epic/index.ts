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
    let message = 'Login successful';
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
      message = 'Login failed';
      set({ error });
    } finally {
      triggerNotify(message);
    }
  },
  signUpEpic: async (credentials: any) => {
    let message = 'Sign up successful';
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
      message = 'Sign up fail';
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
