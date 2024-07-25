import { PhotoIcon } from "@heroicons/react/24/solid";

function EmptyData({ message }) {
  return (
    <div className="flex flex-grow py-4 items-center justify-center rounded-lg border-4 border-[#ABF600]">
      <div className="text-center">
        <PhotoIcon className="mx-auto h-20 w-20 bg-[#ABF600] rounded-full p-2" aria-hidden="true" />
        <div className="cursor-default rounded-md font-semibold mt-2">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default EmptyData;
