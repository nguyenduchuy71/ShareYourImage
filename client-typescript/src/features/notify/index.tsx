import { useEffect, useState } from "react";
import { useNotifyStore } from "./epic";
import { formatDateTime } from "@/lib/utils";
import { INotifyStore } from "./epic/interface";
import EmptyData from "@/components/EmptyData";
import userImg from '@/assets/img/user.jfif'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ImageItem } from "@/components/ImageItem";
import { ArrowsPointingOutIcon, ArrowsPointingInIcon } from "@heroicons/react/24/solid";

const NotifyScreen = () => {
  const [open, setOpen] = useState(true)
  const [notify, getNotifyEpic] = useNotifyStore((state: INotifyStore) => [
    state.notify,
    state.getNotifyEpic,
  ]);
  useEffect(() => {
    getNotifyEpic();
    return () => {
    };
  }, [getNotifyEpic]);

  return (
    <div className="flex justify-center items-center mx-auto lg:w-[50%] md:w-[80%] sm:w-[100%] xs:w-[100%]">
      <div className="bg-[#ABF600] text-[#1d1d1d] rounded-full p-2 cursor-pointer hover:opacity-80"
        onClick={() => setOpen(true)} >
        {
          open ?
            <ArrowsPointingInIcon className="w-10 h-10" /> :
            <ArrowsPointingOutIcon className="w-10 h-10" />
        }
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-2xl mb-2">Notify</SheetTitle>
          </SheetHeader>
          <div className="overflow-auto">
            {notify.length > 0 ? (
              notify.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-2">
                    <ImageItem
                      imageSrc={userImg}
                      imageAlt="avatar"
                      customStyle="h-10 w-10 object-cover rounded-full" />
                  </div>
                  <div
                    key={item.id}
                    className="flex-1 border-2 border-b-gray-300 border-t-transparent border-l-transparent border-r-transparent pb-2"
                  >
                    <p className="overflow-ellipsis text-[#1d1d1d] font-semibold">{item.content}</p>
                    <p className="text-slate-500 font-sans">{formatDateTime(item.createdAt)}</p>
                  </div>
                </div>
              ))
            ) : (
              <EmptyData message={'Empty notify'} />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default NotifyScreen;
