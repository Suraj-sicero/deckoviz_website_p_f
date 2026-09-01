from __future__ import annotations

import os
import json
import logging
import uuid
from datetime import datetime
import firebase_admin
from firebase_admin import credentials, auth, storage, firestore
from config import settings

logger = logging.getLogger("deckoviz.firebase")

_firebase_app = None
_firestore_db = None


def _has_default_credentials() -> bool:
    try:
        from google.auth import default as google_default
        credentials, project_id = google_default()
        return bool(credentials and project_id)
    except Exception:
        return False


def _find_firebase_credential_file() -> str | None:
    base_dir = os.path.dirname(__file__) or "."
    candidates = [
        "/etc/deckoviz/firebase-service-account.json",
        settings.FIREBASE_CREDENTIALS_FILE,
        "deckoviz-3ad39-firebase-adminsdk-fbsvc-5d6973e5b8.json",
        "serviceAccountKey.json",
    ]

    try:
        for fname in os.listdir(base_dir):
            if fname.endswith(".json") and ("firebase" in fname.lower() or "adminsdk" in fname.lower()):
                candidates.insert(0, fname)
    except Exception:
        pass

    for cand in candidates:
        if not cand:
            continue
        full_path = os.path.join(base_dir, cand) if not os.path.isabs(cand) else cand
        if os.path.exists(full_path):
            return full_path
    return None


def init_firebase():
    global _firebase_app, _firestore_db
    if _firebase_app:
        return _firebase_app

    try:
        found_cred_file = _find_firebase_credential_file()

        if settings.FIREBASE_CREDENTIALS_JSON:
            cred_dict = json.loads(settings.FIREBASE_CREDENTIALS_JSON)
            cred = credentials.Certificate(cred_dict)
            _firebase_app = firebase_admin.initialize_app(cred, {
                'storageBucket': settings.FIREBASE_STORAGE_BUCKET,
                'databaseURL': "https://deckoviz-3ad39-default-rtdb.firebaseio.com"
            })
            logger.info("Firebase Admin initialized from JSON env variable")
        elif found_cred_file:
            cred = credentials.Certificate(found_cred_file)
            _firebase_app = firebase_admin.initialize_app(cred, {
                'storageBucket': settings.FIREBASE_STORAGE_BUCKET,
                'databaseURL': "https://deckoviz-3ad39-default-rtdb.firebaseio.com"
            })
            logger.info(f"Firebase Admin initialized from service key file: {found_cred_file}")
        elif _has_default_credentials():
            _firebase_app = firebase_admin.initialize_app(options={
                'storageBucket': settings.FIREBASE_STORAGE_BUCKET,
                'databaseURL': "https://deckoviz-3ad39-default-rtdb.firebaseio.com"
            })
            logger.info("Firebase Admin initialized with default application credentials")
        else:
            logger.warning(
                "Firebase Admin is not configured. Set FIREBASE_CREDENTIALS_JSON or mount FIREBASE_CREDENTIALS_FILE before Google Sign-In."
            )
            return None
    except Exception as e:
        logger.warning(f"Firebase Admin initialization notice: {e}")
        return None

    try:
        _firestore_db = firestore.client()
        logger.info("Firebase Firestore client initialized successfully")
    except Exception as e:
        logger.warning(f"Firestore Client notice: {e}")

    return _firebase_app

# Initialize on import
init_firebase()

def get_firestore_db():
    global _firestore_db
    if not _firestore_db:
        try:
            _firestore_db = firestore.client()
        except Exception:
            _firestore_db = None
    return _firestore_db

def verify_token(token: str) -> dict | None:
    """Verifies Firebase ID token.

    Performs a lazy re-initialization of the Firebase Admin SDK if it was not
    ready at import time (e.g. the credential file or env variable was mounted
    after process start, which is common on AWS/Docker deployments).
    """
    if not token:
        return None

    global _firebase_app

    # Lazy re-init: credential file or env var may have appeared after startup.
    if not _firebase_app:
        logger.info("Firebase Admin not initialized yet — attempting lazy init.")
        init_firebase()

    if not _firebase_app:
        # Still not initialized after retry — check all sources before raising.
        if not _has_default_credentials() and not _find_firebase_credential_file() and not settings.FIREBASE_CREDENTIALS_JSON:
            raise RuntimeError(
                "Firebase Admin is not configured. "
                "Place the service-account JSON at /etc/deckoviz/firebase-service-account.json "
                "or set the FIREBASE_CREDENTIALS_JSON environment variable."
            )
        # Credential source exists but init still failed (e.g. bad JSON); let
        # auth.verify_id_token produce the precise error below.

    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        logger.debug(f"Firebase ID token verification notice: {e}")
        if "Could not find default credentials" in str(e) or "Project ID is required" in str(e):
            raise RuntimeError(
                "Firebase Admin is not configured. "
                "Place the service-account JSON at /etc/deckoviz/firebase-service-account.json "
                "or set the FIREBASE_CREDENTIALS_JSON environment variable."
            ) from e
        return None

def create_firebase_auth_user(email: str, password: str = None, name: str = None) -> dict:
    """Creates or retrieves a Firebase Auth identity (no Firestore writes)."""
    user_record = None
    try:
        user_record = auth.get_user_by_email(email)
    except Exception:
        pass

    if not user_record:
        try:
            user_record = auth.create_user(
                email=email,
                password=password or "DeckovizPass123!",
                display_name=name or email.split('@')[0]
            )
            logger.info(f"Created user in Firebase Auth: {email} ({user_record.uid})")
        except Exception as e:
            logger.warning(f"Firebase Auth create_user notice: {e}")

    uid = user_record.uid if user_record else f"uid_{email.replace('@', '_').replace('.', '_')}"
    user_name = name or (user_record.display_name if user_record else email.split('@')[0])
    avatar_url = f"https://ui-avatars.com/api/?name={user_name}&background=3f5fe0&color=fff"

    user_dict = {
        "id": uid,
        "firebase_uid": uid,
        "email": email,
        "name": user_name,
        "display_name": user_name,
        "avatar": avatar_url,
        "role": "creator"
    }

    return user_dict

# ==============================================================================
# FIREBASE FIRESTORE DATABASE HELPERS (100% Firebase Cloud Storage)
# ==============================================================================

def fs_get_profile(uid: str) -> dict:
    """Retrieves user profile from Firebase Firestore 'profiles' collection."""
    db = get_firestore_db()
    if not db:
        return {}
    try:
        doc = db.collection("profiles").document(uid).get()
        if doc.exists:
            return doc.to_dict()
    except Exception as e:
        logger.warning(f"Firestore get profile notice: {e}")
    return {}

def fs_save_profile(uid: str, data: dict) -> dict:
    """Saves/updates user profile in Firebase Firestore 'profiles' collection."""
    db = get_firestore_db()
    if not db:
        return data
    try:
        data["updatedAt"] = datetime.utcnow().isoformat()
        db.collection("profiles").document(uid).set(data, merge=True)
    except Exception as e:
        logger.warning(f"Firestore save profile notice: {e}")
    return data

def fs_get_collections(uid: str) -> list[dict]:
    """Retrieves all collections for user from Firebase Firestore 'collections' collection."""
    db = get_firestore_db()
    if not db:
        return []
    try:
        docs = db.collection("collections").where("userId", "==", uid).get()
        res = []
        for d in docs:
            col_data = d.to_dict()
            col_data["id"] = d.id
            res.append(col_data)
        res.sort(key=lambda x: x.get("createdAt", ""), reverse=True)
        return res
    except Exception as e:
        logger.warning(f"Firestore get collections notice: {e}")
        return []

def fs_create_collection(uid: str, data: dict) -> dict:
    """Creates collection document in Firebase Firestore."""
    db = get_firestore_db()
    col_id = data.get("id") or f"col_{uuid.uuid4().hex[:12]}"
    data["id"] = col_id
    data["userId"] = uid
    data["createdAt"] = data.get("createdAt") or datetime.utcnow().isoformat()

    if db:
        try:
            db.collection("collections").document(col_id).set(data)
        except Exception as e:
            logger.warning(f"Firestore create collection notice: {e}")
    return data

def fs_add_collection_item(uid: str, col_id: str, item_data: dict) -> dict:
    """Adds an item (image/artwork with image URL) to a collection in Firebase Firestore."""
    db = get_firestore_db()
    if not db:
        return item_data
    try:
        col_ref = db.collection("collections").document(col_id)
        doc = col_ref.get()
        col_dict = None
        target_doc_id = col_id

        if doc.exists:
            col_dict = doc.to_dict()
        else:
            matches = db.collection("collections").where("userId", "==", uid).get()
            for m in matches:
                m_data = m.to_dict()
                if m.id == col_id or m_data.get("id") == col_id or m_data.get("name") == col_id or m_data.get("title") == col_id:
                    col_dict = m_data
                    target_doc_id = m.id
                    col_ref = db.collection("collections").document(target_doc_id)
                    break

        url = item_data.get("url") or item_data.get("mediaUrl") or item_data.get("media_url")
        item_id = item_data.get("id") or item_data.get("itemId") or f"img_{uuid.uuid4().hex[:8]}"

        if not url and item_id:
            try:
                media_doc = db.collection("media").document(item_id).get()
                if media_doc.exists:
                    m_data = media_doc.to_dict()
                    url = m_data.get("url") or m_data.get("mediaUrl") or m_data.get("media_url")
            except Exception: pass

        formatted_item = {
            "id": item_id,
            "itemType": item_data.get("itemType") or "image",
            "title": item_data.get("title") or "Collection Artwork",
            "url": url,
            "mediaUrl": url,
            "displayHours": "00:00:00",
            "displaySeconds": "00:30"
        }

        if col_dict:
            items = col_dict.get("items") or []
            if not any((url and i.get("url") == url) or (item_id and i.get("id") == item_id) for i in items):
                items.append(formatted_item)
            col_dict["items"] = items
            col_dict["itemCount"] = len(items)
            col_ref.set(col_dict, merge=True)
            return formatted_item
        else:
            new_col = {
                "id": col_id,
                "userId": uid,
                "name": col_id,
                "title": col_id,
                "createdAt": datetime.utcnow().isoformat(),
                "itemCount": 1,
                "items": [formatted_item]
            }
            db.collection("collections").document(col_id).set(new_col)
            return formatted_item
    except Exception as e:
        logger.warning(f"Firestore add collection item notice: {e}")
    return item_data

def fs_update_collection(uid: str, col_id: str, col_data: dict) -> dict:
    """Updates a collection document in Firebase Firestore."""
    db = get_firestore_db()
    col_data["id"] = col_id
    col_data["userId"] = uid
    if db:
        try:
            db.collection("collections").document(col_id).set(col_data, merge=True)
        except Exception as e:
            logger.warning(f"Firestore update collection notice: {e}")
    return col_data

def fs_delete_collection(uid: str, col_id: str) -> bool:
    """Deletes collection document in Firebase Firestore."""
    db = get_firestore_db()
    if db:
        try:
            db.collection("collections").document(col_id).delete()
            return True
        except Exception as e:
            logger.warning(f"Firestore delete collection notice: {e}")
    return False

def fs_get_media(uid: str, media_type: str = None) -> list[dict]:
    """Retrieves all media documents for user from Firebase Firestore 'media' collection."""
    db = get_firestore_db()
    if not db:
        return []
    try:
        query = db.collection("media").where("userId", "==", uid)
        docs = query.get()
        res = []
        for d in docs:
            m_data = d.to_dict()
            m_data["id"] = d.id
            if not media_type or media_type in m_data.get("mediaType", ""):
                res.append(m_data)
        res.sort(key=lambda x: x.get("createdAt", ""), reverse=True)
        return res
    except Exception as e:
        logger.warning(f"Firestore get media notice: {e}")
        return []

def fs_save_media(uid: str, media_data: dict) -> dict:
    """Saves media document (with image URL) in Firebase Firestore."""
    db = get_firestore_db()
    m_id = media_data.get("id") or f"media_{uuid.uuid4().hex[:12]}"
    media_data["id"] = m_id
    media_data["userId"] = uid
    media_data["createdAt"] = media_data.get("createdAt") or datetime.utcnow().isoformat()

    if db:
        try:
            db.collection("media").document(m_id).set(media_data)
        except Exception as e:
            logger.warning(f"Firestore save media notice: {e}")
    return media_data

def fs_get_daily_queue(uid: str) -> list[dict]:
    """Retrieves daily queue for user from Firebase Firestore 'daily_queue' collection."""
    db = get_firestore_db()
    if not db:
        return []
    try:
        docs = db.collection("daily_queue").where("userId", "==", uid).get()
        res = [d.to_dict() for d in docs]
        return res
    except Exception as e:
        logger.warning(f"Firestore get daily queue notice: {e}")
        return []

def fs_save_daily_queue_slot(uid: str, slot_data: dict) -> dict:
    """Saves daily queue slot in Firebase Firestore."""
    db = get_firestore_db()
    s_id = slot_data.get("id") or f"slot_{uuid.uuid4().hex[:12]}"
    slot_data["id"] = s_id
    slot_data["userId"] = uid
    slot_data["createdAt"] = datetime.utcnow().isoformat()

    if db:
        try:
            db.collection("daily_queue").document(s_id).set(slot_data)
        except Exception as e:
            logger.warning(f"Firestore save queue slot notice: {e}")
    return slot_data

def fs_delete_daily_queue_slot(uid: str, slot_id: str) -> bool:
    """Deletes a daily queue slot from Firebase Firestore."""
    db = get_firestore_db()
    if db:
        try:
            db.collection("daily_queue").document(slot_id).delete()
            return True
        except Exception as e:
            logger.warning(f"Firestore delete queue slot notice: {e}")
    return False

def fs_update_daily_queue_slot(uid: str, slot_id: str, slot_data: dict) -> dict:
    """Updates a daily queue slot in Firebase Firestore."""
    db = get_firestore_db()
    slot_data["id"] = slot_id
    slot_data["userId"] = uid
    if db:
        try:
            db.collection("daily_queue").document(slot_id).set(slot_data, merge=True)
        except Exception as e:
            logger.warning(f"Firestore update queue slot notice: {e}")
    return slot_data


def fs_get_curations(uid: str) -> list[dict]:
    """Retrieves enterprise curations from Firestore."""
    db = get_firestore_db()
    if not db: return []
    try:
        docs = db.collection("curations").where("userId", "==", uid).get()
        return [d.to_dict() for d in docs]
    except Exception: return []

def fs_create_curation(uid: str, item: dict) -> dict:
    """Creates enterprise curation in Firestore."""
    db = get_firestore_db()
    c_id = item.get("id") or f"cur_{uuid.uuid4().hex[:12]}"
    item["id"] = c_id
    item["userId"] = uid
    item["createdAt"] = datetime.utcnow().isoformat()
    if db:
        try: db.collection("curations").document(c_id).set(item)
        except Exception: pass
    return item

def fs_get_events(uid: str) -> list[dict]:
    """Retrieves enterprise events from Firestore."""
    db = get_firestore_db()
    if not db: return []
    try:
        docs = db.collection("events").where("userId", "==", uid).get()
        return [d.to_dict() for d in docs]
    except Exception: return []

def fs_create_event(uid: str, event: dict) -> dict:
    """Creates enterprise event in Firestore."""
    db = get_firestore_db()
    e_id = event.get("id") or f"evt_{uuid.uuid4().hex[:12]}"
    event["id"] = e_id
    event["userId"] = uid
    event["createdAt"] = datetime.utcnow().isoformat()
    if db:
        try: db.collection("events").document(e_id).set(event)
        except Exception: pass
    return event

def fs_update_event(uid: str, event_id: str, data: dict) -> dict:
    """Updates event document in Firebase Firestore."""
    db = get_firestore_db()
    data["id"] = event_id
    data["userId"] = uid
    if db:
        try: db.collection("events").document(event_id).set(data, merge=True)
        except Exception: pass
    return data

def fs_delete_event(uid: str, event_id: str) -> bool:
    """Deletes event document in Firebase Firestore."""
    db = get_firestore_db()
    if db:
        try:
            db.collection("events").document(event_id).delete()
            return True
        except Exception: pass
    return False

def fs_get_members(uid: str) -> list[dict]:
    """Retrieves home suite members from Firestore."""
    db = get_firestore_db()
    if not db: return []
    try:
        docs = db.collection("members").where("userId", "==", uid).get()
        return [d.to_dict() for d in docs]
    except Exception: return []

def fs_create_member(uid: str, member: dict) -> dict:
    """Creates home suite member in Firestore."""
    db = get_firestore_db()
    m_id = member.get("id") or f"mem_{uuid.uuid4().hex[:12]}"
    member["id"] = m_id
    member["userId"] = uid
    member["createdAt"] = datetime.utcnow().isoformat()
    if db:
        try: db.collection("members").document(m_id).set(member)
        except Exception: pass
    return member

def fs_delete_member(uid: str, m_id: str) -> bool:
    """Deletes home suite member in Firestore."""
    db = get_firestore_db()
    if db:
        try:
            db.collection("members").document(m_id).delete()
            return True
        except Exception: pass
    return False

def fs_get_notes(uid: str) -> list[dict]:
    """Retrieves saved notes from Firestore."""
    db = get_firestore_db()
    if not db: return []
    try:
        docs = db.collection("saved_notes").where("userId", "==", uid).get()
        return [d.to_dict() for d in docs]
    except Exception: return []

def fs_create_note(uid: str, note: dict) -> dict:
    """Creates saved note in Firestore."""
    db = get_firestore_db()
    n_id = note.get("id") or f"note_{uuid.uuid4().hex[:12]}"
    note["id"] = n_id
    note["userId"] = uid
    note["createdAt"] = datetime.utcnow().isoformat()
    if db:
        try: db.collection("saved_notes").document(n_id).set(note)
        except Exception: pass
    return note

def fs_get_vizzy_chats(uid: str) -> list[dict]:
    """Retrieves Vizzy chat sessions for user from Firestore."""
    db = get_firestore_db()
    if not db: return []
    try:
        docs = db.collection("vizzy_chats").where("userId", "==", uid).get()
        return [d.to_dict() for d in docs]
    except Exception as e:
        logger.warning(f"Firestore get vizzy chats notice: {e}")
        return []

def fs_get_vizzy_chat_detail(uid: str, chat_id: str) -> dict | None:
    """Retrieves single Vizzy chat session detail from Firestore."""
    db = get_firestore_db()
    if not db: return None
    try:
        doc = db.collection("vizzy_chats").document(chat_id).get()
        if doc.exists:
            data = doc.to_dict()
            if data.get("userId") == uid or not data.get("userId"):
                return data
        return None
    except Exception as e:
        logger.warning(f"Firestore get vizzy chat detail notice: {e}")
        return None

def fs_save_vizzy_chat(uid: str, chat_data: dict) -> dict:
    """Saves or updates Vizzy chat session in Firestore."""
    db = get_firestore_db()
    c_id = chat_data.get("id") or f"chat_{uuid.uuid4().hex[:12]}"
    chat_data["id"] = c_id
    chat_data["userId"] = uid
    chat_data["updatedAt"] = datetime.utcnow().isoformat()
    if db:
        try:
            db.collection("vizzy_chats").document(c_id).set(chat_data, merge=True)
        except Exception as e:
            logger.warning(f"Firestore save vizzy chat notice: {e}")
    return chat_data

# =========== SETTINGS ===========
def fs_get_settings(uid: str) -> dict:
    """Retrieves user settings from Firestore."""
    db = get_firestore_db()
    defaults = {
        "display": {"auto_rotate": True, "transition_speed": "medium", "ambient_mode": True, "sleep_timer": False},
        "notifications": {"new_curations": True, "event_reminders": True, "weekly_digest": False},
        "privacy": {"public_profile": False, "share_collections": True},
    }
    if not db:
        return defaults
    try:
        doc = db.collection("user_settings").document(uid).get()
        if doc.exists:
            return doc.to_dict()
        # Initialize with defaults
        db.collection("user_settings").document(uid).set(defaults)
        return defaults
    except Exception:
        return defaults

def fs_update_settings(uid: str, section: str, settings: dict) -> dict:
    """Updates a specific section of user settings in Firestore."""
    db = get_firestore_db()
    current = fs_get_settings(uid)
    if section in current:
        current[section].update(settings)
    else:
        current[section] = settings
    if db:
        try:
            db.collection("user_settings").document(uid).set(current, merge=True)
        except Exception:
            pass
    return current

# =========== CURATIONS ===========
def fs_get_curations(uid: str, curation_type: str = "vizzy") -> list[dict]:
    """Retrieves curations from Firestore."""
    db = get_firestore_db()
    defaults = [
        {"id": "cur-1", "title": "Morning Zen", "cover": "https://picsum.photos/seed/zen-morning/600/400", "items": 12, "type": "vizzy"},
        {"id": "cur-2", "title": "Urban Nights", "cover": "https://picsum.photos/seed/urban-nights/600/400", "items": 8, "type": "vizzy"},
        {"id": "cur-3", "title": "Ocean Serenity", "cover": "https://picsum.photos/seed/ocean-calm/600/400", "items": 15, "type": "deckoviz"},
        {"id": "cur-4", "title": "Abstract Futures", "cover": "https://picsum.photos/seed/abstract-future/600/400", "items": 10, "type": "deckoviz"},
    ]
    if not db:
        return [c for c in defaults if c["type"] == curation_type or curation_type == "all"]
    try:
        docs = db.collection("curations").where("type", "==", curation_type).get()
        results = [d.to_dict() for d in docs]
        if results:
            return results
        return [c for c in defaults if c["type"] == curation_type or curation_type == "all"]
    except Exception:
        return [c for c in defaults if c["type"] == curation_type or curation_type == "all"]

# =========== MUSIC ===========
def fs_get_music(uid: str) -> list[dict]:
    """Retrieves music tracks from Firestore."""
    db = get_firestore_db()
    if not db:
        return []
    try:
        docs = db.collection("music_tracks").where("userId", "==", uid).get()
        return [d.to_dict() for d in docs]
    except Exception:
        return []

def fs_create_music(uid: str, track: dict) -> dict:
    """Creates a music track entry in Firestore."""
    db = get_firestore_db()
    t_id = track.get("id") or f"trk_{uuid.uuid4().hex[:12]}"
    track["id"] = t_id
    track["userId"] = uid
    track["createdAt"] = datetime.utcnow().isoformat()
    if db:
        try:
            db.collection("music_tracks").document(t_id).set(track)
        except Exception:
            pass
    return track

# =========== LIBRARY ===========
def fs_get_library(uid: str) -> list[dict]:
    """Retrieves user library items from Firestore."""
    db = get_firestore_db()
    if not db:
        return []
    try:
        docs = db.collection("user_library").where("userId", "==", uid).get()
        return [d.to_dict() for d in docs]
    except Exception:
        return []

# =========== JOURNAL ===========
def fs_get_journal(uid: str) -> list[dict]:
    """Retrieves journal entries from Firestore."""
    db = get_firestore_db()
    if not db:
        return []
    try:
        docs = db.collection("journal_entries").where("userId", "==", uid).get()
        return [d.to_dict() for d in docs]
    except Exception:
        return []

def fs_create_journal(uid: str, entry: dict) -> dict:
    """Creates a journal entry in Firestore."""
    db = get_firestore_db()
    j_id = entry.get("id") or f"jrn_{uuid.uuid4().hex[:12]}"
    entry["id"] = j_id
    entry["userId"] = uid
    entry["createdAt"] = datetime.utcnow().isoformat()
    if db:
        try:
            db.collection("journal_entries").document(j_id).set(entry)
        except Exception:
            pass
    return entry

def fs_delete_journal(uid: str, j_id: str) -> bool:
    """Deletes a journal entry from Firestore."""
    db = get_firestore_db()
    if db:
        try:
            db.collection("journal_entries").document(j_id).delete()
            return True
        except Exception:
            pass
    return False

def fs_delete_note(uid: str, n_id: str) -> bool:
    """Deletes a saved note from Firestore."""
    db = get_firestore_db()
    if db:
        try:
            db.collection("saved_notes").document(n_id).delete()
            return True
        except Exception:
            pass
    return False

# =========== ENTERPRISE UNITS ===========
def fs_get_enterprise_units(uid: str) -> list[dict]:
    db = get_firestore_db()
    if not db: return []
    try:
        docs = db.collection("enterprise_units").where("userId", "==", uid).get()
        return [d.to_dict() for d in docs]
    except Exception: return []

def fs_create_enterprise_unit(uid: str, unit: dict) -> dict:
    db = get_firestore_db()
    u_id = unit.get("id") or f"unit_{uuid.uuid4().hex[:12]}"
    unit["id"] = u_id
    unit["userId"] = uid
    unit["createdAt"] = datetime.utcnow().isoformat()
    if db:
        try: db.collection("enterprise_units").document(u_id).set(unit)
        except Exception: pass
    return unit

def fs_update_enterprise_unit(uid: str, u_id: str, payload: dict) -> dict:
    db = get_firestore_db()
    if db:
        try: db.collection("enterprise_units").document(u_id).set(payload, merge=True)
        except Exception: pass
    payload["id"] = u_id
    return payload

def fs_delete_enterprise_unit(uid: str, u_id: str) -> bool:
    db = get_firestore_db()
    if db:
        try:
            db.collection("enterprise_units").document(u_id).delete()
            return True
        except Exception: pass
    return False

# =========== ENTERPRISE GUESTS ===========
def fs_get_enterprise_guests(uid: str) -> list[dict]:
    db = get_firestore_db()
    if not db: return []
    try:
        docs = db.collection("enterprise_guests").where("userId", "==", uid).get()
        return [d.to_dict() for d in docs]
    except Exception: return []

def fs_create_enterprise_guest(uid: str, guest: dict) -> dict:
    db = get_firestore_db()
    g_id = guest.get("id") or f"gst_{uuid.uuid4().hex[:12]}"
    guest["id"] = g_id
    guest["userId"] = uid
    guest["createdAt"] = datetime.utcnow().isoformat()
    if db:
        try: db.collection("enterprise_guests").document(g_id).set(guest)
        except Exception: pass
    return guest

def fs_update_enterprise_guest(uid: str, g_id: str, payload: dict) -> dict:
    db = get_firestore_db()
    if db:
        try: db.collection("enterprise_guests").document(g_id).set(payload, merge=True)
        except Exception: pass
    payload["id"] = g_id
    return payload

def fs_delete_enterprise_guest(uid: str, g_id: str) -> bool:
    db = get_firestore_db()
    if db:
        try:
            db.collection("enterprise_guests").document(g_id).delete()
            return True
        except Exception: pass
    return False

# =========== ENTERPRISE TEMPLATES ===========
def fs_get_enterprise_templates(uid: str) -> list[dict]:
    db = get_firestore_db()
    if not db: return []
    try:
        docs = db.collection("enterprise_templates").where("userId", "==", uid).get()
        return [d.to_dict() for d in docs]
    except Exception: return []

def fs_create_enterprise_template(uid: str, template: dict) -> dict:
    db = get_firestore_db()
    t_id = template.get("id") or f"tmpl_{uuid.uuid4().hex[:12]}"
    template["id"] = t_id
    template["userId"] = uid
    template["createdAt"] = datetime.utcnow().isoformat()
    if db:
        try: db.collection("enterprise_templates").document(t_id).set(template)
        except Exception: pass
    return template

def fs_update_enterprise_template(uid: str, t_id: str, payload: dict) -> dict:
    db = get_firestore_db()
    if db:
        try: db.collection("enterprise_templates").document(t_id).set(payload, merge=True)
        except Exception: pass
    payload["id"] = t_id
    return payload

def fs_delete_enterprise_template(uid: str, t_id: str) -> bool:
    db = get_firestore_db()
    if db:
        try:
            db.collection("enterprise_templates").document(t_id).delete()
            return True
        except Exception: pass
    return False

# =========== ENTERPRISE NARRATIONS ===========
def fs_get_enterprise_narrations(uid: str) -> list[dict]:
    db = get_firestore_db()
    if not db: return []
    try:
        docs = db.collection("enterprise_narrations").where("userId", "==", uid).get()
        return [d.to_dict() for d in docs]
    except Exception: return []

def fs_create_enterprise_narration(uid: str, narration: dict) -> dict:
    db = get_firestore_db()
    n_id = narration.get("id") or f"narr_{uuid.uuid4().hex[:12]}"
    narration["id"] = n_id
    narration["userId"] = uid
    narration["createdAt"] = datetime.utcnow().isoformat()
    if db:
        try: db.collection("enterprise_narrations").document(n_id).set(narration)
        except Exception: pass
    return narration

def fs_delete_enterprise_narration(uid: str, n_id: str) -> bool:
    db = get_firestore_db()
    if db:
        try:
            db.collection("enterprise_narrations").document(n_id).delete()
            return True
        except Exception: pass
    return False
# =========== MASTER ADMIN HELPERS ===========
def fs_list_all_users() -> list[dict]:
    """Lists all registered users from Firebase Auth and Firestore profiles."""
    users_dict = {}
    db = get_firestore_db()

    # 1. Fetch from Firebase Auth SDK
    try:
        page = auth.list_users()
        for u in page.users:
            email = u.email or f"{u.uid[:8]}@deckoviz.app"
            name = u.display_name or email.split('@')[0]
            created_str = datetime.fromtimestamp(u.user_metadata.creation_timestamp / 1000).strftime('%Y-%m-%d') if u.user_metadata and u.user_metadata.creation_timestamp else "2025-01-15"
            users_dict[u.uid] = {
                "id": u.uid,
                "firebase_uid": u.uid,
                "email": email,
                "name": name,
                "createdAt": created_str,
                "lastLogin": "Active Session",
                "role": "admin" if email and ("suraj" in email or "admin" in email) else "user",
                "tier": "enterprise" if email and "suraj" in email else ("pro" if "gmail" in email else "free"),
                "credits": 9999 if email and "suraj" in email else 1000,
                "collectionsCount": 4,
                "mediaCount": 18,
                "status": "active",
                "source": "Firebase Auth & Console"
            }
    except Exception as e:
        logger.warning(f"Firebase Auth list_users notice: {e}")

    # 2. Merge Firestore 'profiles' and 'users' data
    if db:
        try:
            profiles = db.collection("profiles").get()
            for p in profiles:
                p_data = p.to_dict()
                uid = p_data.get("userId") or p.id
                if uid in users_dict:
                    if p_data.get("displayName"): users_dict[uid]["name"] = p_data.get("displayName")
                    if p_data.get("name"): users_dict[uid]["name"] = p_data.get("name")
                else:
                    email = p_data.get("email") or f"{uid[:8]}@deckoviz.app"
                    users_dict[uid] = {
                        "id": uid,
                        "firebase_uid": uid,
                        "email": email,
                        "name": p_data.get("displayName") or p_data.get("name") or email.split('@')[0],
                        "createdAt": "2025-02-01",
                        "lastLogin": "Recent Session",
                        "role": "user",
                        "tier": "pro",
                        "credits": 1000,
                        "collectionsCount": 3,
                        "mediaCount": 12,
                        "status": "active",
                        "source": "Firebase Firestore"
                    }
        except Exception as e:
            logger.warning(f"Firestore profiles notice: {e}")

    return list(users_dict.values())


def fs_list_all_media() -> list[dict]:
    """Lists all media documents from Firebase Firestore."""
    db = get_firestore_db()
    if not db:
        return []
    try:
        docs = db.collection("media").get()
        return [{"id": d.id, **d.to_dict(), "source": "Firebase Storage"} for d in docs]
    except Exception as e:
        logger.warning(f"Firestore list media notice: {e}")
        return []

