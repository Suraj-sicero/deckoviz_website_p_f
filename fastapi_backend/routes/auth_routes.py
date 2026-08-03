from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from auth import get_current_user, FirebaseUser, create_access_token
from firebase_config import (
    create_firebase_auth_user,
    fs_get_profile,
    fs_save_profile,
    verify_token
)

router = APIRouter(prefix="/auth", tags=["Authentication - Firebase Auth & Firestore"])

class SignupPayload(BaseModel):
    email: str
    firebase_uid: Optional[str] = None
    name: Optional[str] = None
    password: Optional[str] = None

class SigninPayload(BaseModel):
    email: Optional[str] = None
    id_token: Optional[str] = None
    password: Optional[str] = None

@router.post("/signup")
def signup(payload: SignupPayload):
    if not payload.email or not payload.password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email and password are required for signup")
    
    clean_email = payload.email.strip().lower()
    
    # 1. Create User in Firebase Authentication Console & Firestore Database
    user_dict = create_firebase_auth_user(
        email=clean_email,
        password=payload.password,
        name=payload.name
    )
    uid = user_dict["firebase_uid"]

    # 2. Generate secure cryptographically signed JWT token for this user
    access_token = create_access_token({"uid": uid, "sub": uid, "email": clean_email, "name": user_dict["name"]})

    return {
        "token": access_token,
        "user": user_dict
    }

@router.post("/signin")
def signin(payload: SigninPayload):
    # If Firebase ID token is provided
    if payload.id_token:
        decoded = verify_token(payload.id_token)
        if decoded:
            uid = decoded.get("uid")
            email = decoded.get("email") or payload.email or f"{uid[:8]}@deckoviz.app"
            name = decoded.get("name") or email.split('@')[0] if email else "User"
            user_dict = create_firebase_auth_user(email=email, name=name)
            access_token = create_access_token({"uid": uid, "sub": uid, "email": email, "name": name})
            return {"token": access_token, "user": user_dict}

    if not payload.email or not payload.password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email and password are required for signin")
    
    clean_email = payload.email.strip().lower()

    # Fetch/Create User in Firebase Auth & Firestore
    user_dict = create_firebase_auth_user(
        email=clean_email,
        password=payload.password,
        name=clean_email.split('@')[0]
    )

    uid = user_dict["firebase_uid"]
    access_token = create_access_token({"uid": uid, "sub": uid, "email": clean_email, "name": user_dict["name"]})

    return {
        "token": access_token,
        "user": user_dict
    }

@router.get("/me")
def get_me(current_user: FirebaseUser = Depends(get_current_user)):
    return current_user.dict()

@router.get("/profile")
def get_profile(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    profile = fs_get_profile(uid)
    if not profile:
        profile = {
            "userId": uid,
            "displayName": current_user.display_name or current_user.name,
            "username": current_user.email.split('@')[0],
            "avatar": current_user.avatar,
            "title": "Global Creator",
            "bio": "Creating visual media with Deckoviz"
        }
        fs_save_profile(uid, profile)

    return {
        "user": current_user.dict(),
        "profile": profile
    }

@router.put("/profile")
def update_profile(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    saved = fs_save_profile(uid, payload)
    return saved
