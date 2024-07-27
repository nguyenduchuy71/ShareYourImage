import { useEffect } from "react";
import { useNotifyStore } from "./epic";
import { formatDateTime } from "@/lib/utils";
import { INotifyStore } from "./epic/interface";
import EmptyData from "@/components/EmptyData";

function NotifyScreen() {
  const [notify, getNotifyEpic] = useNotifyStore((state: INotifyStore) => [
    state.notify,
    state.getNotifyEpic,
  ]);
  useEffect(() => {
    getNotifyEpic();
  }, [getNotifyEpic]);

  return (
    <div className="mt-10 mx-auto lg:w-[50%] md:w-[80%] sm:w-[100%] xs:w-[100%]">
      <div className="bg-[#1D1D1D] rounded-xl p-6 lg:border-2 lg:border-[#ABF600] md:border-none sm:border-none xs:border-none md:border-transparent sm:border-transparent xs:border-transparent">
        <div className="flex flex-col gap-4 text-lg">
          {notify.length > 0 ? (
            notify.map((item, index) => (
              <div key={index} className="flex justify-stretch items-center">
                <div className="mr-2">
                  <img
                    className="h-10 w-10 object-cover rounded-full bg-gray-50"
                    src='https://github.com/shadcn.png'
                    alt="Friend's avatar"
                  />
                </div>
                <div
                  key={item.id}
                  className="flex-1 border border-b-gray-300 border-t-transparent border-l-transparent border-r-transparent pb-2"
                >
                  <p className="overflow-auto">{item.content}</p>
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
    </div>

  );
}

export default NotifyScreen;
