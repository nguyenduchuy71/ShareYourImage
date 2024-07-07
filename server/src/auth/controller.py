from sqlalchemy.orm import Session
from users.models import User
from users.schema.user import UserCreate
from auth.utills import hash_password

def create_user(db: Session, user: UserCreate):
    db_user = User(email=user.email, hashed_password=hash_password(user.password), username=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
