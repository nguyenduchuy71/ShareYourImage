import { useEffect, useState } from 'react';
import { useShareStore } from './epic';
import { IShareStore } from './epic/interface';
import DropBoxFriend from '@/components/DropBoxFriend';
import EmptyData from '@/components/EmptyData';
import { ImageItem } from '@/components/ImageItem';
import { Loading } from '@/components/Loading';

function MainScreen() {
  const [friends, isLoading, shareImages, getFriendsEpic, getShareItemEpic] = useShareStore(
    (state: IShareStore) => [
      state.friends,
      state.isLoading,
      state.shareImages,
      state.getFriendsEpic,
      state.getShareItemEpic,
    ],
  );
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    getFriendsEpic();
    if (friends.length > 0) {
      setSelectedFriend(friends[0]);
    }
  }, [getFriendsEpic, isLoading]);

  useEffect(() => {
    if (selectedFriend) {
      getShareItemEpic(selectedFriend.id);
    }
  }, [getShareItemEpic, selectedFriend]);

  return (
    <div className="w-full mx-auto p-6">
      {!isLoading ? (
        <div>
          {friends.length > 0 && (
            <DropBoxFriend friends={friends} setSelectedFriend={setSelectedFriend} />
          )}
          <div className="my-4">
            {shareImages.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {shareImages.map((image) => {
                  return (
                    <div key={image.id}>
                      <ImageItem
                        imageSrc={image.imageShare}
                        imageAlt={image.imageShare}
                        isSelected={true}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyData message={'Empty collection'} />
            )}
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
}

export default MainScreen;
