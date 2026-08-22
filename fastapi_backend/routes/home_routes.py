from fastapi import APIRouter, Depends, HTTPException, Query
from auth import get_current_user, FirebaseUser
from postgres_store import (
    fs_get_profile,
    fs_get_collections,
    fs_create_collection,
    fs_update_collection,
    fs_add_collection_item,
    fs_delete_collection,
    fs_get_media,
    fs_get_daily_queue,
    fs_save_daily_queue_slot,
    fs_update_daily_queue_slot,
    fs_delete_daily_queue_slot,
    fs_get_events,
    fs_create_event,
    fs_update_event,
    fs_delete_event,
    fs_get_members,
    fs_create_member,
    fs_delete_member,
    fs_get_settings,
    fs_update_settings,
    fs_get_curations,
    fs_get_music,
    fs_create_music,
    fs_get_library,
    fs_get_journal,
    fs_create_journal,
    fs_delete_journal,
    fs_get_notes,
    fs_create_note,
    fs_delete_note
)

router = APIRouter(prefix="/home", tags=["Home Suite - Firebase Firestore"])

@router.get("/drawing-room")
def get_drawing_room_dashboard(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    profile = fs_get_profile(uid)
    collections = fs_get_collections(uid)
    queue = fs_get_daily_queue(uid)
    media = fs_get_media(uid)

    return {
        "profile": profile,
        "collections": collections,
        "activeCollection": collections[0] if collections else None,
        "dailyQueue": queue,
        "artworks": media
    }

@router.get("/collections")
def get_home_collections(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    collections = fs_get_collections(uid)
    return collections

@router.post("/collections")
def create_home_collection(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
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
def add_home_collection_item(col_id: str, payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    added = fs_add_collection_item(uid, col_id, payload)
    return added

@router.put("/collections/{col_id}")
def update_home_collection(col_id: str, payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    updated = fs_update_collection(uid, col_id, payload)
    return updated

@router.delete("/collections/{col_id}")
def delete_home_collection(col_id: str, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    success = fs_delete_collection(uid, col_id)
    return {"success": success}

@router.get("/dailyqueue")
@router.get("/daily-queue")
def get_home_daily_queue(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    queue = fs_get_daily_queue(uid)
    return queue

@router.post("/dailyqueue")
@router.post("/daily-queue")
def create_home_daily_queue(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    created = fs_save_daily_queue_slot(uid, payload)
    return created

@router.put("/dailyqueue/{slot_id}")
@router.put("/daily-queue/{slot_id}")
def update_home_daily_queue(slot_id: str, payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    updated = fs_update_daily_queue_slot(uid, slot_id, payload)
    return updated

@router.delete("/dailyqueue/{slot_id}")
@router.delete("/daily-queue/{slot_id}")
def delete_home_daily_queue(slot_id: str, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    success = fs_delete_daily_queue_slot(uid, slot_id)
    return {"success": success}

@router.get("/media")
def get_home_media(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    media = fs_get_media(uid)
    return media

@router.get("/events")
def get_home_events(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_events(uid)

@router.post("/events")
def create_home_event(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_create_event(uid, payload)

@router.put("/events/{event_id}")
def update_home_event(event_id: str, payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_update_event(uid, event_id, payload)

@router.delete("/events/{event_id}")
def delete_home_event(event_id: str, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    success = fs_delete_event(uid, event_id)
    return {"success": success}

@router.get("/members")
def get_home_members(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_members(uid)

@router.post("/members")
def create_home_member(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_create_member(uid, payload)

@router.delete("/members/{member_id}")
def delete_home_member(member_id: str, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    success = fs_delete_member(uid, member_id)
    return {"success": success}

# =========== SETTINGS ===========
@router.get("/settings")
def get_home_settings(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_settings(uid)

@router.put("/settings")
def update_home_settings(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    section = payload.get("section", "general")
    settings = payload.get("settings", {})
    return fs_update_settings(uid, section, settings)

# =========== CURATIONS ===========
@router.get("/curations")
def get_home_curations(type: str = "vizzy", current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_curations(uid, type)

# =========== MUSIC ===========
@router.get("/music")
def get_home_music(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_music(uid)

@router.post("/music")
def create_home_music(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_create_music(uid, payload)

# =========== LIBRARY ===========
@router.get("/library")
def get_home_library(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_library(uid)

# =========== JOURNAL ===========
@router.get("/journal")
def get_home_journal(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_journal(uid)

@router.post("/journal")
def create_home_journal(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_create_journal(uid, payload)

@router.delete("/journal/{entry_id}")
def delete_home_journal(entry_id: str, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return {"success": fs_delete_journal(uid, entry_id)}

# =========== NOTES ===========
@router.get("/notes")
def get_home_notes(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_notes(uid)

@router.post("/notes")
def create_home_note(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_create_note(uid, payload)

@router.delete("/notes/{note_id}")
def delete_home_note(note_id: str, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return {"success": fs_delete_note(uid, note_id)}

# =========== FAVORITES (STARRED COLLECTIONS & ARTWORKS) ===========
@router.get("/favorites")
def get_home_favorites(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    profile = fs_get_profile(uid) or {}
    favs = profile.get("favorites") or [
        {"id": "fav-col-1", "type": "collection", "name": "Morning Serenity", "title": "Morning Serenity", "coverUrl": "https://picsum.photos/seed/morning-serenity/600/400"},
        {"id": "fav-art-1", "type": "artwork", "name": "Starry Night Over the Rhône", "title": "Starry Night Over the Rhône", "url": "https://picsum.photos/seed/van-gogh-rhone/800/800"}
    ]
    return {
        "favorites": favs,
        "collections": [f for f in favs if f.get("type") == "collection"],
        "artworks": [f for f in favs if f.get("type") == "artwork"]
    }

@router.post("/favorites")
def add_home_favorite(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    profile = fs_get_profile(uid) or {"userId": uid}
    favs = profile.get("favorites") or []

    fav_item = {
        "id": payload.get("id") or f"fav_{Date.now()}",
        "type": payload.get("type") or "artwork",
        "name": payload.get("name") or payload.get("title") or "Starred Item",
        "title": payload.get("title") or payload.get("name") or "Starred Item",
        "url": payload.get("url") or payload.get("coverUrl") or "",
        "coverUrl": payload.get("coverUrl") or payload.get("url") or ""
    }

    if not any(f.get("id") == fav_item["id"] for f in favs):
        favs.append(fav_item)
        profile["favorites"] = favs
        from firebase_config import fs_save_profile
        fs_save_profile(uid, profile)

    return {"success": True, "favorites": favs}

# =========== CURRENT DISPLAYED COLLECTION & QUEUE ===========
@router.get("/current-collection")
def get_current_displayed_collection(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    collections = fs_get_collections(uid)
    active = collections[0] if collections else {
        "id": "col-active-1",
        "name": "Morning Serenity",
        "title": "Morning Serenity",
        "itemCount": 4,
        "items": [
          {"id": "item-1", "title": "Sunrise Horizon", "url": "https://picsum.photos/seed/morning-serenity/600/400", "displayHours": "00:00:00", "displaySeconds": "00:30"},
          {"id": "item-2", "title": "Zen Garden Light", "url": "https://picsum.photos/seed/zen-light/600/400", "displayHours": "00:00:00", "displaySeconds": "00:30"}
        ]
    }
    return {"currentCollection": active}

@router.get("/collection-queue")
def get_collection_queue(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    queue = fs_get_daily_queue(uid)
    return {"queue": queue, "total": len(queue), "maxQueueLimit": 20}

