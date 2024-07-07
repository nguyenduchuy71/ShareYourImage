from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from users.schema.user import User, UserCreate, UserUpdate
from items.schema import Item, ItemCreate
from users.schema.friend import FriendBase
from db.database import get_db
from auth.utills import get_current_user
from users.controller import get_user_by_email, create_user, get_user, get_users, get_friends_by_user, create_user_item, add_friend, accept_friend, update_user_info, get_share_friend_item

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=User)
def create_user_route(user: UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = get_user_by_email(db, email=user.email)
        if db_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
        return create_user(db=db, user=user)
    except Exception as error:
        # logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")


@router.get("/", response_model=list[User])
def get_users_route(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    db_user = get_user(db, user_id=current_user.id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User not found")
    try:
        users = get_users(db, skip=skip, limit=limit)
        return users
    except Exception as error:
        # logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.get("/{user_id}", response_model=User)
def get_user_by_id(user_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    try:
        db_user = get_user(db, user_id=user_id)
        if db_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return db_user
    except Exception as error:
        # logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.get("/friends/me", response_model=list[User])
def get_user_friends(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    try:
        db_user = get_user(db, user_id=current_user.id)
        if db_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        friends = get_friends_by_user(db, user_id=current_user.id)
        return friends
    except Exception as error:
        # logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.get("/profile/me", response_model=User)
def get_user_profile(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    try:
        db_user = get_user(db, user_id=current_user.id)
        if db_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return db_user
    except Exception as error:
        # logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")
    

@router.post("/{user_id}/items/", response_model=Item)
def create_item_for_user(
    user_id: int, item: ItemCreate, db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    try:
        db_user = get_user(db, user_id=current_user.id)
        if db_user is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
        return create_user_item(db=db, item=item, user_id=user_id)
    except Exception as error:
        # logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.post("/addfriend", response_model=list[User])
def addFriend(friend: FriendBase, db: Session = Depends(get_db),
    current_user = Depends(get_current_user)):
    try:
        db_user = get_user(db, user_id=current_user.id)
        if db_user is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
        db_friend = add_friend(db, owner=current_user, friend_id=friend.friend_id)
        if db_friend is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Friend not found")
        users = get_users(db)
        return users
    except Exception as error:
        # logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.post("/acceptfriend", response_model=list[User])
def acceptFriend(friend: FriendBase, db: Session = Depends(get_db),
    current_user = Depends(get_current_user)):
    try:
        db_user = get_user(db, user_id=current_user.id)
        if db_user is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
        db_friend = accept_friend(db, owner=current_user, friend_id=friend.friend_id)
        if db_friend is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Friend not found")
        users = get_users(db)
        return users
    except Exception as error:
        # logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.patch("/update/me", response_model=User)
def updateUserInfo(userUpdate: UserUpdate, db: Session = Depends(get_db),
    current_user = Depends(get_current_user)):
    try:
        userInfo = get_user(db, user_id=current_user.id)
        if userInfo is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
        db_user = update_user_info(db, userUpdate, userInfo) 
        return db_user
    except Exception as error:
        # logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.get("/share/{friendId}")
def get_share_user_image(friendId: str, db: Session = Depends(get_db),
    current_user = Depends(get_current_user)):
    try:
        userInfo = get_user(db, user_id=current_user.id)
        if userInfo is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
        db_user = get_share_friend_item(db, current_user.id, friendId) 
        return db_user
    except Exception as error:
        # logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")
