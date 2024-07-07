import { create } from 'zustand';
import axios from 'axios';
import { triggerNotify } from '@/utils/messages';
import { IAuthenStore } from './interface';
const BASEURL = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}`;

export const useAuthStore = create<IAuthenStore>((set) => ({
  authInfo: {},
  authToken: null,
  error: null,
  loginEpic: async (credentials: any) => {
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
  },
  signUpEpic: async (credentials: any) => {
    const res = await axios.post(`${BASEURL}/signup`, credentials);
    const userInfo = JSON.stringify({
      email: credentials.email,
      userId: res.data.userId,
    });

    sessionStorage.setItem('userInfo', userInfo);
    sessionStorage.setItem('auth', res.data.token);
    set({ authToken: res.data.token });
    set({ authInfo: userInfo });
    triggerNotify('Sign up successful');
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
