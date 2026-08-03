import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Deckoviz FastAPI Backend"
    API_V1_STR: str = "/api"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./deckoviz.db")
    
    # Firebase Configuration
    FIREBASE_CREDENTIALS_JSON: str = os.getenv("FIREBASE_CREDENTIALS_JSON", "")
    FIREBASE_CREDENTIALS_FILE: str = os.getenv("FIREBASE_CREDENTIALS_FILE", "firebase-service-account.json")
    FIREBASE_STORAGE_BUCKET: str = os.getenv("FIREBASE_STORAGE_BUCKET", "deckoviz-app.appspot.com")
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "deckoviz_super_secret_jwt_key_2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "https://deckoviz-web-f.onrender.com",
        "https://deckoviz.com",
        "https://www.deckoviz.com",
        "http://deckoviz.com",
        "http://www.deckoviz.com",
        "*"
    ]

settings = Settings()
