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
    <div className="w-full flex flex-col p-6 gap-4 text-lg">
      {notify.length > 0 ? (
        notify.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 text-black border-l-8 border-green-500 rounded-md px-3 py-2 w-full"
          >
            <p>{item.content}</p>
            <div className="text-gray-500 font-thin text-sm">
              <span>{formatDateTime(item.createdAt)}</span>
            </div>
          </div>
        ))
      ) : (
        <EmptyData message={'Empty notify'} />
      )}
    </div>
  );
}

export default NotifyScreen;
