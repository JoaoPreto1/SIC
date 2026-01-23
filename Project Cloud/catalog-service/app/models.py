from pydantic import BaseModel, Field

class ServiceBase(BaseModel):
    title: str
    description: str
    price: float
    category: str

class ServiceCreate(ServiceBase):
    pass

class ServiceResponse(ServiceBase):
    id: str = Field(alias="_id")
    provider_id: str

    model_config = {
        "populate_by_name": True,
    }

