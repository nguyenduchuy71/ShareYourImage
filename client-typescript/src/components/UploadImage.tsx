import { PhotoIcon } from "@heroicons/react/24/solid";

export const UploadImage = ({ files = [], handleFileChange }) => {
  return (
    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
      <div className="text-center cursor-default">
        <PhotoIcon
          className="mx-auto h-12 w-12 text-gray-300"
          aria-hidden="true"
        />
        <div className="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <span>Upload image</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
              accept="image/*"
              multiple={files.length > 0 ? true : false}
            />
          </label>
          <span className="pl-1">or drag and drop</span>
        </div>
        <p className="text-xs leading-5 text-gray-600">PNG, JPG, ...</p>
        {files.length > 0 && (
          <p className="text-xs leading-5 text-gray-600">
            {files.length} files
          </p>
        )}
      </div>
    </div>
  );
};
