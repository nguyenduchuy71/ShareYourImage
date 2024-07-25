import os
from fastapi import APIRouter, Depends, status, HTTPException, UploadFile, File
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from firebase_admin import storage
from auth.utills import AuthUtil
from firebase.storage import StorageControler
from items.controller import ItemController
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
storageController = StorageControler(bucket)

@router.get("/", response_model=list[Item])
def getCollections(db: Session = Depends(get_db), current_user = Depends(AuthUtil.getCurrentUser)):
    try:
        items = ItemController.get_user_item(db=db, user_id=current_user.id)
        return items
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.post("/")
def postCollections(files: list[UploadFile] = File(...), db: Session = Depends(get_db), current_user = Depends(AuthUtil.getCurrentUser)):
    try:
        listFileUpload = []
        for file in files:
            item = {'title': file.filename}
            itemInfo = ItemController.create_user_item(db=db, item=item, user_id=current_user.id)
            destination_blob_name = f"{current_user.id}/{file.filename}"
            storageController.upload_file(file, destination_blob_name)
            listFileUpload.append(destination_blob_name)
        return listFileUpload
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.delete("/{ownerId}/{imagePath}")
def deleteCollections(ownerId:str, imagePath:str, srcImage:str = '', db:Session = Depends(get_db), current_user = Depends(AuthUtil.getCurrentUser)):
    try:
        item = ItemController.delete_user_item(db=db, ownerId=ownerId, itemPath=imagePath, srcImage=srcImage)
        if item:
            blob_path = f"{ownerId}/{imagePath}"
            storageController.remove_file(blob_path)
            return status.HTTP_204_NO_CONTENT
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="items not found")
    except Exception as error:
        logger.error(error)
        return error

@router.post("/share/{friendId}")
def shareCollection(friendId: str, item:CollectionShare, db: Session = Depends(get_db), current_user = Depends(AuthUtil.getCurrentUser)):
    try:
        itemShare = ItemController.share_friend_item(db, current_user.id, friendId, item.srcImage)
        if itemShare:
            return status.HTTP_200_OK
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="items not found")
    except Exception as error:
        logger.error(error)
        return error
