from sqlalchemy.orm import Session
from sqlalchemy import or_
from users.schema import user
from users.models import User, Friend
from items.models import Item, UserShareItem
from items.schema import ItemCreate
from notify.models import Notify
from auth.utills import hash_password

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user(db: Session, user_id: str):
    return db.query(User).filter(User.id == user_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 100, user_id=None):
    return db.query(User).filter(User.id != user_id).offset(skip).limit(limit).all()

def get_friends_by_user(db: Session, user_id: str):
    friends = db.query(Friend).filter(or_(Friend.owner_id == user_id, Friend.friend_id == user_id)).all()
    ids = []
    for friend in friends:
        if user_id != friend.owner_id:
            ids.append(friend.owner_id)
        elif user_id != friend.friend_id:
            ids.append(friend.friend_id)
    return db.query(User).filter(User.id.in_(set(ids))).all()

def create_user(db: Session, user: user.UserCreate):
    hashed_password = hash_password(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password, username=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_user_item(db: Session, item: ItemCreate, user_id: str):
    db_item = db.query(Item).filter(Item.owner_id == user_id).filter(Item.title == item['title']).first()
    if not db_item:
        db_item = Item(**item, owner_id=user_id)
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
    return db_item

def add_friend(db: Session, owner: User, friend_id: str):
    db_friend = Friend(friend_id=friend_id, owner_id=owner.id, is_add_friend=True)
    db_notify = Notify(owner_id=friend_id, content=f"{owner.username} want to add friend with you")
    db.add(db_friend)
    db.add(db_notify)
    db.commit()
    db.refresh(db_friend)
    db.refresh(db_notify)
    return db_friend

def accept_friend(db: Session, owner: User, friend_id: str):
    friend = db.query(Friend).filter(Friend.owner_id==friend_id).filter(Friend.friend_id==owner.id).first()
    if friend:
        friend.is_accept_friend = True
        notify = Notify(owner_id=friend_id, content=f"{friend_id} accpeted your friend invite")
        db.add(notify)
        db.commit()
        db.refresh(friend)
        db.refresh(notify)
    return friend

def update_user_info(db: Session, userUpdate: user.UserUpdate, user:user.User):
    user.bio = userUpdate.bio
    user.username = userUpdate.username
    user.avatar = userUpdate.avatar
    db.commit()
    db.refresh(user)
    return user

def get_share_friend_item(db: Session, user_id: str, friend_id: str):
    listUserShareOwner = db.query(UserShareItem).filter(UserShareItem.owner_id==user_id).filter(UserShareItem.friend_id==friend_id).all()
    listUserShareFriend = db.query(UserShareItem).filter(UserShareItem.owner_id==friend_id).filter(UserShareItem.friend_id==user_id).all()
    return list(set(listUserShareOwner + listUserShareFriend))
