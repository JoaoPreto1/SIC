from sqlalchemy.orm import Session
from . import models, schemas

def get_service(db: Session, service_id: int):
    return db.query(models.ServiceItem).filter(models.ServiceItem.id == service_id).first()

def get_services(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.ServiceItem).offset(skip).limit(limit).all()

def create_service(db: Session, service: schemas.ServiceCreate):
    db_service = models.ServiceItem(**service.model_dump())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service
