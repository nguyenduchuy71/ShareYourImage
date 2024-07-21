from kafka import KafkaConsumer
from log.logger import logger

consumer = KafkaConsumer('order_details', bootstrap_servers='localhost:29092')

class Consumer:
    def run():
        while True:
            for message in consumer:
                logger.info("This is message:", message)
