import { useEffect } from "react";
import { useNotifyStore } from "./epic";
import { formatDateTime } from "@/lib/utils";
import { INotifyStore } from "./epic/interface";
import EmptyData from "@/components/EmptyData";
import userImg from '@/assets/img/user.jfif'

function NotifyScreen() {
  const [notify, getNotifyEpic] = useNotifyStore((state: INotifyStore) => [
    state.notify,
    state.getNotifyEpic,
  ]);
  useEffect(() => {
    getNotifyEpic();
  }, [getNotifyEpic]);

  return (
    <div className="p-6 my-6 mx-auto rounded-xl bg-[#1D1D1D] lg:w-[50%] md:w-[80%] sm:w-[100%] xs:w-[100%] border-2 border-transparent lg:border-[#ABF600]">
      <div className="flex flex-col gap-4 text-lg">
        {notify.length > 0 ? (
          notify.map((item, index) => (
            <div key={index} className="flex justify-stretch items-center">
              <div className="mr-2">
                <img
                  className="h-10 w-10 object-cover rounded-full bg-gray-50"
                  src={userImg}
                  alt="Friend's avatar"
                />
              </div>
              <div
                key={item.id}
                className="flex-1 border-2 border-b-gray-300 border-t-transparent border-l-transparent border-r-transparent pb-2"
              >
                <span className="overflow-ellipsis">{item.content}</span>
                <div className="font-thin text-sm">
                  <span className="text-white font-semibold">{formatDateTime(item.createdAt)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyData message={'Empty notify'} />
        )}
      </div>
    </div>
  );
}

export default NotifyScreen;
