from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from auth.schema import Token
from auth.controller import create_user
from users.schema import user
from users.models import User
from auth.utills import verify, create_access_token

router = APIRouter(tags=['Authentication'])

@router.post('/login', response_model=Token)
def login(user_credentials:user.UserLogin, db:Session = Depends(get_db)):
    try:
        userInfo = db.query(User).filter(
            User.email == user_credentials.email).first()
        if not userInfo:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")
        if not verify(user_credentials.password, userInfo.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")
        access_token = create_access_token(data={"user_id": userInfo.id})
        return Token(token=access_token, userId=userInfo.id, token_type="Bearer")
    except Exception as error:
        # logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.post('/signup', response_model=Token)
def signup(user_credentials:user.UserCreate, db:Session = Depends(get_db)):
    try:
        userInfo = create_user(db, user=user_credentials)
        access_token = create_access_token(data={"user_id": userInfo.id})
        return Token(token=access_token, userId=userInfo.id, token_type="Bearer")
    except Exception as error:
        # logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")
