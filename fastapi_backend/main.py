import logging
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routes.auth_routes import router as auth_router
from routes.webapp_routes import router as webapp_router
from routes.home_routes import router as home_router
from routes.enterprise_routes import router as enterprise_router
from routes.vizzy_routes import router as vizzy_router
from routes.upload_routes import router as upload_router
from routes.pairing_routes import router as pairing_router
from routes.queue_routes import router as queue_router
from routes.curator_routes import router as curator_router
from routes.ws_routes import router as ws_router
from database import close_database, database_is_healthy

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("deckoviz.main")
logger.info("FastAPI service starting with PostgreSQL persistence and Firebase Auth.")

@asynccontextmanager
async def lifespan(app: FastAPI):
    if settings.DATABASE_CONNECT_ON_STARTUP and not await database_is_healthy():
        raise RuntimeError("Database connectivity check failed")
    yield
    await close_database()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="FastAPI Backend for Home Webapp & Enterprise Webapp with Firebase Auth and private S3 media storage",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers under /api
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(webapp_router, prefix=settings.API_V1_STR)
app.include_router(home_router, prefix=settings.API_V1_STR)
app.include_router(enterprise_router, prefix=settings.API_V1_STR)
app.include_router(vizzy_router, prefix=settings.API_V1_STR)
app.include_router(upload_router, prefix=settings.API_V1_STR)
app.include_router(pairing_router, prefix=settings.API_V1_STR)
app.include_router(queue_router, prefix=settings.API_V1_STR)
app.include_router(curator_router, prefix=settings.API_V1_STR)
app.include_router(ws_router)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "docs": "/docs",
        "version": "1.0.0"
    }

@app.get("/api/health")
async def health_check():
    connected = await database_is_healthy()
    return {
        "status": "healthy" if connected else "degraded",
        "database": "connected" if connected else "unavailable",
        "mediaStorage": "s3",
        "s3Bucket": settings.S3_MEDIA_BUCKET,
        "deployCommit": os.getenv("RENDER_GIT_COMMIT") or os.getenv("GIT_COMMIT") or "unknown",
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
