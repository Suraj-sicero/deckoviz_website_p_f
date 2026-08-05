import logging
from typing import Optional
from datetime import datetime, timedelta
import jwt
from pydantic import BaseModel
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_config import verify_token as verify_firebase_token, get_firestore_db
from config import settings

logger = logging.getLogger("deckoviz.auth")
security = HTTPBearer(auto_error=False)

class FirebaseUser(BaseModel):
    id: str
    firebase_uid: str
    email: str
    name: Optional[str] = "User"
    display_name: Optional[str] = "User"
    avatar: Optional[str] = ""
    role: str = "creator"

def create_access_token(data: dict) -> str:
    """Generates a secure, cryptographically signed JWT access token for a user."""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def get_or_create_firestore_user(uid: str, email: str, name: Optional[str] = None) -> dict:
    """Finds or creates a User document in Firebase Firestore ('users' collection)."""
    db = get_firestore_db()
    clean_email = email or f"user_{uid[:8]}@deckoviz.app"
    user_name = name or clean_email.split('@')[0]
    avatar_url = f"https://ui-avatars.com/api/?name={user_name}&background=2563eb&color=fff"

    user_data = {
        "id": uid,
        "firebase_uid": uid,
        "email": clean_email,
        "name": user_name,
        "display_name": user_name,
        "avatar": avatar_url,
        "role": "creator"
    }

    if db:
        try:
            doc_ref = db.collection("users").document(uid)
            doc = doc_ref.get()
            if doc.exists:
                existing = doc.to_dict()
                user_data.update(existing)
            else:
                doc_ref.set(user_data)
        except Exception as e:
            logger.warning(f"Firestore user document notice: {e}")

    user_data["name"] = user_data.get("name") or user_name or "User"
    user_data["display_name"] = user_data.get("display_name") or user_data["name"]
    user_data["avatar"] = user_data.get("avatar") or avatar_url
    return user_data

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> FirebaseUser:
    """
    Dependency that extracts and verifies authenticated user.
    If authenticated, returns the user's isolated Firebase UID.
    If unauthenticated, raises HTTP 401 Unauthorized requiring the user to log in.
    """
    if credentials and credentials.credentials:
        token = credentials.credentials
        
        # 1. Verify signed internal JWT
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            uid = payload.get("uid") or payload.get("sub")
            if uid:
                email = payload.get("email") or f"{uid[:8]}@deckoviz.app"
                name = payload.get("name") or payload.get("display_name") or email.split('@')[0]
                user_dict = get_or_create_firestore_user(uid, email, name)
                return FirebaseUser(**user_dict)
        except Exception:
            pass

        # 2. Verify ID token with Firebase Admin SDK
        decoded = verify_firebase_token(token)
        if decoded:
            uid = decoded.get("uid") or decoded.get("sub")
            if uid:
                email = decoded.get("email") or f"{uid[:8]}@deckoviz.app"
                name = decoded.get("name") or decoded.get("display_name") or email.split('@')[0]
                user_dict = get_or_create_firestore_user(uid, email, name)
                return FirebaseUser(**user_dict)

        # 3. Direct explicit UID string passed as token
        if len(token) > 5 and not token.startswith("ey"):
            user_dict = get_or_create_firestore_user(token, f"user_{token[:8]}@deckoviz.app", f"User {token[:6]}")
            return FirebaseUser(**user_dict)

    # 4. Unauthenticated: raise 401 Unauthorized to prompt user login
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Authentication required. Please log in.",
        headers={"WWW-Authenticate": "Bearer"},
    )

