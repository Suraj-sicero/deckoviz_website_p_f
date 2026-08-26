import uuid
from datetime import datetime
from typing import Optional, List, Tuple, Dict
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from auth import get_current_user, FirebaseUser
from firebase_config import get_firestore_db

router = APIRouter(prefix="/daily-curator", tags=["Daily Curator"])

# ---------- Sample Data Defaults ----------
DEFAULT_ARTWORKS = [
    {
        "id": "art-1",
        "title": "Cosmic Harmony",
        "artist": "Deckoviz AI Studio",
        "imageUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80",
        "category": "Surrealism",
        "style": "Digital Oil",
        "description": "A vibrant exploration of cosmic light and color harmony."
    },
    {
        "id": "art-2",
        "title": "Neon Reflections",
        "artist": "Cybernetic Visionary",
        "imageUrl": "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
        "category": "Cyberpunk",
        "style": "Neon Glow",
        "description": "Futuristic urban lights reflecting off rain-slicked streets."
    },
    {
        "id": "art-3",
        "title": "Serene Waves",
        "artist": "Nature Canvas",
        "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        "category": "Landscape",
        "style": "Minimalist Ambient",
        "description": "Tranquil coastal horizons at dusk."
    }
]

DEFAULT_COLLECTIONS = [
    {
        "id": "col-1",
        "name": "Ambient Chillout",
        "description": "Curated relaxing visual and audio soundscapes."
    },
    {
        "id": "col-2",
        "name": "Modern Minimalist",
        "description": "Clean aesthetics and geometric design inspiration."
    }
]

# ---------- Helper Functions ----------
def get_daily_items_for_user(uid: str, date_str: str) -> Tuple[List[Dict], List[Dict]]:
    db = get_firestore_db()
    saved_ids = set()
    liked_ids = set()

    if db:
        try:
            saved_docs = db.collection("daily_curator_saved").where("userId", "==", uid).get()
            saved_ids = {d.to_dict().get("itemId") for d in saved_docs}
            liked_docs = db.collection("daily_curator_likes").where("userId", "==", uid).get()
            liked_ids = {d.to_dict().get("itemId") for d in liked_docs}
        except Exception:
            pass

    artworks = []
    for idx, art in enumerate(DEFAULT_ARTWORKS):
        art_id = art["id"]
        artworks.append({
            "id": f"item-art-{art_id}",
            "userId": uid,
            "itemType": "artwork",
            "itemId": art_id,
            "displayDate": date_str,
            "order": idx + 1,
            "seenAt": None,
            "data": art,
            "music": None,
            "saved": art_id in saved_ids,
            "liked": art_id in liked_ids
        })

    collections = []
    for idx, col in enumerate(DEFAULT_COLLECTIONS):
        col_id = col["id"]
        collections.append({
            "id": f"item-col-{col_id}",
            "userId": uid,
            "itemType": "collection",
            "itemId": col_id,
            "displayDate": date_str,
            "order": idx + 1,
            "seenAt": None,
            "data": col,
            "music": None,
            "saved": col_id in saved_ids,
            "liked": col_id in liked_ids
        })

    return artworks, collections

# ---------- Endpoints ----------

@router.get("/me")
def get_my_daily_curation(
    date: Optional[str] = Query(None),
    current_user: FirebaseUser = Depends(get_current_user)
):
    uid = current_user.firebase_uid or current_user.id
    display_date = date or datetime.utcnow().strftime("%Y-%m-%d")
    artworks, collections = get_daily_items_for_user(uid, display_date)
    return {
        "displayDate": display_date,
        "artworks": artworks,
        "collections": collections
    }

@router.get("/music")
def get_curated_music(current_user: FirebaseUser = Depends(get_current_user)):
    from firebase_config import fs_get_music
    uid = current_user.firebase_uid or current_user.id
    tracks = fs_get_music(uid)
    if not tracks:
        tracks = [
            {"id": "tr-1", "title": "Ambient Moonlight Chill", "artist": "Deckoviz Soundscapes", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", "category": "ambient"},
            {"id": "tr-2", "title": "Classical Piano Serenade", "artist": "Chopin Ensemble", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", "category": "classical"}
        ]
    return {"tracks": tracks}

@router.get("/curations")
def get_curated_artworks_collections(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    display_date = datetime.utcnow().strftime("%Y-%m-%d")
    artworks, collections = get_daily_items_for_user(uid, display_date)
    return {
        "artworks": artworks,
        "collections": collections,
        "curatedAt": display_date
    }


@router.post("/me/items/{item_id}/seen")
def mark_item_seen(item_id: str, current_user: FirebaseUser = Depends(get_current_user)):
    return {"success": True}

@router.get("/me/saved")
def get_my_saved(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    artworks, collections = get_daily_items_for_user(uid, datetime.utcnow().strftime("%Y-%m-%d"))
    saved_items = [item for item in artworks + collections if item.get("saved")]
    return {"items": saved_items}

class ItemActionPayload(BaseModel):
    itemType: str = "artwork"
    itemId: str

@router.post("/me/saved")
def save_item(payload: ItemActionPayload, current_user: FirebaseUser = Depends(get_current_user)):
    db = get_firestore_db()
    uid = current_user.firebase_uid or current_user.id
    doc_id = f"{uid}_{payload.itemId}"
    if db:
        try:
            db.collection("daily_curator_saved").document(doc_id).set({
                "userId": uid,
                "itemId": payload.itemId,
                "itemType": payload.itemType,
                "savedAt": datetime.utcnow().isoformat()
            })
        except Exception:
            pass
    return {"success": True, "saved": True, "liked": False}

@router.delete("/me/saved/{item_id}")
def unsave_item(item_id: str, itemType: str = "artwork", current_user: FirebaseUser = Depends(get_current_user)):
    db = get_firestore_db()
    uid = current_user.firebase_uid or current_user.id
    doc_id = f"{uid}_{item_id}"
    if db:
        try:
            db.collection("daily_curator_saved").document(doc_id).delete()
        except Exception:
            pass
    return {"success": True, "saved": False}

@router.post("/me/like")
def toggle_like(payload: ItemActionPayload, current_user: FirebaseUser = Depends(get_current_user)):
    db = get_firestore_db()
    uid = current_user.firebase_uid or current_user.id
    doc_id = f"{uid}_{payload.itemId}"
    liked = True
    if db:
        try:
            doc_ref = db.collection("daily_curator_likes").document(doc_id)
            doc = doc_ref.get()
            if doc.exists:
                doc_ref.delete()
                liked = False
            else:
                doc_ref.set({
                    "userId": uid,
                    "itemId": payload.itemId,
                    "itemType": payload.itemType,
                    "likedAt": datetime.utcnow().isoformat()
                })
        except Exception:
            pass
    return {"success": True, "liked": liked}

# ---------- Admin Endpoints ----------

@router.get("/admin/users")
def admin_list_users(search: Optional[str] = None, current_user: FirebaseUser = Depends(get_current_user)):
    return {
        "users": [
            {
                "id": current_user.firebase_uid or current_user.id,
                "email": current_user.email,
                "tier": "creator",
                "isAdmin": True
            }
        ]
    }

@router.get("/admin/library")
def admin_get_library(current_user: FirebaseUser = Depends(get_current_user)):
    return {
        "artworks": DEFAULT_ARTWORKS,
        "collections": DEFAULT_COLLECTIONS
    }

@router.get("/admin/users/{user_id}/items")
def admin_get_user_items(user_id: str, date: Optional[str] = None, current_user: FirebaseUser = Depends(get_current_user)):
    display_date = date or datetime.utcnow().strftime("%Y-%m-%d")
    artworks, collections = get_daily_items_for_user(user_id, display_date)
    return {
        "displayDate": display_date,
        "items": artworks + collections
    }

class AdminAddItemPayload(BaseModel):
    userId: str
    itemType: str
    itemId: str
    displayDate: Optional[str] = None
    order: Optional[int] = 1

@router.post("/admin/items")
def admin_add_item(payload: AdminAddItemPayload, current_user: FirebaseUser = Depends(get_current_user)):
    display_date = payload.displayDate or datetime.utcnow().strftime("%Y-%m-%d")
    art = next((a for a in DEFAULT_ARTWORKS if a["id"] == payload.itemId), DEFAULT_ARTWORKS[0])
    item = {
        "id": f"item-admin-{payload.itemId}",
        "userId": payload.userId,
        "itemType": payload.itemType,
        "itemId": payload.itemId,
        "displayDate": display_date,
        "order": payload.order or 1,
        "seenAt": None,
        "data": art,
        "music": None,
        "saved": False,
        "liked": False
    }
    return {"success": True, "created": True, "item": item}
