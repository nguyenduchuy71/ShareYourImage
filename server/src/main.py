import os
import signal
import uvicorn
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from users.router import router as userRouter
from auth.router import router as authRouter
from notify.router import router as notifyRouter
from items.router import router as itemRouter
from db import database
from apitally.fastapi import ApitallyMiddleware
from dotenv import load_dotenv
from log.logger import logger

database.Base.metadata.create_all(bind=database.engine)

load_dotenv()
APITALLY_KEY = os.getenv('APITALLY_KEY')
PORT = os.getenv('PORT')

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

# Optional: Add startup and shutdown events
@app.on_event("startup")
async def startup_event():
    logger.info("Starting up the application")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down the application")

def signal_handler(sig, frame):
    logger.info("Received termination signal, shutting down gracefully...")
    sys.exit(0)

# Register signal handlers
signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

@app.get('/')
def root():
    return {'message': "Hello, welcome to FastAPI"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=PORT, reload=True, host='0.0.0.0')
