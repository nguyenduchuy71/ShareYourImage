import os
import firebase_admin
from fastapi import UploadFile
from firebase_admin import credentials

cred_path = os.path.join(os.path.dirname(__file__), 'serviceAccountKey.json')
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

# Upload a file to Firebase Storage
def upload_file(bucket, file: UploadFile, destination_blob_name: str):
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_file(file.file)

# Delete a file to Firebase Storage
def remove_file(bucket, blob_path: str):
    blob = bucket.blob(blob_path)
    blob.delete()
