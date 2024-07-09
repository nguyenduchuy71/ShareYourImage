import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from users.router import router as userRouter
from auth.router import router as authRouter
from notify.router import router as notifyRouter
from items.router import router as itemRouter
from db import database
from apitally.fastapi import ApitallyMiddleware
from dotenv import load_dotenv

database.Base.metadata.create_all(bind=database.engine)

load_dotenv()
APITALLY_KEY = os.getenv('APITALLY_KEY')

app = FastAPI()
app.add_middleware(
    ApitallyMiddleware,
    client_id="APITALLY_KEY",
    env="dev",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(userRouter)
app.include_router(authRouter)
app.include_router(notifyRouter)
app.include_router(itemRouter)

@app.get('/')
def root():
    return {'message': "Hello, welcome to FastAPI"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=8888, reload=True, host='0.0.0.0')
