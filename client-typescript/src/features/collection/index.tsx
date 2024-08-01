import { XCircleIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useCallback } from 'react';
import { ImageItem } from '@/components/ImageItem';
import { useCollectionStore } from './epic';
import { ICollectionStore } from './epic/interface';
import { IShareStore } from '../main/epic/interface';
import { useShareStore } from '../main/epic/index';
import { Loading } from '@/components/Loading';
import { useAuthStore } from '../login/epic';
import { IAuthenStore } from '../login/epic/interface';
import DragDropFileUpload from '@/components/DragDropFileUpload';
import EmptyData from '@/components/EmptyData';
import Modal from '@/components/Modal';
import ImageViewer from 'react-simple-image-viewer';
import { ShareIcon, ViewfinderCircleIcon } from '@heroicons/react/20/solid';

function CollectionScreen({ socket }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

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
  const [authInfo, getAuthenUserInfo] = useAuthStore((state: IAuthenStore) => [
    state.authInfo,
    state.getAuthenUserInfo,
  ]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(null);

  useEffect(() => {
    getAuthenUserInfo();
  }, [getAuthenUserInfo]);

  useEffect(() => {
    getCollectionEpic();
  }, [uploadCollectionEpic, getCollectionEpic, isCollectionLoading]);

  useEffect(() => {
    getFriendsEpic();
  }, [getFriendsEpic, isLoading]);

  const handleModalShareImage = (collection) => {
    setSelectedItem(collection);
    setShowModal(true)
  }

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const handlePreviewImage = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const handleDeleteCollection = (imagePath, srcImage) => {
    deteleCollectionEpic(imagePath, srcImage);
  };

  const handleShareImage = (item, friendId) => {
    shareImageEpic(item, friendId);
    socket.emit('shareImage', {
      friendId: friendId,
      message: `${authInfo.email} share you an image.`,
    });
  };

  return (
    <div className="w-full h-full overflow-hidden mx-auto max-w-2xl p-6 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
      <div>
        <p className="mb-2 text-pretty text-lg font-semibold">Upload new images</p>
        <DragDropFileUpload uploadCollectionEpic={uploadCollectionEpic} />
      </div>

      <div className="mt-8">
        <div className="my-8 flex justify-between items-center">
          <p className="text-pretty text-lg font-semibold">Your images</p>
          <Modal
            friends={friends}
            showModal={showModal}
            setShowModal={setShowModal}
            selectedItem={selectedItem}
            handleShareImage={handleShareImage}
          />
        </div>
        {!isCollectionLoading ? (
          <div>
            {collections.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {collections.map((collection, index) => {
                  return (
                    <div key={index} className="relative rounded-lg border-2 border-[#ABF600]">
                      <div className="flex justify-center">
                        <ImageItem
                          imageSrc={collection.srcImage}
                          imageAlt={collection.name}
                        />
                      </div>
                      <div className="absolute -right-2 -top-2 w-7 h-7 cursor-pointer"
                      >
                        <XCircleIcon
                          className="text-[#ABF600] hover:text-[#ee1d4f]"
                          onClick={() => handleDeleteCollection(collection.fullPath, collection.srcImage)}
                        />
                      </div>
                      <div className="absolute left-1 bottom-11 p-1 bg-[#ABF600] text-[#212121] rounded-md font-semibold text-whiteshadow-sm hover:opacity-75" onClick={() => handlePreviewImage(index)}>
                        <ViewfinderCircleIcon className="cursor-pointer w-5" />
                      </div>
                      <div className="absolute left-1 bottom-1 p-1 bg-[#ABF600] text-[#212121] rounded-md font-semibold text-whiteshadow-sm hover:opacity-75" onClick={() => handleModalShareImage(collection)}>
                        <ShareIcon className="cursor-pointer w-5" />
                      </div>
                    </div>
                  );
                })}
                {isViewerOpen && (
                  <ImageViewer
                    src={collections.map(collection => collection.srcImage)}
                    currentIndex={currentImage}
                    disableScroll={false}
                    closeOnClickOutside={true}
                    onClose={closeImageViewer}
                  />
                )}
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
