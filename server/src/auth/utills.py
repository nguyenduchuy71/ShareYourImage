import os
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from auth.schema import TokenData
from db import database
from users.models import User
from log.logger import logger
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES'))

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthUtil:
    @staticmethod
    def handleHashPassWord(password: str):
        return pwd_context.hash(password)

    @staticmethod
    def verify(plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def createAccessToken(data: dict):
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encode_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encode_jwt

    @staticmethod
    def getCurrentUser(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
        def verifyAccessToken(token: str, credentials_exception):
            try:
                payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
                id: str = payload.get("user_id")
                if id is None:
                    raise credentials_exception
                return TokenData(id=str(id))
            except JWTError:
                raise credentials_exception
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
        token = verifyAccessToken(token, credentials_exception)
        user = db.query(User).filter(User.id == token.id).first()
        if user is None:
            raise credentials_exception
        return user
