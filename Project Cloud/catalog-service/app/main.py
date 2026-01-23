from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import catalog
import logging
from pythonjsonlogger import jsonlogger

# -------------------------------
# Logger JSON
# -------------------------------
logger = logging.getLogger()
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
logger.setLevel(logging.INFO)

# -------------------------------
# FastAPI app
# -------------------------------
app = FastAPI(title="Catalog Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas
app.include_router(catalog.router)

# Health check
@app.get("/health")
async def health():
    return {"status": "ok"}
