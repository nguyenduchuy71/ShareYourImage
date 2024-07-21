from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from users.schema.user import User, UserCreate, UserUpdate
from items.schema import Item, ItemCreate
from users.schema.friend import FriendBase
from log.logger import logger
from db.database import get_db
from auth.utills import AuthUtil
from broker.producer_service import send_require_add_friend
from users.controller import UserController

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=User)
def createUser(user: UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = UserController.getUserByEmail(db, email=user.email)
        if db_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
        return UserController.createUser(db=db, user=user)
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.get("/", response_model=list[User])
def getAllUsers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user = Depends(AuthUtil.getCurrentUser)):
    try:
        users = UserController.getAllUsers(db, skip=skip, limit=limit)
        return users
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.get("/{user_id}", response_model=User)
def getUserById(user_id: int, db: Session = Depends(get_db), current_user = Depends(AuthUtil.getCurrentUser)):
    try:
        return current_user
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.get("/friends/me", response_model=list[User])
def getUserFriends(db: Session = Depends(get_db), current_user = Depends(AuthUtil.getCurrentUser)):
    try:
        friends = UserController.getFriendsByUser(db, user_id=current_user.id)
        return friends
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.get("/profile/me", response_model=User)
def getUserProfile(db: Session = Depends(get_db), current_user = Depends(AuthUtil.getCurrentUser)):
    try:
        return current_user
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")
    

@router.post("/{user_id}/items/", response_model=Item)
def createUserItem(
    user_id: int, item: ItemCreate, db: Session = Depends(get_db),
    current_user = Depends(AuthUtil.getCurrentUser)
):
    try:
        return UserController.createUserItem(db=db, item=item, user_id=user_id)
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.post("/addfriend", response_model=list[User])
def addFriend(friend: FriendBase, db: Session = Depends(get_db),
    current_user = Depends(AuthUtil.getCurrentUser)):
    try:
        friendInfo = UserController.addFriend(db, owner=current_user, friend_id=friend.friendId)
        if friendInfo is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Friend not found")
        users = UserController.getAllUsers(db)
        # send_require_add_friend(friend)
        return users
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.post("/acceptfriend", response_model=list[User])
def acceptFriend(friend: FriendBase, db: Session = Depends(get_db),
    current_user = Depends(AuthUtil.getCurrentUser)):
    try:
        friendInfo = UserController.acceptFriend(db, owner=current_user, friend_id=friend.friendId)
        if friendInfo is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Friend not found")
        users = UserController.getAllUsers(db)
        # send_require_add_friend(friend)
        return users
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.patch("/update/me", response_model=User)
def updateUserInfo(userUpdate: UserUpdate, db: Session = Depends(get_db),
    current_user = Depends(AuthUtil.getCurrentUser)):
    try:
        userInfo = UserController.updateUserInfo(db, userUpdate, current_user)
        return userInfo
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.get("/share/{friendId}")
def getShareFriendItem(friendId: str, db: Session = Depends(get_db),
    current_user = Depends(AuthUtil.getCurrentUser)):
    try:
        userInfo = UserController.getShareFriendItem(db, current_user.id, friendId) 
        return userInfo
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")
