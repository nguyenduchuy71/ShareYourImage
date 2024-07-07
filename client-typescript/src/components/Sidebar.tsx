import {
  UserCircleIcon,
  FolderIcon,
  ForwardIcon,
  UsersIcon,
  ArrowLeftEndOnRectangleIcon,
  BellAlertIcon,
} from "@heroicons/react/24/solid";
import { useAuthStore } from "../features/login/epic";
import { CustomIconItem } from "./CustomIconItem";

export function Sidebar() {
  const [logoutEpic] = useAuthStore((state: any) => [state.logoutEpic]);
  const listMenu = [
    {
      name: "Send images",
      icon: ForwardIcon,
      path: "/",
    },
    {
      name: "Collection",
      icon: FolderIcon,
      path: "/collection",
    },
    {
      name: "Profile",
      icon: UserCircleIcon,
      path: "/profile",
    },
    {
      name: "Friends",
      icon: UsersIcon,
      path: "/friends",
    },
    {
      name: "Notify",
      icon: BellAlertIcon,
      path: "/notifications",
    },
  ];
  return (
    <div className="sticky top-0 h-[calc(100vh)] w-[16rem] bg-slate-800 text-white p-2 shadow-xl shadow-blue-gray-900/5">
      <div className="flex flex-col">
        {listMenu.map((menu) => (
          <div key={menu.name} className="p-3 hover:bg-slate-600 rounded-md">
            <CustomIconItem
              key={menu.name}
              name={menu.name}
              CustomIconImage={menu.icon}
              path={menu.path}
            />
          </div>
        ))}
        <div className="p-3 hover:bg-slate-600 rounded-md" onClick={() => logoutEpic()}>
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
