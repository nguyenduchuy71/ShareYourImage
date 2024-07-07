from sqlalchemy.orm import Session
from notify.models import Notify

def get_notifies(db: Session, owner_id: str = None, skip: int = 0, limit: int = 100):
    return db.query(Notify).order_by(Notify.createdAt.desc()).filter(Notify.owner_id == owner_id).offset(skip).limit(limit).all()
