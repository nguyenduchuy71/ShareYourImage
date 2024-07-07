import { XCircleIcon } from '@heroicons/react/24/solid';
import { ChangeEvent, useState, useEffect } from 'react';
import { ButtonItem } from '@/components/ButtonItem';
import { ImageItem } from '@/components/ImageItem';
import { UploadImage } from '@/components/UploadImage';
import { useCollectionStore } from './epic';
import { ICollectionStore } from './epic/interface';
import EmptyData from '@/components/EmptyData';
import Modal from '@/components/Modal';
import { IShareStore } from '../main/epic/interface';
import { useShareStore } from '../main/epic/index';
import { Loading } from '@/components/Loading';

function CollectionScreen() {
  const [friends, isLoading, getFriendsEpic] = useShareStore((state: IShareStore) => [
    state.friends,
    state.isLoading,
    state.getFriendsEpic,
  ]);

  const [
    collections,
    isCollectionLoading,
    uploadCollectionEpic,
    getCollectionEpic,
    deteleCollectionEpic,
    shareImageEpic,
  ] = useCollectionStore((state: ICollectionStore) => [
    state.collections,
    state.isLoading,
    state.uploadCollectionEpic,
    state.getCollectionEpic,
    state.deteleCollectionEpic,
    state.shareImageEpic,
  ]);
  const [files, setFiles] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(null);

  useEffect(() => {
    getCollectionEpic();
  }, [getCollectionEpic, isCollectionLoading]);

  useEffect(() => {
    getFriendsEpic();
  }, [getFriendsEpic, isLoading]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUploadFiles = (e) => {
    e.preventDefault();
    uploadCollectionEpic(files);
    setFiles([]);
  };

  const handleSelectedItem = (collection) => {
    setSelectedItem(collection);
  };

  const handleDeleteCollection = (imagePath) => {
    deteleCollectionEpic(imagePath);
  };

  const handleShareImage = (item, friendId) => {
    shareImageEpic(item, friendId);
  };

  return (
    <div className="w-full h-full overflow-hidden mx-auto max-w-2xl p-6 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
      <div>
        <p className="mb-4 text-pretty text-lg font-semibold">Upload new images</p>
        <form onSubmit={handleUploadFiles} className="flex flex-col">
          <UploadImage files={files} handleFileChange={handleFileChange} />
          <div className="mt-4 flex justify-end">
            <ButtonItem
              typeButton="submit"
              classNameValue="rounded-md w-30 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              nameButton="Upload"
              isHidden={files.length === 0 ? true : false}
            />
          </div>
        </form>
      </div>

      <div className="my-4">
        <div className="flex justify-between items-center">
          <p className="mb-4 text-pretty text-lg font-semibold">Your images</p>
          <ButtonItem
            typeButton="button"
            classNameValue="rounded-md w-30 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            nameButton="Share"
            action={() => setShowModal(true)}
            isHidden={selectedItem ? false : true}
          />
          <Modal
            friends={friends}
            showModal={showModal}
            setShowModal={setShowModal}
            selectedItem={selectedItem}
            action={handleShareImage}
          />
        </div>
        {!isCollectionLoading ? (
          <div>
            {collections.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {collections.map((collection) => {
                  return (
                    <div key={collection.fullPath} className="relative">
                      <XCircleIcon
                        onClick={() => handleDeleteCollection(collection.fullPath)}
                        className="w-5 h-5 cursor-pointer absolute right-0 bottom-full hover:opacity-70"
                      />
                      <div onClick={() => handleSelectedItem(collection)}>
                        <ImageItem
                          imageSrc={collection.srcImage}
                          imageAlt={collection.name}
                          isSelected={
                            selectedItem && collection.fullPath === selectedItem.fullPath
                              ? true
                              : false
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyData message={'Empty collection'} />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}

export default CollectionScreen;
