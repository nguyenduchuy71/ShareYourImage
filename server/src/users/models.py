import datetime
import uuid
from sqlalchemy import Boolean, Column, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from db.database import Base

def generate_uuid():
    return uuid.uuid4()

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(generate_uuid()))
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    username = Column(String, index=True, default="")
    bio = Column(String, default="")
    avatar = Column(String, default="https://github.com/shadcn.png")
    is_active = Column(Boolean, default=True)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)

    items = relationship("Item", back_populates="owner")
    friends = relationship("Friend", back_populates="owner")
    notifies = relationship("Notify", back_populates="owner")
    usershareitems = relationship("UserShareItem", back_populates="owner")

class Friend(Base):
    __tablename__ = "friends"

    id = Column(String, primary_key=True, default=lambda: str(generate_uuid()))
    owner_id = Column(String, ForeignKey("users.id"), index=True)
    friend_id = Column(String, index=True)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)
    is_add_friend = Column(Boolean, default=False)
    is_accept_friend = Column(Boolean, default=False)
    
    owner = relationship("User", back_populates="friends")

