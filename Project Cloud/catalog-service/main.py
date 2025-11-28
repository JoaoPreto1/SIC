from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import os

app = FastAPI(title="Catalog Service", description="Manage services offered by freelancers")

# Database Setup
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:pass@catalog-db:5432/catalogdb")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Model
class ServiceItem(Base):
    __tablename__ = "services"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    category = Column(String)
    provider_id = Column(String) # Link to User Service/Auth

# Create Tables
Base.metadata.create_all(bind=engine)

# Pydantic Schemas
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

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Routes
@app.get("/health")
def health_check():
    return {"status": "UP", "service": "Catalog Service"}

@app.post("/services/", response_model=ServiceResponse)
def create_service(service: ServiceCreate, db: Session = Depends(get_db)):
    db_service = ServiceItem(**service.model_dump())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

@app.get("/services/", response_model=list[ServiceResponse])
def read_services(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(ServiceItem).offset(skip).limit(limit).all()

@app.get("/services/{service_id}", response_model=ServiceResponse)
def read_service(service_id: int, db: Session = Depends(get_db)):
    service = db.query(ServiceItem).filter(ServiceItem.id == service_id).first()
    if service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return service
