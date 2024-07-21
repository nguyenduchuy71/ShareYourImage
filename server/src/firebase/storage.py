import os
import firebase_admin
from fastapi import UploadFile
from firebase_admin import credentials

cred_path = os.path.join(os.path.dirname(__file__), 'serviceAccountKey.json')
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

class StorageControler:
    bucket = None
    config = None

    def __init__(self, bucket):
        self.bucket = bucket

    # Upload a file to Firebase Storage
    def upload_file(self, file: UploadFile, destination_blob_name: str):
        try:
            blob = self.bucket.blob(destination_blob_name)
            blob.upload_from_file(file.file)
        except Exception as error:
            raise error

    # Delete a file to Firebase Storage
    def remove_file(self, blob_path: str):
        try:
            blob = self.bucket.blob(blob_path)
            blob.delete()
        except Exception as error:
            raise error
