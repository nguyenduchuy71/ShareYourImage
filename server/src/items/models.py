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
    owner_id = Column(String, ForeignKey("users.id"), index=True)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)

    owner = relationship("User", back_populates="items")

class UserShareItem(Base):
    __tablename__ = "usershareitems"

    id = Column(String, primary_key=True, default=lambda: str(generate_uuid()))
    owner_id = Column(String, ForeignKey("users.id"), index=True)
    friend_id = Column(String, index=True)
    imageShare = Column(String, index=True)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)
    
    owner = relationship("User", back_populates="usershareitems")
