from pydantic import BaseModel
from datetime import datetime

class NotifyBase(BaseModel):
    content: str

class Notify(NotifyBase):
    id: str
    createdAt: datetime
    is_readed: bool

    class Config:
        from_attributes = True
