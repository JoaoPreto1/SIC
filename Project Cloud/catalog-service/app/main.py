from fastapi import FastAPI
from .database import engine, Base
from .routers import catalog
import logging
import json
import sys

# Configure Logging
class JsonFormatter(logging.Formatter):
    def format(self, record):
        log_record = {
            "level": record.levelname,
            "message": record.getMessage(),
            "service": "catalog-service",
            "timestamp": self.formatTime(record, self.datefmt)
        }
        return json.dumps(log_record)

logger = logging.getLogger("catalog-service")
handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(JsonFormatter())
logger.addHandler(handler)
logger.setLevel(logging.INFO)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Catalog Service", description="Manage services offered by freelancers")

app.include_router(catalog.router)

@app.get("/health")
def health_check():
    logger.info("Health check requested")
    return {"status": "UP", "service": "Catalog Service"}
