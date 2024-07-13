import uuid
import datetime
from sqlalchemy import Column, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from db.database import Base

def generate_uuid():
    return uuid.uuid4()

class Item(Base):
    __tablename__ = "items"

    id = Column(String, primary_key=True, default=lambda: str(generate_uuid()))
    title = Column(String, index=True)
    userId = Column(String, ForeignKey("users.id"), index=True)
    createdTime = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="items")

class UserShareItem(Base):
    __tablename__ = "usershareitems"

    id = Column(String, primary_key=True, default=lambda: str(generate_uuid()))
    userId = Column(String, ForeignKey("users.id"), index=True)
    friendId = Column(String, index=True)
    pathImageShare = Column(String, index=True)
    createdTime = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="usershareitems")
