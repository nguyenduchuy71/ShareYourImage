import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { SearchItem } from '../../components/SearchItem';
import { ButtonItem } from '../../components/ButtonItem';
import { useFriendStore } from './epic';
import { useAuthStore } from '../login/epic';
import { IFriendStore } from './epic/interface';
import { IAuthenStore } from '../login/epic/interface';

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
  }, [getUsersEpic, socket]);

  useEffect(() => {
    getAuthenUserInfo();
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
    <div className="mx-auto my-6 lg:w-[50%] md:w-[80%] sm:w-[100%] xs:w-[100%]">
      <div className="p-6 rounded-2xl border lg:border-[#ABF600] md:border-transparent sm:border-transparent xs:border-transparent divide-y divide-[#ABF600]">
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
                  <img
                    className="h-12 w-12 object-cover flex-none rounded-full bg-gray-50"
                    src={friend.avatar ? friend.avatar : 'https://github.com/shadcn.png'}
                    alt="Friend's avatar"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="mt-1 truncate text-sm font-semibold leading-5 text-#[ABF600]">{friend.email}</p>
                    {friend.isActive ? (
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full  bg-slate-800/20 p-1">
                          <div className="h-2 w-2 rounded-full bg-[#ee1d4f]" />
                        </div>
                        <p className="text-xs font-semibold leading-5 text-white">Offlline</p>
                      </div>
                    ) : (
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs font-semibold leading-5 text-white">Online</p>
                      </div>
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
      </div>
    </div>
  );
}

export default FriendScreen;
