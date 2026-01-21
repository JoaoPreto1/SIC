from sqlalchemy import Column, Integer, String, Float
from .database import Base

class ServiceItem(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    category = Column(String)
    provider_id = Column(String) # Link to User Service/Auth
