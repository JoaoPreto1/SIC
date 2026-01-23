from fastapi import APIRouter, HTTPException
from typing import List
from .. import crud, models

router = APIRouter(
    prefix="/services",
    tags=["Catálogo de Serviços"],  # Categoria no Swagger
    responses={404: {"description": "Recurso não encontrado"}}
)

@router.post(
    "/",
    response_model=models.ServiceResponse,
    summary="Cria um novo serviço",
    description="""
    Cria um novo serviço no catálogo.
    Forneça título, descrição, preço e categoria.
    O `provider_id` é associado ao prestador que cria o serviço.
    """
)
async def create_service(service: models.ServiceCreate):
    return await crud.create_service(service)


@router.get(
    "/",
    response_model=List[models.ServiceResponse],
    summary="Lista todos os serviços",
    description="Retorna uma lista completa de todos os serviços disponíveis no catálogo."
)
async def get_services():
    return await crud.get_services()


@router.get(
    "/{service_id}",
    response_model=models.ServiceResponse,
    summary="Obtém detalhes de um serviço",
    description="Busca um serviço específico pelo seu ID único."
)
async def read_service(service_id: str):
    service = await crud.get_service(service_id)
    if service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return service
