from sqlalchemy.orm import Session
from items.models import Item, UserShareItem
from items.schema import ItemCreate
from users.models import User

class ItemController:

    @staticmethod
    def get_user(db: Session, user_id: str):
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def get_user_item(db: Session, user_id: str):
        return db.query(Item).order_by(Item.createdTime.desc()).filter(Item.userId == user_id).all()

    @staticmethod
    def delete_user_item(db: Session, ownerId:str, itemPath: str, srcImage:str):
        item = db.query(Item).filter(Item.userId==ownerId).filter(Item.title == itemPath).first()
        itemShare = db.query(UserShareItem).filter(UserShareItem.userId==ownerId).filter(UserShareItem.pathImageShare==srcImage).first()
        if item:
            db.delete(item)
        if itemShare:
            db.delete(itemShare)
        db.commit()
        return item

    @staticmethod
    def share_friend_item(db: Session, user_id: str, friend_id: str, srcImage: str):
        itemShare = UserShareItem(userId=user_id, friendId=friend_id, pathImageShare=srcImage)
        db.add(itemShare)
        db.commit()
        db.refresh(itemShare)
        return itemShare

    @staticmethod
    def create_user_item(db: Session, item: ItemCreate, user_id: str):
        itemInfo = Item(**item, userId=user_id)
        db.add(itemInfo)
        db.commit()
        db.refresh(itemInfo)
        return itemInfo
