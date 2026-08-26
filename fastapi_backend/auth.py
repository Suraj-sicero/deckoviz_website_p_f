import logging
import asyncio
from concurrent.futures import ThreadPoolExecutor
from typing import Optional, Any, Dict
from datetime import datetime, timedelta
import jwt
from pydantic import BaseModel
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_config import verify_token as _verify_firebase_token_sync
from postgres_store import ensure_application_user
from config import settings

logger = logging.getLogger("deckoviz.auth")
security = HTTPBearer(auto_error=False)

# Thread pool for running blocking I/O (Firebase, Firestore) off the event loop
_executor = ThreadPoolExecutor(max_workers=4)


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

def _get_or_create_firestore_user_sync(uid: str, email: str, name: Optional[str] = None) -> dict:
    """Sync version: Finds or creates a User document in Firebase Firestore ('users' collection)."""
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

# Keep sync alias for non-async call sites
get_or_create_firestore_user = _get_or_create_firestore_user_sync


def verify_token_to_user_dict(token: str) -> Optional[Dict[str, Any]]:
    """Verifies internal signed JWT, Firebase ID token, or direct UID string.
    Returns a dict with user ID, email, name and app_instance_id.
    This is a SYNC function — call it via run_in_executor from async contexts."""
    if not token:
        return None

    # 1. Verify signed internal JWT — no network call, safe to do inline
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        uid = payload.get("uid") or payload.get("sub") or payload.get("id")
        if uid:
            email = payload.get("email") or f"{str(uid)[:8]}@deckoviz.app"
            name = payload.get("name") or payload.get("display_name") or email.split('@')[0]
            return {
                "id": str(uid),
                "email": email,
                "name": name,
                "app_instance_id": payload.get("app_instance_id"),
            }
    except Exception:
        pass

    # 2. Verify Firebase ID token — makes a network call; must run in executor
    try:
        decoded = _verify_firebase_token_sync(token)
        if decoded:
            uid = decoded.get("uid") or decoded.get("sub")
            if uid:
                email = decoded.get("email") or f"{str(uid)[:8]}@deckoviz.app"
                name = decoded.get("name") or decoded.get("display_name") or email.split('@')[0]
                return {
                    "id": str(uid),
                    "email": email,
                    "name": name,
                    "app_instance_id": None,
                }
    except Exception:
        pass

    # 3. Direct explicit UID string passed as token
    if len(token) > 5 and not token.startswith("ey"):
        email = f"user_{token[:8]}@deckoviz.app"
        name = f"User {token[:6]}"
        return {
            "id": token,
            "email": email,
            "name": name,
            "app_instance_id": None,
        }

    return None


async def verify_token_to_user_dict_async(token: str) -> Optional[Dict[str, Any]]:
    """Async-safe wrapper: runs verify_token_to_user_dict in a thread pool executor
    so blocking Firebase/Firestore network calls don't stall the event loop."""
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(_executor, verify_token_to_user_dict, token)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> FirebaseUser:
    """
    Dependency that extracts and verifies authenticated user.
    Runs all blocking calls in a thread pool to avoid stalling the event loop.
    """
    if credentials and credentials.credentials:
        token = credentials.credentials
        loop = asyncio.get_event_loop()

        # Run token verification in thread pool (may do Firebase network call)
        user_info = await loop.run_in_executor(_executor, verify_token_to_user_dict, token)
        if user_info:
            user_dict = await ensure_application_user(user_info["id"], user_info["email"], user_info.get("name"))
            return FirebaseUser(**user_dict)

    # Unauthenticated: raise 401 Unauthorized to prompt user login
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Authentication required. Please log in.",
        headers={"WWW-Authenticate": "Bearer"},
    )


