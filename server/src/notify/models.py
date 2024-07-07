import datetime
import uuid
from sqlalchemy import Boolean, Column, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from db.database import Base

class Notify(Base):
    __tablename__ = "notifies"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    owner_id = Column(String, ForeignKey("users.id"), index=True)
    content = Column(String, index=True)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)
    is_readed = Column(Boolean, default=False)
    
    owner = relationship("User", back_populates="notifies")
