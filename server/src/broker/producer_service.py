import json
from kafka import KafkaProducer

ORDER_KAFKA_TOPIC = "order_details"
# producer = KafkaProducer(bootstrap_servers="localhost:29092")

# def send_require_add_friend(friendInfo):
#     producer.send(ORDER_KAFKA_TOPIC, json.dumps(friendInfo).encode("utf-8"))
#     producer.flush()
