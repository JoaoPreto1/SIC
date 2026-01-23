from bson import ObjectId
from .database import db
from .models import ServiceCreate, ServiceResponse

COLLECTION = db["services"]

async def create_service(service: ServiceCreate):
    doc = service.dict()
    result = await COLLECTION.insert_one(doc)
    return ServiceResponse(
        id=str(result.inserted_id),
        title=doc["title"],
        description=doc["description"],
        price=doc["price"],
        category=doc["category"],
        provider_id=doc.get("provider_id")
    )

async def get_services():
    services = []
    async for doc in COLLECTION.find():
        try:
            services.append(ServiceResponse(
                id=str(doc["_id"]),
                title=doc["title"],
                description=doc["description"],
                price=doc["price"],
                category=doc["category"],
                provider_id=doc["provider_id"]
            ))
        except Exception as e:
            print("Error converting doc to ServiceResponse:", doc, "error:", e)
    return services

async def get_service(service_id: str):
    doc = await COLLECTION.find_one({"_id": ObjectId(service_id)})
    if doc:
        try:
            return ServiceResponse(
                id=str(doc["_id"]),
                title=doc["title"],
                description=doc["description"],
                price=doc["price"],
                category=doc["category"],
                provider_id=doc["provider_id"]
            )
        except Exception as e:
            print(f"Error converting doc to ServiceResponse: {doc}, error: {e}")
    return None
