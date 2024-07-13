from pydantic import BaseModel
from datetime import datetime

class NotifyBase(BaseModel):
    content: str

class Notify(NotifyBase):
    id: str
    createdTime: datetime
    isReaded: bool

    class Config:
        from_attributes = True
