from fastapi import Depends, APIRouter, status
from fastapi.responses import JSONResponse
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
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Internal Server Error"}
        )
