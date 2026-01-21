from pydantic import BaseModel

class ServiceCreate(BaseModel):
    title: str
    description: str
    price: float
    category: str
    provider_id: str

class ServiceResponse(ServiceCreate):
    id: int
    class Config:
        from_attributes = True
