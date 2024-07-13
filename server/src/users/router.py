from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from users.schema.user import User, UserCreate, UserUpdate
from items.schema import Item, ItemCreate
from users.schema.friend import FriendBase
from log.logger import logger
from db.database import get_db
from auth.utills import getCurrentUser
from users.controller import getUserByEmail, createUser, getUser, getAllUsers, getFriendsByUser, createUserItem, addFriend, acceptFriend, updateUserInfo, getShareFriendItem

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=User)
def create_user_route(user: UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = getUserByEmail(db, email=user.email)
        if db_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
        return createUser(db=db, user=user)
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")


@router.get("/", response_model=list[User])
def get_users_route(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user = Depends(getCurrentUser)):
    try:
        users = getAllUsers(db, skip=skip, limit=limit)
        return users
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.get("/{user_id}", response_model=User)
def get_user_by_id(user_id: int, db: Session = Depends(get_db), current_user = Depends(getCurrentUser)):
    try:
        return current_user
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.get("/friends/me", response_model=list[User])
def get_user_friends(db: Session = Depends(get_db), current_user = Depends(getCurrentUser)):
    try:
        friends = getFriendsByUser(db, user_id=current_user.id)
        return friends
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.get("/profile/me", response_model=User)
def get_user_profile(db: Session = Depends(get_db), current_user = Depends(getCurrentUser)):
    try:
        return current_user
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")
    

@router.post("/{user_id}/items/", response_model=Item)
def create_item_for_user(
    user_id: int, item: ItemCreate, db: Session = Depends(get_db),
    current_user = Depends(getCurrentUser)
):
    try:
        return createUserItem(db=db, item=item, user_id=user_id)
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.post("/addfriend", response_model=list[User])
def add_Friend(friend: FriendBase, db: Session = Depends(get_db),
    current_user = Depends(getCurrentUser)):
    try:
        friendInfo = addFriend(db, owner=current_user, friend_id=friend.friendId)
        if friendInfo is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Friend not found")
        users = getAllUsers(db)
        return users
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.post("/acceptfriend", response_model=list[User])
def accept_Friend(friend: FriendBase, db: Session = Depends(get_db),
    current_user = Depends(getCurrentUser)):
    try:
        friendInfo = acceptFriend(db, owner=current_user, friend_id=friend.friendId)
        if friendInfo is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Friend not found")
        users = getAllUsers(db)
        return users
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.patch("/update/me", response_model=User)
def update_User_Info(userUpdate: UserUpdate, db: Session = Depends(get_db),
    current_user = Depends(getCurrentUser)):
    try:
        userInfo = updateUserInfo(db, userUpdate, current_user) 
        return userInfo
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.get("/share/{friendId}")
def get_share_user_image(friendId: str, db: Session = Depends(get_db),
    current_user = Depends(getCurrentUser)):
    try:
        userInfo = getShareFriendItem(db, current_user.id, friendId) 
        return userInfo
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")
