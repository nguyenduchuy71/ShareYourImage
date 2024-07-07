from sqlalchemy.orm import Session
from items.models import Item, UserShareItem
from items.schema import ItemCreate
from users.models import User

def get_user(db: Session, user_id: str):
    return db.query(User).filter(User.id == user_id).first()

def get_user_item(db: Session, user_id: str):
    return db.query(Item).order_by(Item.createdAt.desc()).filter(Item.owner_id == user_id).all()

def delete_user_item(db: Session, ownerId:str, itemPath: str):
    db_item = db.query(Item).filter(Item.owner_id==ownerId).filter(Item.title==itemPath).first()
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item

def share_friend_item(db: Session, user_id: str, friend_id: str, srcImage: str):
    db_share = UserShareItem(owner_id=user_id, friend_id=friend_id, imageShare=srcImage)
    db.add(db_share)
    db.commit()
    db.refresh(db_share)
    return db_share

def create_user_item(db: Session, item: ItemCreate, user_id: str):
    db_item = db.query(Item).filter(Item.owner_id == user_id).filter(Item.title == item['title']).first()
    if not db_item:
        db_item = Item(**item, owner_id=user_id)
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
    return db_item
