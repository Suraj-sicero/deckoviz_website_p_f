from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import get_db
from models import User
from schemas import ProfileUpdate, CollectionCreate, MediaCreate, DailyQueueSlotCreate
from auth import get_current_user
from firebase_config import (
    fs_get_profile,
    fs_save_profile,
    fs_get_collections,
    fs_create_collection,
    fs_update_collection,
    fs_add_collection_item,
    fs_delete_collection,
    fs_get_media,
    fs_save_media,
    fs_get_daily_queue,
    fs_save_daily_queue_slot
)

router = APIRouter(prefix="/webapp", tags=["Webapp - Firebase Firestore"])

@router.get("/profile")
def get_webapp_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    uid = current_user.firebase_uid or current_user.id
    profile_data = fs_get_profile(uid)
    if not profile_data:
        profile_data = {
            "userId": uid,
            "displayName": current_user.name or current_user.email.split('@')[0],
            "username": current_user.email.split('@')[0],
            "title": "Global Creator",
            "bio": "Creating visual media with Deckoviz",
            "avatar": current_user.avatar or f"https://ui-avatars.com/api/?name={current_user.email.split('@')[0]}&background=3f5fe0&color=fff",
            "banner": "https://picsum.photos/seed/deckovizbanner/1200/400",
            "followerCount": 0,
            "followingCount": 0,
            "postCount": 0
        }
        fs_save_profile(uid, profile_data)
    return profile_data

@router.put("/profile")
def update_webapp_profile(payload: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    uid = current_user.firebase_uid or current_user.id
    existing = fs_get_profile(uid) or {}
    
    for k, v in payload.items():
        if v is not None:
            existing[k] = v

    display_name = payload.get("displayName") or payload.get("display_name") or payload.get("name")
    if display_name:
        existing["displayName"] = display_name
        current_user.display_name = display_name
        current_user.name = display_name

    avatar = payload.get("avatar")
    if avatar:
        existing["avatar"] = avatar
        current_user.avatar = avatar

    saved = fs_save_profile(uid, existing)
    try:
        db.commit()
    except Exception:
        db.rollback()
    return saved

@router.get("/collections")
def get_webapp_collections(current_user: User = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    collections = fs_get_collections(uid)
    return collections

@router.post("/collections")
def create_webapp_collection(payload: dict, current_user: User = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    col_name = payload.get("name") or payload.get("title") or "Untitled Collection"

    raw_items = payload.get("items") or payload.get("images") or []
    if not raw_items and payload.get("item_ids"):
        raw_items = [{"itemId": item_id} for item_id in payload.get("item_ids")]

    formatted_items = []
    for idx, item in enumerate(raw_items):
        it_dict = item.dict(by_alias=True) if hasattr(item, "dict") else (item if isinstance(item, dict) else {})
        url = it_dict.get("url") or it_dict.get("mediaUrl") or it_dict.get("media_url")
        formatted_items.append({
            "id": it_dict.get("id") or f"img-{idx}",
            "itemType": it_dict.get("itemType") or "image",
            "title": it_dict.get("title") or col_name,
            "url": url,
            "mediaUrl": url,
            "displayHours": it_dict.get("displayHours") or "00:00:00",
            "displaySeconds": it_dict.get("displaySeconds") or "00:30",
            "metaNotes": it_dict.get("metaNotes") or ""
        })

    col_data = {
        "name": col_name,
        "title": col_name,
        "description": payload.get("description") or "",
        "musicUrl": payload.get("musicUrl") or payload.get("music_url"),
        "tags": payload.get("tags") or [],
        "displayMinutes": payload.get("displayMinutes") or payload.get("display_minutes") or 0,
        "displayHours": payload.get("displayHours") or payload.get("display_hours") or 0,
        "itemCount": len(formatted_items),
        "items": formatted_items
    }

    created = fs_create_collection(uid, col_data)
    return created

@router.post("/collections/{col_id}/items")
def add_webapp_collection_item(col_id: str, payload: dict, current_user: User = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    added = fs_add_collection_item(uid, col_id, payload)
    return added

@router.put("/collections/{col_id}")
def update_webapp_collection(col_id: str, payload: dict, current_user: User = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    updated = fs_update_collection(uid, col_id, payload)
    return updated

@router.delete("/collections/{id}")
def delete_webapp_collection(id: str, current_user: User = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    success = fs_delete_collection(uid, id)
    if not success:
        raise HTTPException(status_code=404, detail="Collection not found")
    return {"success": True, "message": "Collection deleted"}

@router.get("/media")
def get_webapp_media(
    type: str = Query(None),
    current_user: User = Depends(get_current_user)
):
    uid = current_user.firebase_uid or current_user.id
    media = fs_get_media(uid, media_type=type)
    return media

@router.get("/dailyqueue")
def get_webapp_daily_queue(current_user: User = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    queue = fs_get_daily_queue(uid)
    return queue
