import logging
from typing import Optional
from pydantic import BaseModel
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_config import verify_token, get_firestore_db

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

def get_or_create_firestore_user(uid: str, email: str, name: Optional[str] = None) -> dict:
    """Finds or creates a User document in Firebase Firestore ('users' collection)."""
    db = get_firestore_db()
    clean_email = email or f"user_{uid[:8]}@deckoviz.app"
    user_name = name or clean_email.split('@')[0]
    avatar_url = f"https://ui-avatars.com/api/?name={user_name}&background=3f5fe0&color=fff"

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
    """Dependency that extracts and verifies authenticated Firebase user."""
    if not credentials or not credentials.credentials:
        # Fallback for guest session
        guest_data = get_or_create_firestore_user("guest_user", "guest@deckoviz.app", "Guest User")
        return FirebaseUser(**guest_data)
    
    token = credentials.credentials
    
    # 1. Verify token with Firebase Admin SDK
    decoded = verify_token(token)
    if decoded:
        uid = decoded.get("uid") or decoded.get("sub") or "user_anon"
        email = decoded.get("email") or f"{uid[:8]}@deckoviz.app"
        name = decoded.get("name") or decoded.get("display_name") or email.split('@')[0]
        user_dict = get_or_create_firestore_user(uid, email, name)
        return FirebaseUser(**user_dict)

    # 2. Unverified JWT payload fallback
    try:
        import jwt
        unverified = jwt.decode(token, options={"verify_signature": False})
        uid = unverified.get("uid") or unverified.get("sub") or unverified.get("user_id") or "user_anon"
        email = unverified.get("email") or f"{uid[:8]}@deckoviz.app"
        name = unverified.get("name") or unverified.get("display_name") or email.split('@')[0]
        user_dict = get_or_create_firestore_user(uid, email, name)
        return FirebaseUser(**user_dict)
    except Exception:
        pass

    # 3. Fallback if direct UID passed
    if len(token) > 5 and not token.startswith("ey"):
        user_dict = get_or_create_firestore_user(token, f"user_{token[:8]}@deckoviz.app", f"User {token[:6]}")
        return FirebaseUser(**user_dict)

    # 4. Default Guest Fallback
    guest_data = get_or_create_firestore_user("guest_user", "guest@deckoviz.app", "Guest User")
    return FirebaseUser(**guest_data)
