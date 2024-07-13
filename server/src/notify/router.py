from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from db.database import get_db
from notify.schema import Notify
from notify.controller import getAllNotifies
from auth.utills import getCurrentUser
from log.logger import logger

router = APIRouter(
    prefix="/notifies",
    tags=["notifies"],
    responses={404: {"description": "Not found"}},
)

@router.get("/me", response_model=list[Notify])
def getAllNotify(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user = Depends(getCurrentUser)):
    try:
        notifies = getAllNotifies(db, owner_id=current_user.id, skip=skip, limit=limit)
        return notifies
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")
