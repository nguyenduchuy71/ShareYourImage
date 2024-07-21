from sqlalchemy.orm import Session
from sqlalchemy import or_
from users.schema import user
from users.models import User, Friend
from items.models import Item, UserShareItem
from items.schema import ItemCreate
from notify.models import Notify
from auth.utills import AuthUtil

class UserController:
    
    @staticmethod
    def getUserByEmail(db: Session, email: str):
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def getUser(db: Session, user_id: str):
        return db.query(User).filter(User.id == user_id).first()
    
    @staticmethod
    def getAllUsers(db: Session, skip: int = 0, limit: int = 100, user_id=None):
        return db.query(User).filter(User.id != user_id).offset(skip).limit(limit).all()

    @staticmethod
    def getFriendsByUser(db: Session, user_id: str):
        friends = db.query(Friend).filter(or_(Friend.userId == user_id, Friend.friendId == user_id)).all()
        ids = []
        for friend in friends:
            if user_id != friend.userId:
                ids.append(friend.userId)
            elif user_id != friend.friendId:
                ids.append(friend.friendId)
        return db.query(User).filter(User.id.in_(set(ids))).all()

    @staticmethod
    def createUser(db: Session, user: user.UserCreate):
        hashed_password = AuthUtil.handleHashPassWord(user.password)
        userInfo = User(email=user.email, hashedPassword=hashed_password, username=user.email)
        db.add(userInfo)
        db.commit()
        db.refresh(userInfo)
        return userInfo

    @staticmethod
    def createUserItem(db: Session, item: ItemCreate, user_id: str):
        itemInfo = db.query(Item).filter(Item.userId == user_id).filter(Item.title == itemInfo.title).first()
        if not itemInfo:
            itemInfo = Item(**itemInfo, userId=user_id)
            db.add(itemInfo)
            db.commit()
            db.refresh(itemInfo)
        return itemInfo
    
    @staticmethod
    def addFriend(db: Session, owner: User, friend_id: str):
        friendInfo = Friend(friendId=friend_id, userId=owner.id, isAdded=True)
        notifyInfo = Notify(userId=friend_id, content=f"{owner.username} want to add friend with you")
        db.add(friendInfo)
        db.add(notifyInfo)
        db.commit()
        db.refresh(friendInfo)
        db.refresh(notifyInfo)
        return friendInfo

    @staticmethod
    def acceptFriend(db: Session, owner: User, friend_id: str):
        friend = db.query(Friend).filter(Friend.userId==friend_id).filter(Friend.friendId==owner.id).first()
        if friend:
            friend.isAccepted = True
            notify = Notify(userId=friend_id, content=f"{friend_id} accpeted your friend invite")
            db.add(notify)
            db.commit()
            db.refresh(friend)
            db.refresh(notify)
        return friend

    @staticmethod
    def updateUserInfo(db: Session, userUpdate: user.UserUpdate, user:user.User):
        user.bio = userUpdate.bio
        user.username = userUpdate.username
        if userUpdate.avatar != user.avatar:
            user.avatar = userUpdate.avatar
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def getShareFriendItem(db: Session, user_id: str, friend_id: str):
        listUserShareOwner = db.query(UserShareItem).filter(UserShareItem.userId==user_id).filter(UserShareItem.friendId==friend_id).all()
        listUserShareFriend = db.query(UserShareItem).filter(UserShareItem.userId==friend_id).filter(UserShareItem.friendId==user_id).all()
        return list(set(listUserShareOwner + listUserShareFriend))
