import { useState } from 'react';
import {
  UserCircleIcon,
  FolderIcon,
  PhotoIcon,
  UsersIcon,
  ArrowLeftEndOnRectangleIcon,
  BellAlertIcon,
} from '@heroicons/react/24/solid';
import { useAuthStore } from '../features/login/epic';
import { CustomIconItem } from './CustomIconItem';
import logo from '@/assets/img/logo.png'
import { ImageItem } from '@/components/ImageItem';

const listMenu = [
  {
    name: 'Send images',
    icon: PhotoIcon,
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
    <div className="sticky top-0 min-h-screen pr-4 bg-[#272727] text-[#ABF600] font-semibold w-[4rem] md:w-[14rem]">
      <div className="flex justify-center bg-[#272727]">
        <ImageItem imageSrc={logo} imageAlt='logo' customStyle='object-contain w-16 h-16 md:w-24 md:h-24 m-2 rounded-full bg-none md:bg-[#1D1D1D]' />
      </div>
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
