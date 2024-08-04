import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { SearchItem } from '@/components/SearchItem';
import { ButtonItem } from '@/components/ButtonItem';
import CustomScreen from '@/components/CustomScreen';
import CustomStatus from '@/components/CustomStatus';
import { useFriendStore } from './epic';
import { useAuthStore } from '../login/epic';
import { IFriendStore } from './epic/interface';
import { IAuthenStore } from '../login/epic/interface';
import userImg from '@/assets/img/user.jfif'
import { ImageItem } from '@/components/ImageItem';

function FriendScreen({ socket }) {
  const [searchText, setSearchText] = useState('');
  const [friends, friendIds, getUsersEpic, addFriendEpic, acceptFriendEpic] = useFriendStore(
    (state: IFriendStore) => [
      state.friends,
      state.friendIds,
      state.getUsersEpic,
      state.addFriendEpic,
      state.acceptFriendEpic,
    ],
  );
  const [authInfo, getAuthenUserInfo] = useAuthStore((state: IAuthenStore) => [
    state.authInfo,
    state.getAuthenUserInfo,
  ]);

  useEffect(() => {
    getUsersEpic();
    return () => {
    };
  }, [getUsersEpic, socket]);

  useEffect(() => {
    getAuthenUserInfo();
    return () => {
    };
  }, [getAuthenUserInfo]);

  const handleAddFriend = (userId: string) => {
    addFriendEpic(userId);
    socket.emit('addFriend', {
      friendId: userId,
      message: `${authInfo.email} sent you a friend invite.`,
    });
  };

  const handleAcceptFriend = (userId: string) => {
    acceptFriendEpic(userId);
    socket.emit('addFriend', {
      friendId: userId,
      message: `${authInfo.email} accept your friend invite.`,
    });
  };

  return (
    <CustomScreen>
      <SearchItem
        type="search"
        placeholder="Search your friends"
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <ListGroup>
        {friends
          .filter(
            (friend) => friend.email.includes(searchText) || friend.username.includes(searchText),
          )
          .map((friend) => (
            <ListGroup.Item key={friend.email} className="flex justify-between py-4">
              <div className="flex items-center gap-x-4">
                <ImageItem
                  customStyle="h-12 w-12 object-cover flex-none rounded-full bg-gray-50"
                  imageSrc={friend.avatar ? friend.avatar : userImg}
                  imageAlt="Friend's avatar"
                />
                <div className="min-w-0 flex-auto">
                  <p className="mt-1 truncate text-sm font-semibold leading-5 text-#[ABF600] overflow-ellipsis">{friend.email}</p>
                  {friend.isActive ? (
                    <CustomStatus isLogin={true} />
                  ) : (
                    <CustomStatus isLogin={false} />
                  )}
                </div>
              </div>
              <div className="flex flex-wrap flex-end items-center justify-center">
                {!friendIds.includes(friend.id) ? (
                  <div className="ml-8">
                    {friend.friends.findIndex((item) => item.friendId === authInfo.userId) !==
                      -1 ? (
                      <div>
                        {friend.friends
                          .filter((item) => item.friendId === authInfo.userId)
                          .findIndex((item) => item.isAccepted) === -1 ? (
                          <ButtonItem
                            typeButton="button"
                            classNameValue="rounded-md w-20 bg-[#ABF600] px-3 py-2 text-sm font-semibold text-black shadow-sm hover:opacity-80"
                            nameButton="Accept"
                            action={() => handleAcceptFriend(friend.id)}
                          />
                        ) : (
                          <ButtonItem
                            typeButton="button"
                            classNameValue="rounded-md w-20 bg-[#1D1D1D] px-3 py-2 text-sm border border-[#ABF600] font-semibold text-white font-semibold shadow-sm"
                            nameButton="Friend"
                            isDisabled={true}
                          />
                        )}
                      </div>
                    ) : (
                      <ButtonItem
                        typeButton="button"
                        classNameValue="rounded-md w-20 bg-[#ABF600] px-3 py-2 text-sm font-semibold text-black shadow-sm hover:opacity-80"
                        nameButton="Add"
                        action={() => handleAddFriend(friend.id)}
                      />
                    )}
                  </div>
                ) : (
                  <ButtonItem
                    typeButton="button"
                    classNameValue="rounded-md w-20 bg-[#1D1D1D] px-3 py-2 text-sm border border-[#ABF600] font-semibold text-white font-semibold shadow-sm"
                    nameButton="Friend"
                    isDisabled={true}
                  />
                )}
              </div>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </CustomScreen>
  );
}

export default FriendScreen;
