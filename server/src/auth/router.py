from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from auth.schema import Token
from users.schema import user
from users.models import User
from users.controller import createUser
from auth.utills import verify, createAccessToken
from log.logger import logger

router = APIRouter(tags=['Authentication'])

@router.post('/login')
def login(user_credentials:user.UserLogin, db:Session = Depends(get_db)):
    try:
        userInfo = db.query(User).filter(
            User.email == user_credentials.email).first()
        if not userInfo:
            return HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Email or password incorrect")
        if not verify(user_credentials.password, userInfo.hashedPassword):
            return HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials")
        access_token = createAccessToken(data={"user_id": userInfo.id})
        return Token(token=access_token, userId=userInfo.id, token_type="Bearer")
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.post('/signup')
def signup(user_credentials:user.UserCreate, db:Session = Depends(get_db)):
    try:
        userInfo = db.query(User).filter(User.email == user_credentials.email).first()
        if userInfo:
            return HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
        userInfo = createUser(db, user=user_credentials)
        access_token = createAccessToken(data={"user_id": userInfo.id})
        return Token(token=access_token, userId=userInfo.id, token_type="Bearer")
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")
