from pydantic import BaseModel
from users.schema.friend import Friend
from items.schema import Item

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    username: str
    bio: str
    avatar: str

class User(UserBase):
    id: str
    is_active: bool
    username: str
    bio: str
    avatar: str
    items: list[Item] = []
    friends: list[Friend] = []

    class Config:
        from_attributes = True

class UserLogin(UserBase):
    password: str
