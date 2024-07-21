from sqlalchemy.orm import Session
from notify.models import Notify

class NotifyController:

    @staticmethod
    def getAllNotifies(db: Session, owner_id: str = None, skip: int = 0, limit: int = 100):
        return db.query(Notify).order_by(Notify.createdTime.desc()).filter(Notify.userId == owner_id).offset(skip).limit(limit).all()
