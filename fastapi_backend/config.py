import os
from typing import List
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Local development reads fastapi_backend/.env; deployment uses environment variables.
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    PROJECT_NAME: str = "Deckoviz FastAPI Backend"
    API_V1_STR: str = "/api"
    # Required: prevents accidental fallback to local SQLite/PostgreSQL.
    DATABASE_URL: str = Field(..., min_length=1)
    DATABASE_CONNECT_ON_STARTUP: bool = True
    # S3 credentials are obtained from the Lightsail/deployment IAM role or the
    # standard AWS provider chain. Do not add access keys to application config.
    AWS_REGION: str = "eu-west-2"
    S3_MEDIA_BUCKET: str = Field(..., min_length=3)
    S3_MEDIA_PREFIX: str = "media/"
    S3_PRESIGNED_URL_EXPIRES_SECONDS: int = 3600
    S3_MAX_UPLOAD_BYTES: int = 25 * 1024 * 1024
    
    # Firebase Configuration
    FIREBASE_CREDENTIALS_JSON: str = os.getenv("FIREBASE_CREDENTIALS_JSON", "")
    FIREBASE_CREDENTIALS_FILE: str = os.getenv("FIREBASE_CREDENTIALS_FILE", "/etc/deckoviz/firebase-service-account.json")
    FIREBASE_STORAGE_BUCKET: str = os.getenv("FIREBASE_STORAGE_BUCKET", "deckoviz-app.appspot.com")
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "deckoviz_super_secret_jwt_key_2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "https://deckoviz-web-f.onrender.com",
        "https://deckoviz.com",
        "https://www.deckoviz.com",
        "http://deckoviz.com",
        "http://www.deckoviz.com/",
        "*"
    ]

settings = Settings()
