import datetime
from sqlalchemy import Boolean, Column, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from db.database import Base
from common.helper import Helper

class Notify(Base):
    __tablename__ = "notifies"

    id = Column(String, primary_key=True, default=lambda: str(Helper.generate_uuid()))
    userId = Column(String, ForeignKey("users.id"), index=True)
    content = Column(String, index=True)
    createdTime = Column(DateTime, default=datetime.datetime.utcnow)
    isReaded = Column(Boolean, default=False)

    user = relationship("User", back_populates="notifies")
