from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user, FirebaseUser
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
    fs_get_curations,
    fs_create_curation,
    fs_get_events,
    fs_create_event,
    fs_update_event,
    fs_delete_event,
    fs_get_notes,
    fs_create_note,
    fs_get_music,
    fs_get_library,
    fs_get_daily_queue,
    fs_save_daily_queue_slot,
    fs_update_daily_queue_slot,
    fs_delete_daily_queue_slot,
    fs_get_enterprise_units,
    fs_create_enterprise_unit,
    fs_update_enterprise_unit,
    fs_delete_enterprise_unit,
    fs_get_enterprise_guests,
    fs_create_enterprise_guest,
    fs_update_enterprise_guest,
    fs_delete_enterprise_guest,
    fs_get_enterprise_templates,
    fs_create_enterprise_template,
    fs_update_enterprise_template,
    fs_delete_enterprise_template,
    fs_get_enterprise_narrations,
    fs_create_enterprise_narration,
    fs_delete_enterprise_narration
)

router = APIRouter(prefix="/enterprise", tags=["Enterprise Suite - Firebase Firestore"])

# =========== PROFILE ===========
@router.get("/profile")
def get_enterprise_profile(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    profile = fs_get_profile(uid)
    if not profile:
        profile = {
            "userId": uid,
            "displayName": current_user.name or "Enterprise User",
            "company": "Deckoviz Space",
            "tier": "Enterprise",
            "activeDisplays": 1
        }
        fs_save_profile(uid, profile)
    return profile

@router.put("/profile")
def update_enterprise_profile(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    existing = fs_get_profile(uid) or {}
    for k, v in payload.items():
        if v is not None: existing[k] = v
    return fs_save_profile(uid, existing)

# =========== DASHBOARD ===========
@router.get("/dashboard")
def get_enterprise_dashboard(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    profile_raw = fs_get_profile(uid)
    collections = fs_get_collections(uid)
    curations = fs_get_curations(uid)
    events_raw = fs_get_events(uid)
    notes = fs_get_notes(uid)
    units_raw = fs_get_enterprise_units(uid)

    # Build profile in the shape the frontend expects
    display_name = (
        profile_raw.get("displayName")
        or profile_raw.get("display_name")
        or current_user.name
        or current_user.email.split("@")[0]
        if current_user.email else "Enterprise User"
    )
    profile = {
        "name": display_name,
        "subtitle": profile_raw.get("title") or profile_raw.get("company") or "Deckoviz Enterprise",
        "location": profile_raw.get("location") or "Global",
        "units": len(units_raw),
        "activeFrames": sum(1 for u in units_raw if u.get("status") == "active") or max(len(units_raw), 1),
    }

    # Build stats array the frontend renders as cards
    stats = [
        {"label": "Collections", "value": str(len(collections)), "delta": "+2 this week", "color": "#3b82f6"},
        {"label": "Active Units", "value": str(len(units_raw)), "delta": "All operational", "color": "#10b981"},
        {"label": "Events Scheduled", "value": str(len(events_raw)), "delta": "Upcoming", "color": "#f59e0b"},
        {"label": "Curations", "value": str(len(curations)), "delta": f"{len(notes)} notes saved", "color": "#8b5cf6"},
    ]

    # Build units array
    units = []
    for u in units_raw:
        units.append({
            "id": u.get("id", ""),
            "name": u.get("name") or u.get("title") or "Unit",
            "frames": u.get("frames") or u.get("frameCount") or 1,
            "status": u.get("status") or "active",
            "collectionName": u.get("collectionName") or u.get("collection_name") or "Default Collection",
        })

    # Build events array
    events = []
    for ev in events_raw:
        events.append({
            "id": ev.get("id", ""),
            "title": ev.get("title") or ev.get("name") or "Untitled Event",
            "date": ev.get("date") or ev.get("startDate") or "",
            "time": ev.get("time") or ev.get("startTime") or "",
            "collectionName": ev.get("collectionName") or ev.get("collection_name") or "",
            "recurring": ev.get("recurring") or False,
            "frequency": ev.get("frequency") or "",
        })

    return {
        "profile": profile,
        "stats": stats,
        "units": units,
        "events": events,
        "collectionsCount": len(collections),
        "curationsCount": len(curations),
        "curations": curations,
    }

# =========== UNITS ===========
@router.get("/units")
def get_units(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_enterprise_units(uid)

@router.post("/units")
def create_unit(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_create_enterprise_unit(uid, payload)

@router.put("/units/{u_id}")
def update_unit(u_id: str, payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_update_enterprise_unit(uid, u_id, payload)

@router.delete("/units/{u_id}")
def delete_unit(u_id: str, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return {"success": fs_delete_enterprise_unit(uid, u_id)}

# =========== EVENTS ===========
@router.get("/events")
def get_events(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_events(uid)

@router.post("/events")
def create_event(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_create_event(uid, payload)

@router.put("/events/{e_id}")
def update_event(e_id: str, payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_update_event(uid, e_id, payload)

@router.delete("/events/{e_id}")
def delete_event(e_id: str, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return {"success": fs_delete_event(uid, e_id)}

# =========== DAILY QUEUE ===========
@router.get("/daily-queue")
def get_daily_queue(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_daily_queue(uid)

@router.post("/daily-queue")
def create_daily_queue(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_save_daily_queue_slot(uid, payload)

@router.put("/daily-queue/{slot_id}")
def update_daily_queue(slot_id: str, payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_update_daily_queue_slot(uid, slot_id, payload)

@router.delete("/daily-queue/{slot_id}")
def delete_daily_queue(slot_id: str, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return {"success": fs_delete_daily_queue_slot(uid, slot_id)}

# =========== GUESTS ===========
@router.get("/guests")
def get_guests(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_enterprise_guests(uid)

@router.post("/guests")
def create_guest(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_create_enterprise_guest(uid, payload)

@router.put("/guests/{g_id}")
def update_guest(g_id: str, payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_update_enterprise_guest(uid, g_id, payload)

@router.delete("/guests/{g_id}")
def delete_guest(g_id: str, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return {"success": fs_delete_enterprise_guest(uid, g_id)}

# =========== TEMPLATES ===========
@router.get("/templates")
def get_templates(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_enterprise_templates(uid)

@router.post("/templates")
def create_template(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_create_enterprise_template(uid, payload)

@router.put("/templates/{t_id}")
def update_template(t_id: str, payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_update_enterprise_template(uid, t_id, payload)

@router.delete("/templates/{t_id}")
def delete_template(t_id: str, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return {"success": fs_delete_enterprise_template(uid, t_id)}

# =========== MUSIC & NARRATIONS & LIBRARY & CURATIONS ===========
@router.get("/music")
def get_music(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_music(uid)

@router.get("/narrations")
def get_narrations(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_enterprise_narrations(uid)

@router.post("/narrations")
def create_narration(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_create_enterprise_narration(uid, payload)

@router.delete("/narrations/{n_id}")
def delete_narration(n_id: str, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return {"success": fs_delete_enterprise_narration(uid, n_id)}

@router.get("/library")
def get_library(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_library(uid)

@router.get("/curations")
def get_curations(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_curations(uid)

@router.post("/curations")
def create_curation(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_create_curation(uid, payload)

@router.get("/notes")
def get_notes(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_notes(uid)

@router.post("/notes")
def create_note(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_create_note(uid, payload)

# =========== COLLECTIONS & MEDIA & FAVORITES ===========
@router.get("/collections")
def get_enterprise_collections(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_collections(uid)

@router.post("/collections")
def create_enterprise_collection(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    col_name = payload.get("name") or payload.get("title") or "Untitled Collection"

    raw_items = payload.get("items") or payload.get("images") or []
    if not raw_items and payload.get("item_ids"):
        raw_items = [{"itemId": item_id} for item_id in payload.get("item_ids")]

    formatted_items = []
    for idx, item in enumerate(raw_items):
        it_dict = item if isinstance(item, dict) else {}
        url = it_dict.get("url") or it_dict.get("mediaUrl") or it_dict.get("media_url")
        formatted_items.append({
            "id": it_dict.get("id") or f"img-{idx}",
            "itemType": it_dict.get("itemType") or "image",
            "title": it_dict.get("title") or col_name,
            "url": url,
            "mediaUrl": url,
            "displayHours": it_dict.get("displayHours") or payload.get("displayHours") or "00:00:00",
            "displaySeconds": it_dict.get("displaySeconds") or payload.get("displaySeconds") or "00:30",
            "metaNotes": it_dict.get("metaNotes") or ""
        })

    col_data = {
        "name": col_name,
        "title": col_name,
        "description": payload.get("description") or "",
        "musicUrl": payload.get("musicUrl") or payload.get("music_url"),
        "tags": payload.get("tags") or [],
        "displayMinutes": payload.get("displayMinutes") or 0,
        "displayHours": payload.get("displayHours") or "00:00:00",
        "displaySeconds": payload.get("displaySeconds") or "00:30",
        "itemCount": len(formatted_items),
        "items": formatted_items
    }

    return fs_create_collection(uid, col_data)

@router.post("/collections/{col_id}/items")
def add_enterprise_collection_item(col_id: str, payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_add_collection_item(uid, col_id, payload)

@router.put("/collections/{col_id}")
def update_enterprise_collection(col_id: str, payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_update_collection(uid, col_id, payload)

@router.delete("/collections/{col_id}")
def delete_enterprise_collection(col_id: str, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return {"success": fs_delete_collection(uid, col_id)}

@router.get("/media")
def get_enterprise_media(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_get_media(uid)

@router.post("/media")
def save_enterprise_media(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    return fs_save_media(uid, payload)

@router.get("/favorites")
def get_enterprise_favorites(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    profile = fs_get_profile(uid) or {}
    return profile.get("favorites") or []

@router.post("/favorites")
def save_enterprise_favorites(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    existing = fs_get_profile(uid) or {}
    existing["favorites"] = payload.get("favorites") or []
    return fs_save_profile(uid, existing)
