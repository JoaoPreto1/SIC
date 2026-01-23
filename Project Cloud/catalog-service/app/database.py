import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb+srv://Admin:hrpki5B151hqO1tL@sic.vx24183.mongodb.net/test"
)

client = AsyncIOMotorClient(MONGO_URI)
db = client.get_default_database()
