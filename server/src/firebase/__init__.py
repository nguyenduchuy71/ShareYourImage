import os
import firebase_admin
from firebase_admin import credentials
from dotenv import load_dotenv

FIREBASE_CONFIG_KEY = os.getenv('FIREBASE_CONFIG_KEY')

cred_path = os.path.join(os.path.dirname(__file__), FIREBASE_CONFIG_KEY)
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)
