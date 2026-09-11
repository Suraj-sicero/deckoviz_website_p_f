import uuid
from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from auth import get_current_user, get_current_user_optional, FirebaseUser
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
    },
    {
        "id": "art-4",
        "title": "Golden Hour Horizons",
        "artist": "Solaris Studio",
        "imageUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
        "category": "Landscape",
        "style": "Impressionist",
        "description": "Warm sunlight streaming over mountain peaks."
    },
    {
        "id": "art-5",
        "title": "Abstract Geometry",
        "artist": "Vector Dreams",
        "imageUrl": "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80",
        "category": "Abstract",
        "style": "Geometric",
        "description": "Bold colors and intersecting modern shapes."
    },
    {
        "id": "art-6",
        "title": "Emerald Forest Mist",
        "artist": "Woodland Echoes",
        "imageUrl": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
        "category": "Nature",
        "style": "Atmospheric",
        "description": "Sunbeams piercing through ancient evergreen canopy."
    },
    {
        "id": "art-7",
        "title": "Midnight City Lights",
        "artist": "Urban Spectrum",
        "imageUrl": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
        "category": "Architecture",
        "style": "Cyberpunk",
        "description": "High-altitude skyline blurred into glowing bokeh."
    },
    {
        "id": "art-8",
        "title": "Celestial Nebula",
        "artist": "Astro Artworks",
        "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
        "category": "Cosmic",
        "style": "Digital Art",
        "description": "Swirling stellar dust clouds and vibrant star fields."
    },
    {
        "id": "art-9",
        "title": "Zen Garden Rays",
        "artist": "Kyoto Harmonies",
        "imageUrl": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
        "category": "Minimalist",
        "style": "Zen",
        "description": "Raked gravel and peaceful bamboo shadows."
    },
    {
        "id": "art-10",
        "title": "Prismatic Cascades",
        "artist": "Chromatica",
        "imageUrl": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&q=80",
        "category": "Abstract",
        "style": "Liquid Color",
        "description": "Flowing acrylic swirls with gold leaf accents."
    },
    {
        "id": "art-11",
        "title": "Nordic Frost Peak",
        "artist": "Boreal Visions",
        "imageUrl": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
        "category": "Landscape",
        "style": "Realism",
        "description": "Majestic snow-capped alpine wilderness under pale skies."
    },
    {
        "id": "art-12",
        "title": "Solitude in Blue",
        "artist": "Indigo Dreams",
        "imageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
        "category": "Modern",
        "style": "Monochrome",
        "description": "Deep cobalt tones evocative of quiet contemplation."
    },
    {
        "id": "art-13",
        "title": "Autumn Gold Path",
        "artist": "Seasonal Muse",
        "imageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
        "category": "Nature",
        "style": "Oil Impression",
        "description": "Golden leaves carpeting a quiet forest trail."
    },
    {
        "id": "art-14",
        "title": "Futuristic Metropolis",
        "artist": "Neo Tokyo",
        "imageUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80",
        "category": "Sci-Fi",
        "style": "Digital 3D",
        "description": "Layered megastructures lit by glowing holographic signs."
    },
    {
        "id": "art-15",
        "title": "Crimson Sunset Horizons",
        "artist": "Horizon Studio",
        "imageUrl": "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&q=80",
        "category": "Sunset",
        "style": "Vibrant",
        "description": "Fiery evening colors reflecting over still water."
    },
    {
        "id": "art-16",
        "title": "Minimalist Line Bloom",
        "artist": "Studio Linea",
        "imageUrl": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80",
        "category": "Minimalist",
        "style": "Line Art",
        "description": "Delicate botanical silhouette on warm beige."
    },
    {
        "id": "art-17",
        "title": "Deep Ocean Bioluminescence",
        "artist": "Abyssal Arts",
        "imageUrl": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
        "category": "Ocean",
        "style": "Glow",
        "description": "Glowing coral reefs beneath dark crystalline waters."
    },
    {
        "id": "art-18",
        "title": "Desert Dunes Twilight",
        "artist": "Sahara Drift",
        "imageUrl": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80",
        "category": "Desert",
        "style": "Warm Minimalist",
        "description": "Smooth sand ridges bathed in violet dusk."
    },
    {
        "id": "art-19",
        "title": "Surreal Dreamscape Cloud",
        "artist": "Oneiric Labs",
        "imageUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80",
        "category": "Surrealism",
        "style": "Dreamy",
        "description": "Floating islands enveloped in pastel clouds."
    },
    {
        "id": "art-20",
        "title": "Vibrant Retro Waves",
        "artist": "Synthwave 80s",
        "imageUrl": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
        "category": "Retro",
        "style": "Synthwave",
        "description": "Magenta wireframe grids under a glowing synthetic sun."
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

DEFAULT_MUSIC = [
    {"id": "tr-1", "title": "Ambient Moonlight Chill", "artist": "Deckoviz Soundscapes", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", "category": "ambient", "duration": "05:12"},
    {"id": "tr-2", "title": "Classical Piano Serenade", "artist": "Chopin Ensemble", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", "category": "classical", "duration": "04:35"},
    {"id": "tr-3", "title": "Celestial Meditation", "artist": "Aura Vibrations", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", "category": "ambient", "duration": "06:01"},
    {"id": "tr-4", "title": "Lo-Fi Rain & Coffee", "artist": "Subtle Beats Studio", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", "category": "lo-fi", "duration": "03:45"},
    {"id": "tr-5", "title": "Cinematic Sunset Journey", "artist": "Epic Orchestral", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", "category": "cinematic", "duration": "05:20"},
    {"id": "tr-6", "title": "Deep Focus Waves", "artist": "Brainwave Audio", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", "category": "ambient", "duration": "07:10"},
    {"id": "tr-7", "title": "Midnight Jazz Lounge", "artist": "Velvet Quartet", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", "category": "jazz", "duration": "04:15"},
    {"id": "tr-8", "title": "Zen Garden Flute", "artist": "Kyoto Soundscapes", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", "category": "zen", "duration": "05:50"},
    {"id": "tr-9", "title": "Acoustic Morning Breeze", "artist": "Sunlight Strings", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", "category": "acoustic", "duration": "03:50"},
    {"id": "tr-10", "title": "Cyberpunk Pulse Beats", "artist": "Neon Synth", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", "category": "electronic", "duration": "04:40"},
    {"id": "tr-11", "title": "Ocean Horizon Drone", "artist": "Abyssal Sounds", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", "category": "ambient", "duration": "08:00"},
    {"id": "tr-12", "title": "Peaceful Forest Rain", "artist": "Nature Audio Collective", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", "category": "nature", "duration": "06:30"},
    {"id": "tr-13", "title": "Solitude Cello Sonata", "artist": "Boreal Strings", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", "category": "classical", "duration": "05:05"},
    {"id": "tr-14", "title": "Cosmic Starlight Drift", "artist": "Galaxy Resonance", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", "category": "ambient", "duration": "06:45"},
    {"id": "tr-15", "title": "Chillout Beach Sunset", "artist": "Solaris Lounge", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", "category": "lo-fi", "duration": "04:20"},
    {"id": "tr-16", "title": "Minimalist Piano Echoes", "artist": "Satie Inspirations", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", "category": "classical", "duration": "04:50"},
    {"id": "tr-17", "title": "Warm Fireplace Acoustic", "artist": "Cozy Hearth", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", "category": "acoustic", "duration": "05:15"},
    {"id": "tr-18", "title": "Evening Wind-Down", "artist": "Ritual Sounds", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", "category": "ambient", "duration": "06:10"},
    {"id": "tr-19", "title": "Soft Lullaby Box", "artist": "Nostalgia Notes", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", "category": "lullaby", "duration": "03:30"},
    {"id": "tr-20", "title": "Etheric Choir Harmonies", "artist": "Vocal Soundscapes", "audioUrl": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", "category": "ambient", "duration": "05:40"}
]

# ---------- Helper Functions ----------
def get_daily_items_for_user(uid: str, date_str: str) -> tuple[List[dict], List[dict]]:
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

curator_router = APIRouter(prefix="/curator", tags=["Curator Catalog"])

# ---------- Endpoints ----------

@router.get("/artworks")
@curator_router.get("/artworks")
def get_curated_artworks_catalog(current_user: Optional[FirebaseUser] = Depends(get_current_user_optional)):
    return DEFAULT_ARTWORKS

@router.get("/music")
@curator_router.get("/music")
def get_curated_music(current_user: Optional[FirebaseUser] = Depends(get_current_user_optional)):
    from firebase_config import fs_get_music
    uid = (current_user.firebase_uid or current_user.id) if current_user else "anonymous_user"
    user_tracks = fs_get_music(uid) or []
    user_ids = {t.get("id") for t in user_tracks if isinstance(t, dict)}
    combined = list(user_tracks)
    for track in DEFAULT_MUSIC:
        if track["id"] not in user_ids:
            combined.append(track)
    return combined

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
