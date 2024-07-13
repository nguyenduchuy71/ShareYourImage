from pydantic import BaseModel

class FriendBase(BaseModel):
    friendId: str

class FriendCreate(FriendBase):
    pass

class Friend(FriendBase):
    userId: str
    isAdded: bool
    isAccepted: bool

    class Config:
        from_attributes = True
