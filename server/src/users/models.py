import datetime
import uuid
from sqlalchemy import Boolean, Column, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from db.database import Base
from common.helper import Helper

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(Helper.generate_uuid()))
    email = Column(String, unique=True, index=True)
    hashedPassword = Column(String)
    username = Column(String, index=True, default="")
    bio = Column(String, default="")
    avatar = Column(String, default="https://github.com/shadcn.png")
    isActive = Column(Boolean, default=True)
    createdTime = Column(DateTime, default=datetime.datetime.utcnow)
    role = Column(String, default="user")

    items = relationship("Item", back_populates="user")
    friends = relationship("Friend", back_populates="user")
    notifies = relationship("Notify", back_populates="user")
    usershareitems = relationship("UserShareItem", back_populates="user")

class Friend(Base):
    __tablename__ = "friends"

    id = Column(String, primary_key=True, default=lambda: str(Helper.generate_uuid()))
    userId = Column(String, ForeignKey("users.id"), index=True)
    friendId = Column(String, index=True)
    createdTime = Column(DateTime, default=datetime.datetime.utcnow)
    isAdded = Column(Boolean, default=False)
    isAccepted = Column(Boolean, default=False)
    
    user = relationship("User", back_populates="friends")
