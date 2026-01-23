from fastapi import APIRouter, HTTPException
from typing import List
from .. import crud, models

router = APIRouter(prefix="/services", tags=["catalog"])

@router.post("/", response_model=models.ServiceResponse)
async def create_service(service: models.ServiceCreate):
    return await crud.create_service(service)

@router.get("/", response_model=List[models.ServiceResponse])
async def get_services():
    return await crud.get_services()

@router.get("/{service_id}", response_model=models.ServiceResponse)
async def read_service(service_id: str):
    service = await crud.get_service(service_id)
    if service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return service
