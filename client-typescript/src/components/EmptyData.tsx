import { PhotoIcon } from "@heroicons/react/24/solid";

function EmptyData({ message }) {
  return (
    <div className="flex flex-grow py-4 items-center justify-center rounded-lg border border-gray-900/25">
      <div className="text-center text-gray-600">
        <PhotoIcon className="mx-auto h-20 w-20 " aria-hidden="true" />
        <div className="cursor-default rounded-md font-semibold">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default EmptyData;
