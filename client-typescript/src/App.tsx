import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { IAuthenStore } from './features/login/epic/interface';
import { Routes, Route } from 'react-router-dom';
import SignInScreen from './features/login';
import MainScreen from './features/main';
import { useAuthStore } from './features/login/epic';
import { Sidebar } from './components/Sidebar';
import ProfileScreen from './features/profile';
import CollectionScreen from './features/collection';
import FriendScreen from './features/friends';
import NotifyScreen from './features/notify';
import NotFoundError from './features/errors/not-found-error';
import Footer from './components/footer';
import { io } from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import { triggerNotify } from '@/utils/messages';

const url = `http://localhost:${import.meta.env.VITE_SOCKET_PORT}`;
const socket = io(url);

function App() {
  const [authToken, getAuthenTokenEpic] = useAuthStore((state: IAuthenStore) => [
    state.authToken,
    state.getAuthenTokenEpic,
  ]);

  useEffect(() => {
    getAuthenTokenEpic();
  }, [getAuthenTokenEpic]);

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if (userInfo) {
      socket.on(`notify/${userInfo.userId}`, (data) => {
        triggerNotify(data);
      });
    }
  }, [socket]);

  return (
    <div className="min-w-full min-h-screen duration-300">
      {!authToken ? (
        <SignInScreen />
      ) : (
        <div>
          <div className="flex justify-between">
            {authToken && <Sidebar />}
            <Routes>
              <Route path="/" index element={<MainScreen />} />
              <Route path="/collection" element={<CollectionScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/friends" element={<FriendScreen socket={socket} />} />
              <Route path="/notifications" element={<NotifyScreen />} />
              <Route path="/login" element={<SignInScreen />} />
              <Route path="/signup" element={<SignInScreen />} />
              <Route path="*" element={<NotFoundError />} />
            </Routes>
          </div>
          {authToken && <Footer />}
          <ToastContainer />
        </div>
      )}
    </div>
  );
}

export default App;
