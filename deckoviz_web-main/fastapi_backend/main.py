import logging
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
from routes.schedule_routes import router as schedule_router
from routes.ws_routes import router as ws_router

from services.scheduler import start_scheduler, stop_scheduler

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("deckoviz.main")
logger.info("FastAPI service starting using 100% Firebase Firestore backend.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="FastAPI Backend for Home Webapp & Enterprise Webapp with Firebase Auth & Firebase Storage",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

@app.on_event("startup")
async def startup_event():
    start_scheduler()

@app.on_event("shutdown")
async def shutdown_event():
    stop_scheduler()

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
app.include_router(schedule_router, prefix=settings.API_V1_STR)
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
def health_check():
    return {
        "status": "healthy",
        "database": "connected"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
