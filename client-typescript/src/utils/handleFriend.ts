export const handleUpdateFriend = (listFriend: any[], userEmail: string) => {
  const ids = listFriend.filter((item) => item.email === userEmail).map((item) => item.friends);
  const listFriendId = [];
  Object.keys(ids).forEach((key) => {
    Object.keys(ids[key]).forEach((keyItem) => {
      listFriendId.push(ids[key][keyItem]['friendId']);
    });
  });
  return listFriendId;
};
