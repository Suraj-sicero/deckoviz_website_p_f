from __future__ import annotations

"""PostgreSQL implementation of the legacy Firestore persistence contract.

The public function names intentionally mirror the old helpers so existing router
paths and response aliases remain unchanged. Every lookup includes user_id.
"""
import asyncio
import uuid
from datetime import datetime, timezone
from typing import Any

from sqlalchemy import delete, select

from database import AsyncSessionLocal
from models import MediaObject, User, UserDocument
from services.s3_storage import get_media_storage


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


async def _ensure_user(session, uid: str) -> None:
    if not await session.get(User, uid):
        session.add(User(id=uid, email=f"user_{uid[:24]}@deckoviz.app", name="User", display_name="User"))

async def ensure_application_user(uid: str, email: str, name: str | None = None) -> dict:
    async with AsyncSessionLocal() as session:
        user = await session.get(User, uid)
        if not user:
            user = User(id=uid, email=email or f"user_{uid[:24]}@deckoviz.app", name=name or "User", display_name=name or "User", role="creator")
            session.add(user)
        else:
            user.email = email or user.email
            user.name = name or user.name
            user.display_name = name or user.display_name
        await session.commit()
        return {"id": user.id, "firebase_uid": user.id, "email": user.email, "name": user.name or "User", "display_name": user.display_name or user.name or "User", "avatar": user.avatar or "", "role": user.role}


async def _list(uid: str, kind: str) -> list[dict]:
    async with AsyncSessionLocal() as session:
        rows = (await session.scalars(select(UserDocument).where(UserDocument.user_id == uid, UserDocument.kind == kind).order_by(UserDocument.created_at.desc()))).all()
        return [dict(row.payload) for row in rows]


async def _get(uid: str, kind: str, document_id: str) -> dict | None:
    async with AsyncSessionLocal() as session:
        row = await session.scalar(select(UserDocument).where(UserDocument.user_id == uid, UserDocument.kind == kind, UserDocument.document_id == document_id))
        return dict(row.payload) if row else None


from sqlalchemy.orm.attributes import flag_modified

async def _save(uid: str, kind: str, data: dict, prefix: str, document_id: str | None = None, merge: bool = False) -> dict:
    doc_id = document_id or data.get("id") or f"{prefix}_{uuid.uuid4().hex[:12]}"
    payload = dict(data)
    payload["id"] = doc_id
    payload["userId"] = uid
    payload.setdefault("createdAt", _now())
    async with AsyncSessionLocal() as session:
        await _ensure_user(session, uid)
        row = await session.scalar(select(UserDocument).where(UserDocument.user_id == uid, UserDocument.kind == kind, UserDocument.document_id == doc_id))
        if row:
            row.payload = {**row.payload, **payload} if merge else payload
            flag_modified(row, "payload")
        else:
            session.add(UserDocument(user_id=uid, kind=kind, document_id=doc_id, payload=payload))
        await session.commit()
    return payload


async def _delete(uid: str, kind: str, document_id: str) -> bool:
    async with AsyncSessionLocal() as session:
        result = await session.execute(delete(UserDocument).where(UserDocument.user_id == uid, UserDocument.kind == kind, UserDocument.document_id == document_id))
        await session.commit()
        return bool(result.rowcount)


def _run(coro):
    # Legacy routers are synchronous and FastAPI executes them in worker threads.
    return asyncio.run(coro)


def fs_get_profile(uid): return _run(_get(uid, "profile", "profile")) or {}
def fs_save_profile(uid, data): return _run(_save(uid, "profile", data, "profile", "profile", True))

def fs_get_collections(uid): return _run(_list(uid, "collection"))
def fs_create_collection(uid, data): return _run(_save(uid, "collection", data, "col"))
def fs_update_collection(uid, col_id, data): return _run(_save(uid, "collection", data, "col", col_id, True))
def fs_delete_collection(uid, col_id): return _run(_delete(uid, "collection", col_id))
def fs_add_collection_item(uid, col_id, item):
    collection = fs_get_collections_by_id(uid, col_id)
    if not collection: return item
    item = dict(item); item.setdefault("id", f"item_{uuid.uuid4().hex[:12]}")
    collection["items"] = collection.get("items", []) + [item]
    collection["itemCount"] = len(collection["items"])
    fs_update_collection(uid, col_id, collection)
    return item
def fs_get_collections_by_id(uid, col_id): return _run(_get(uid, "collection", col_id))

def _media_payload(media: MediaObject) -> dict:
    url = media.external_url or get_media_storage().presigned_url(media.object_key)
    return {
        "id": media.id, "userId": media.user_id, "url": url, "mediaUrl": url,
        "fileName": media.filename, "mediaType": media.mime_type,
        "fileSize": media.size_bytes, "checksum": media.checksum_sha256,
        "isGenerated": media.is_generated, "prompt": media.prompt,
        "createdAt": media.created_at.isoformat(),
    }

async def create_s3_media(uid: str, *, object_key: str, bucket: str, mime_type: str, size_bytes: int, checksum_sha256: str, filename: str, prompt: str | None = None, is_generated: bool = False) -> dict:
    async with AsyncSessionLocal() as session:
        await _ensure_user(session, uid)
        media = MediaObject(id=f"media_{uuid.uuid4().hex[:12]}", user_id=uid, object_key=object_key, bucket=bucket, mime_type=mime_type, size_bytes=size_bytes, checksum_sha256=checksum_sha256, filename=filename, prompt=prompt, is_generated=is_generated)
        session.add(media)
        await session.commit()
        await session.refresh(media)
        return _media_payload(media)

async def _list_media(uid: str, media_type: str | None = None) -> list[dict]:
    async with AsyncSessionLocal() as session:
        rows = (await session.scalars(select(MediaObject).where(MediaObject.user_id == uid).order_by(MediaObject.created_at.desc()))).all()
        return [_media_payload(row) for row in rows if not media_type or media_type in row.mime_type]

async def _save_external_media(uid: str, data: dict) -> dict:
    data = dict(data)
    media_id = data.get("id") or f"media_{uuid.uuid4().hex[:12]}"
    url = data.get("url") or data.get("mediaUrl") or data.get("imageUrl")
    if not url or str(url).startswith("data:"):
        raise ValueError("Media URLs must be an S3 upload or a non-data external URL")
    async with AsyncSessionLocal() as session:
        await _ensure_user(session, uid)
        media = await session.get(MediaObject, media_id)
        if media and media.user_id != uid:
            raise ValueError("Media not found")
        if not media:
            media = MediaObject(id=media_id, user_id=uid, mime_type=data.get("mediaType") or data.get("type") or "application/octet-stream")
            session.add(media)
        media.external_url = url
        media.filename = data.get("fileName") or data.get("title") or media.filename
        media.size_bytes = int(data.get("fileSize") or 0)
        media.is_generated = bool(data.get("isGenerated"))
        media.prompt = data.get("prompt")
        await session.commit()
        await session.refresh(media)
        return _media_payload(media)

async def _delete_media(uid: str, media_id: str) -> bool:
    async with AsyncSessionLocal() as session:
        media = await session.scalar(select(MediaObject).where(MediaObject.id == media_id, MediaObject.user_id == uid))
        if not media:
            return False
        object_key = media.object_key
    if object_key:
        await asyncio.to_thread(get_media_storage().delete, object_key)
    async with AsyncSessionLocal() as session:
        result = await session.execute(delete(MediaObject).where(MediaObject.id == media_id, MediaObject.user_id == uid))
        await session.commit()
        return bool(result.rowcount)

def fs_get_media(uid, media_type=None): return _run(_list_media(uid, media_type))
def fs_save_media(uid, data): return _run(_save_external_media(uid, data))
def fs_delete_media(uid, media_id): return _run(_delete_media(uid, media_id))

def fs_get_daily_queue(uid): return _run(_list(uid, "daily_queue"))
def fs_save_daily_queue_slot(uid, data): return _run(_save(uid, "daily_queue", data, "slot"))
def fs_update_daily_queue_slot(uid, item_id, data): return _run(_save(uid, "daily_queue", data, "slot", item_id, True))
def fs_delete_daily_queue_slot(uid, item_id): return _run(_delete(uid, "daily_queue", item_id))

def _simple(kind, prefix):
    return (lambda uid: _run(_list(uid, kind)), lambda uid, data: _run(_save(uid, kind, data, prefix)), lambda uid, item_id, data: _run(_save(uid, kind, data, prefix, item_id, True)), lambda uid, item_id: _run(_delete(uid, kind, item_id)))

fs_get_events, fs_create_event, fs_update_event, fs_delete_event = _simple("event", "evt")
fs_get_members, fs_create_member, _, fs_delete_member = _simple("member", "mem")
fs_get_notes, fs_create_note, _, fs_delete_note = _simple("note", "note")
fs_get_music, fs_create_music, _, _ = _simple("music", "trk")
fs_get_journal, fs_create_journal, _, fs_delete_journal = _simple("journal", "jrn")
fs_get_enterprise_units, fs_create_enterprise_unit, fs_update_enterprise_unit, fs_delete_enterprise_unit = _simple("enterprise_unit", "unit")
fs_get_enterprise_guests, fs_create_enterprise_guest, fs_update_enterprise_guest, fs_delete_enterprise_guest = _simple("enterprise_guest", "gst")
fs_get_enterprise_templates, fs_create_enterprise_template, fs_update_enterprise_template, fs_delete_enterprise_template = _simple("enterprise_template", "tmpl")
fs_get_enterprise_narrations, fs_create_enterprise_narration, _, fs_delete_enterprise_narration = _simple("enterprise_narration", "narr")

def fs_get_library(uid): return _run(_list(uid, "library"))
def fs_get_curations(uid, curation_type="vizzy"):
    rows = _run(_list(uid, "curation"))
    return [x for x in rows if curation_type == "all" or x.get("type", curation_type) == curation_type]
def fs_create_curation(uid, data): return _run(_save(uid, "curation", data, "cur"))

def fs_get_settings(uid):
    defaults = {"display": {"auto_rotate": True, "transition_speed": "medium", "ambient_mode": True, "sleep_timer": False}, "notifications": {"new_curations": True, "event_reminders": True, "weekly_digest": False}, "privacy": {"public_profile": False, "share_collections": True}}
    existing = _run(_get(uid, "settings", "settings"))
    return existing or defaults
def fs_update_settings(uid, section, settings):
    current = fs_get_settings(uid); current[section] = {**current.get(section, {}), **settings}
    return _run(_save(uid, "settings", current, "settings", "settings", True))

def fs_get_vizzy_chats(uid): return _run(_list(uid, "vizzy_chat"))
def fs_get_vizzy_chat_detail(uid, chat_id): return _run(_get(uid, "vizzy_chat", chat_id))
def fs_save_vizzy_chat(uid, data):
    data = dict(data); data["updatedAt"] = _now()
    return _run(_save(uid, "vizzy_chat", data, "chat", data.get("id"), True))

def fs_get_proactive_dismissals(uid):
    doc = _run(_get(uid, "proactive_dismissals", "dismissals"))
    return doc.get("dismissed_ids", []) if doc else []

def fs_dismiss_proactive_item(uid, item_id: str):
    dismissed = list(fs_get_proactive_dismissals(uid))
    if item_id not in dismissed:
        dismissed.append(item_id)
        _run(_save(uid, "proactive_dismissals", {"dismissed_ids": dismissed}, "proactive_dismissals", "dismissals", True))
    return dismissed

