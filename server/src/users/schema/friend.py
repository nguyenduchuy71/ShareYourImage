from pydantic import BaseModel

class FriendBase(BaseModel):
    friend_id: str

class FriendCreate(FriendBase):
    pass

class Friend(FriendBase):
    owner_id: str
    is_add_friend: bool
    is_accept_friend: bool

    class Config:
        from_attributes = True
