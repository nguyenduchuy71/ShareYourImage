import os
from fastapi import APIRouter, Depends, status, HTTPException, UploadFile, File
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from firebase_admin import storage
from auth.utills import getCurrentUser
from firebase.storage import upload_file, remove_file
from items.controller import get_user, get_user_item, delete_user_item, share_friend_item, create_user_item
from db.database import get_db
from items.schema import CollectionShare, Item
from log.logger import logger

load_dotenv()

router = APIRouter(
    prefix="/items",
    tags=["items"],
    responses={404: {"description": "Not found"}},
)
bucket = storage.bucket(os.getenv('FIREBASE_STORAGE_BUCKET'))

@router.get("/", response_model=list[Item])
def get_collections(db: Session = Depends(get_db), current_user = Depends(getCurrentUser)):
    try:
        items = get_user_item(db=db, user_id=current_user.id)
        return items
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.post("/")
def post_collections(files: list[UploadFile] = File(...), db: Session = Depends(get_db), current_user = Depends(getCurrentUser)):
    try:
        for file in files:
            item = {'title': file.filename}
            create_user_item(db=db, item=item, user_id=current_user.id)
            destination_blob_name = f"{current_user.id}/{file.filename}"
            upload_file(bucket, file, destination_blob_name)
        return destination_blob_name
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.delete("/{ownerId}/{imagePath}")
def delete_collections(ownerId:str, imagePath:str, srcImage:str = '', db:Session = Depends(get_db), current_user = Depends(getCurrentUser)):
    try:
        item = delete_user_item(db=db, ownerId=ownerId, itemPath=imagePath, srcImage=srcImage)
        if item:
            blob_path = f"{ownerId}/{imagePath}"
            remove_file(bucket, blob_path)
        return status.HTTP_204_NO_CONTENT
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.post("/share/{friendId}")
def share_collection(friendId: str, item:CollectionShare, db: Session = Depends(get_db), current_user = Depends(getCurrentUser)):
    try:
        share_friend_item(db, current_user.id, friendId, item.srcImage)
        return status.HTTP_200_OK
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")
