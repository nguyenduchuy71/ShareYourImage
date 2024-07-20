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
    <div className="lg:w-[50%] md:w-[80%] xs:w-[100%] mx-auto my-6 p-2">
      <div className="min-h-screen p-6 pr-0 rounded-3xl border lg:border-gray-300 md:border-transparent sm:border-transparent xs:border-transparent">
        <div className="flex flex-col gap-4 text-lg">
          {notify.length > 0 ? (
            notify.map((item) => (
              <div className="flex justify-stretch items-center">
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
                    <span className="text-black">{formatDateTime(item.createdAt)}</span>
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
