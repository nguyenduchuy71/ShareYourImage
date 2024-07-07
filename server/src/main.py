import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from users.router import router as userRouter
from auth.router import router as authRouter
from notify.router import router as notifyRouter
from items.router import router as itemRouter
from db import database

database.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

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
