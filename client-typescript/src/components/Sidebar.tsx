import { useState } from 'react';
import {
  UserCircleIcon,
  FolderIcon,
  ForwardIcon,
  UsersIcon,
  ArrowLeftEndOnRectangleIcon,
  BellAlertIcon,
} from '@heroicons/react/24/solid';
import { useAuthStore } from '../features/login/epic';
import { CustomIconItem } from './CustomIconItem';

const listMenu = [
  {
    name: 'Send images',
    icon: ForwardIcon,
    path: '/',
    isSelected: false
  },
  {
    name: 'Collection',
    icon: FolderIcon,
    path: '/collection',
    isSelected: false
  },
  {
    name: 'Profile',
    icon: UserCircleIcon,
    path: '/profile',
    isSelected: false
  },
  {
    name: 'Friends',
    icon: UsersIcon,
    path: '/friends',
    isSelected: false
  },
  {
    name: 'Notify',
    icon: BellAlertIcon,
    path: '/notifications',
    isSelected: false
  },
];

export function Sidebar() {
  const [logoutEpic] = useAuthStore((state: any) => [state.logoutEpic]);
  const [selectedMenu, setSelectedMenu] = useState(listMenu[0])

  return (
    <div className="sticky top-0 min-h-screen pr-4 bg-[#272727] text-[#ABF600] font-semibold w-[4rem] md:w-[12rem]">
      <div className="flex flex-col">
        {listMenu.map((menu) => (
          <div key={menu.name} onClick={() => setSelectedMenu(menu)} className={`my-2 hover:bg-[#1D1D1D] rounded-md ${selectedMenu.path === menu.path && 'shadow-xl shadow-black bg-[#404040] rounded-e-lg'}`}>
            <CustomIconItem
              key={menu.name}
              name={menu.name}
              CustomIconImage={menu.icon}
              path={menu.path}
            />
          </div>
        ))}
        <div className="my-2 hover:bg-[#1D1D1D] rounded-md"
          onClick={() => logoutEpic()}>
          <CustomIconItem
            name="Log Out"
            CustomIconImage={ArrowLeftEndOnRectangleIcon}
            path="/login"
          />
        </div>
      </div>
    </div>
  );
}
