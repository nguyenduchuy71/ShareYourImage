import asyncio
import os
import signal
import sys
import json
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
from confluent_kafka import Consumer, KafkaError
from kafka import KafkaConsumer


load_dotenv()
app = FastAPI()
database.Base.metadata.create_all(bind=database.engine)
consumer = KafkaConsumer('order_details', bootstrap_servers='localhost:29092')

# KAFKA_BROKER = 'localhost:9092'
# KAFKA_TOPIC = 'order_topic'
# CONSUMER_GROUP = 'group_1'

# consumer_conf = {
#     'bootstrap.servers': KAFKA_BROKER,
#     'group.id': CONSUMER_GROUP,
#     'auto.offset.reset': 'earliest'
# }
# consumer = Consumer(consumer_conf)


# APITALLY_KEY = os.getenv('APITALLY_KEY')
# app.add_middleware(
#     ApitallyMiddleware,
#     client_id="APITALLY_KEY",
#     env="dev",
# )

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

@app.on_event("startup")
async def start_consumer():
    def consume_messages():
        # consumer.subscribe([KAFKA_TOPIC])
        # while True:
        #     msg = consumer.poll(1.0)
        #     if msg is None:
        #         continue
        #     if msg.error():
        #         if msg.error().code() == KafkaError._PARTITION_EOF:
        #             continue
        #         else:
        #             logger.error(f"Consumer error: {msg.error()}")
        #             break
        #     order_data = json.loads(msg.value().decode('utf-8'))
        #     logger.info(f"Received order: {order_data}")
        while True:
            for message in consumer:
                logger.info("Here is a message..")
                logger.info(message)

    loop = asyncio.get_event_loop()
    loop.run_in_executor(None, consume_messages)

@app.on_event("shutdown")
def shutdown_event():
    logger.info("Shutting down the application")
    consumer.close()
    sys.exit(1)

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
    import uvicorn
    uvicorn.run("main:app", port=8888, reload=True, host='0.0.0.0')
