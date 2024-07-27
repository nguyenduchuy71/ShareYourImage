from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from db.database import get_db
from notify.schema import Notify
from notify.controller import NotifyController
from auth.utills import AuthUtil
from log.logger import logger

router = APIRouter(
    prefix="/notifies",
    tags=["notifies"],
    responses={404: {"description": "Not found"}},
)

@router.get("/me", response_model=list[Notify])
def getAllNotify(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user = Depends(AuthUtil.getCurrentUser)):
    try:
        return NotifyController.getAllNotifies(db, owner_id=current_user.id, skip=skip, limit=limit)
    except Exception as error:
        logger.error(error)
        return error
