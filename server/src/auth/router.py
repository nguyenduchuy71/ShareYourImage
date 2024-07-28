from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from db.database import get_db
from auth.schema import Token
from users.schema import user
from users.models import User
from users.controller import UserController
from auth.utils import AuthUtil
from log.logger import logger

router = APIRouter(tags=['Authentication'])

@router.post('/login')
def login(user_credentials: user.UserLogin, db: Session = Depends(get_db)):
    try:
        user_info = db.query(User).filter(User.email == user_credentials.email).first()
        if not user_info:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Email or password incorrect"}
            )
        if not AuthUtil.verify(user_credentials.password, user_info.hashedPassword):
            return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"message": "Invalid Credentials"}
            )
        access_token = AuthUtil.createAccessToken(data={"user_id": user_info.id})
        return Token(token=access_token, userId=user_info.id, token_type="Bearer")
    except Exception as error:
        logger.error(error)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Internal Server Error"}
        )

@router.post('/signup')
def signup(user_credentials:user.UserCreate, db:Session = Depends(get_db)):
    try:
        userInfo = db.query(User).filter(User.email == user_credentials.email).first()
        if userInfo:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Email already registered"}
            )
        userInfo = UserController.createUser(db, user=user_credentials)
        access_token = AuthUtil.createAccessToken(data={"user_id": userInfo.id})
        return Token(token=access_token, userId=userInfo.id, token_type="Bearer")
    except Exception as error:
        logger.error(error)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Internal Server Error"}
        )
