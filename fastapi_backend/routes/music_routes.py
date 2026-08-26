"""Music Playback router.

Follows the same conventions as the rest of the Deckoviz FastAPI backend:
  - Auth:    get_current_user dependency (auth.py) -> FirebaseUser
  - S3:      S3MediaStorage.upload() via asyncio.to_thread (same as upload_routes.py)
  - DB:      AsyncSessionLocal async sessions (same as postgres_store.create_s3_media)
  - Schemas: camelCase aliases, from_attributes=True, populate_by_name=True (schemas.py)
  - WS:      ws_hub.envelope + route_to_tv + broadcast_to_browsers (same as livestream)
"""
import asyncio
import logging
import uuid
from datetime import datetime
from typing import Optional, List

logger = logging.getLogger("deckoviz.music_routes")

from fastapi import APIRouter, Depends, File, Form, HTTPException, Request, UploadFile, status
from sqlalchemy import select, delete as sa_delete
from sqlalchemy.orm import selectinload

from auth import get_current_user, FirebaseUser
from config import settings
from database import AsyncSessionLocal
import local_music_store
from models import Music, FavoriteMusic, Collection
from schemas import MusicResponse, FavoriteMusicResponse, AssignMusicRequest, PlayMusicRequest
from services import device_registry, ws_hub
from services.s3_storage import (
    MediaValidationError,
    get_media_storage,
    sanitize_filename,
    validate_media,
)

router = APIRouter(tags=["Music Playback"])

AUDIO_MIME_TYPES = {"audio/mpeg", "audio/mp4", "audio/ogg", "audio/wav", "audio/webm"}


def _validate_device_ownership(user_id: str, app_instance_id: str) -> None:
    """Same ownership check as POST /api/livestream/{app_instance_id}."""
    device = device_registry.get_device(app_instance_id)
    if not device or device.get("user_id") != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Device not found or belongs to another user.",
        )


def _music_payload(track) -> dict:
    if track.object_key:
        try:
            file_url = get_media_storage().presigned_url(track.object_key)
        except Exception:
            file_url = track.external_url
    else:
        file_url = track.external_url
    return {
        "id": track.id,
        "title": track.title,
        "artist": track.artist,
        "fileUrl": file_url,
        "uploadedBy": track.uploaded_by,
        "durationSeconds": track.duration_seconds,
        "createdAt": track.created_at.isoformat(),
    }


@router.get("/music", response_model=List[MusicResponse])
async def list_music(
    request: Request,
    search: Optional[str] = None,
    current_user: FirebaseUser = Depends(get_current_user),
):
    # ── Local-dev path ──────────────────────────────────────────────────────
    if settings.DEV_LOCAL_MUSIC_STORAGE:
        base = str(request.base_url).rstrip("/")
        tracks = local_music_store.list_tracks(search)
        return [
            MusicResponse(
                id=t["id"],
                title=t["title"],
                artist=t.get("artist"),
                file_url=local_music_store.local_file_url(base, t["disk_name"]),
                uploaded_by=t.get("uploaded_by"),
                duration_seconds=t.get("duration_seconds"),
                created_at=datetime.fromisoformat(t["created_at"]),
            )
            for t in tracks
        ]
    # ── Production path (S3 + PostgreSQL) ───────────────────────────────────
    async with AsyncSessionLocal() as session:
        stmt = select(Music).order_by(Music.created_at.desc())
        if search:
            stmt = stmt.where(Music.title.ilike(f"%{search}%"))
        rows = (await session.scalars(stmt)).all()
    result = []
    for track in rows:
        payload = _music_payload(track)
        result.append(MusicResponse(
            id=payload["id"], title=payload["title"], artist=payload.get("artist"),
            file_url=payload.get("fileUrl"), uploaded_by=payload.get("uploadedBy"),
            duration_seconds=payload.get("durationSeconds"), created_at=track.created_at,
        ))
    return result


@router.post("/music/upload", status_code=status.HTTP_201_CREATED)
async def upload_music(
    request: Request,
    file: UploadFile = File(...),
    title: Optional[str] = Form(None),
    artist: Optional[str] = Form(None),
    duration_seconds: Optional[float] = Form(None),
    current_user: FirebaseUser = Depends(get_current_user),
):
    uid = current_user.firebase_uid or current_user.id
    try:
        content_type = (file.content_type or "").lower().split(";", 1)[0].strip()
        if content_type not in AUDIO_MIME_TYPES:
            raise MediaValidationError("Unsupported audio type")

        # ── Local-dev path ──────────────────────────────────────────────────
        if settings.DEV_LOCAL_MUSIC_STORAGE:
            file_bytes = await file.read()
            if not file_bytes:
                raise MediaValidationError("Upload is empty")
            if len(file_bytes) > settings.S3_MAX_UPLOAD_BYTES:
                raise MediaValidationError("Upload exceeds the configured size limit")
            original_name = sanitize_filename(file.filename)
            track_id = f"music_{uuid.uuid4().hex[:12]}"
            saved = local_music_store.save_track(
                track_id=track_id,
                title=title.strip() if title and title.strip() else original_name,
                artist=artist.strip() if artist and artist.strip() else None,
                uploaded_by=uid,
                original_filename=original_name,
                file_bytes=file_bytes,
                content_type=content_type,
                duration_seconds=duration_seconds,
            )
            base = str(request.base_url).rstrip("/")
            logger.info("[music/upload] Local-dev saved: id=%s file=%s", track_id, saved["disk_name"])
            return {
                "id": saved["id"],
                "title": saved["title"],
                "artist": saved["artist"],
                "fileUrl": local_music_store.local_file_url(base, saved["disk_name"]),
                "uploadedBy": uid,
                "durationSeconds": saved.get("duration_seconds"),
                "createdAt": saved["created_at"],
            }

        # ── Production path (S3 + PostgreSQL) ───────────────────────────────
        validate_media(content_type, file.size)
        filename = sanitize_filename(title or file.filename)
        storage = get_media_storage()
        object_key, _checksum, _size = await asyncio.to_thread(
            storage.upload, user_id=uid, source=file.file, filename=filename,
            content_type=content_type, size=file.size,
        )
        track_id = f"music_{uuid.uuid4().hex[:12]}"
        async with AsyncSessionLocal() as session:
            track = Music(
                id=track_id, title=title or filename, artist=artist,
                object_key=object_key, bucket=storage.bucket,
                uploaded_by=uid, duration_seconds=duration_seconds,
            )
            session.add(track)
            await session.commit()
            await session.refresh(track)
        return _music_payload(track)
    except MediaValidationError as exc:
        code = status.HTTP_413_REQUEST_ENTITY_TOO_LARGE if "size" in str(exc).lower() else status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
        raise HTTPException(status_code=code, detail=str(exc)) from exc
    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("[music/upload] Unexpected error for user=%s filename=%s: %s", uid, getattr(file, 'filename', '?'), exc)
        raise HTTPException(status_code=500, detail="Failed to store music") from exc
    finally:
        await file.close()


@router.get("/music/favorites", response_model=List[FavoriteMusicResponse])
async def get_music_favorites(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    async with AsyncSessionLocal() as session:
        stmt = (
            select(FavoriteMusic)
            .where(FavoriteMusic.user_id == uid)
            .options(selectinload(FavoriteMusic.music))
            .order_by(FavoriteMusic.created_at.desc())
        )
        rows = (await session.scalars(stmt)).all()
    result = []
    for fav in rows:
        music_resp = None
        if fav.music:
            payload = _music_payload(fav.music)
            music_resp = MusicResponse(
                id=payload["id"], title=payload["title"], artist=payload.get("artist"),
                file_url=payload.get("fileUrl"), uploaded_by=payload.get("uploadedBy"),
                duration_seconds=payload.get("durationSeconds"), created_at=fav.music.created_at,
            )
        result.append(FavoriteMusicResponse(
            id=fav.id, user_id=fav.user_id, music_id=fav.music_id,
            music=music_resp, created_at=fav.created_at,
        ))
    return result


@router.post("/music/{music_id}/favorite", status_code=status.HTTP_201_CREATED)
async def add_music_favorite(music_id: str, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    async with AsyncSessionLocal() as session:
        track = await session.get(Music, music_id)
        if not track:
            raise HTTPException(status_code=404, detail="Music track not found")
        existing = await session.scalar(
            select(FavoriteMusic).where(FavoriteMusic.user_id == uid, FavoriteMusic.music_id == music_id)
        )
        if existing:
            return {"success": True, "already_favorited": True, "id": existing.id}
        fav = FavoriteMusic(id=f"fav_music_{uuid.uuid4().hex[:12]}", user_id=uid, music_id=music_id)
        session.add(fav)
        await session.commit()
        await session.refresh(fav)
    return {"success": True, "already_favorited": False, "id": fav.id}


@router.delete("/music/{music_id}/favorite", status_code=status.HTTP_200_OK)
async def remove_music_favorite(music_id: str, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            sa_delete(FavoriteMusic).where(FavoriteMusic.user_id == uid, FavoriteMusic.music_id == music_id)
        )
        await session.commit()
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Favourite not found")
    return {"success": True}


@router.patch("/collections/{collection_id}/music")
async def assign_collection_music(
    collection_id: str,
    body: AssignMusicRequest,
    current_user: FirebaseUser = Depends(get_current_user),
):
    uid = current_user.firebase_uid or current_user.id
    async with AsyncSessionLocal() as session:
        collection = await session.get(Collection, collection_id)
        if not collection:
            raise HTTPException(status_code=404, detail="Collection not found")
        if collection.user_id != uid:
            raise HTTPException(status_code=403, detail="Not authorized to modify this collection")
        new_music_id = body.music_id
        if new_music_id is not None:
            track = await session.get(Music, new_music_id)
            if not track:
                raise HTTPException(status_code=404, detail="Music track not found")
        collection.assigned_music_id = new_music_id
        await session.commit()
    return {"success": True, "collectionId": collection_id, "assignedMusicId": new_music_id}


@router.post("/music/{app_instance_id}/play")
async def play_music_on_device(
    request: Request,
    app_instance_id: str,
    body: PlayMusicRequest,
    current_user: FirebaseUser = Depends(get_current_user),
):
    """Notify the target TV (and browser sessions) to start a track.

    Mirrors POST /api/livestream/{app_instance_id}: ownership check, envelope
    dispatch via ws_hub, dual broadcast to TV + browsers, same response shape.
    Independent of live-stream / ritual priority — no shared interrupt path.
    """
    uid = current_user.firebase_uid or current_user.id
    _validate_device_ownership(uid, app_instance_id)

    # ── Local-dev path ──────────────────────────────────────────────────────
    if settings.DEV_LOCAL_MUSIC_STORAGE:
        track_data = local_music_store.get_track(body.music_id)
        if not track_data:
            raise HTTPException(status_code=404, detail="Music track not found")
        base = str(request.base_url).rstrip("/")
        file_url = local_music_store.local_file_url(base, track_data["disk_name"])

        msg = ws_hub.envelope(
            "play_music",
            {
                "track_id": track_data["id"],
                "title": track_data["title"],
                "artist": track_data.get("artist"),
                "url": file_url,
                "loop": True,
                "app_instance_id": app_instance_id,
            },
            target={"app_instance_id": app_instance_id},
        )
        # Independent of visual layer — does not interrupt any active image/collection.
        sent = await ws_hub.route_to_tv(uid, app_instance_id, msg)
        await ws_hub.broadcast_to_browsers(uid, msg)

        if not sent:
            await ws_hub.broadcast_to_browsers(
                uid,
                ws_hub.envelope(
                    "error",
                    {
                        "reference_message_id": msg["message_id"],
                        "status": "failed",
                        "reason": "Target device not connected",
                        "error_code": ws_hub.WsErrorCode.DEVICE_NOT_CONNECTED,
                        "app_instance_id": app_instance_id,
                        "music_id": body.music_id,
                    },
                ),
            )
        logger.info(
            "[music/play] Local-dev dispatched track_id=%s to device=%s sent=%s",
            body.music_id, app_instance_id, sent,
        )
        return {
            "success": True,
            "dispatched": sent,
            "message_id": msg["message_id"],
            "mode": "music_playback",
            "target_app_instance_id": app_instance_id,
        }

    # ── Production path (S3 + PostgreSQL) ───────────────────────────────
    async with AsyncSessionLocal() as session:
        track = await session.get(Music, body.music_id)
        if not track:
            raise HTTPException(status_code=404, detail="Music track not found")
        music_id = track.id
        title = track.title
        artist = track.artist
        duration_seconds = track.duration_seconds
        track_payload = _music_payload(track)

    msg = ws_hub.envelope(
        "play_music",
        {
            "music_id": music_id,
            "file_url": track_payload.get("fileUrl"),
            "title": title,
            "artist": artist,
            "duration_seconds": duration_seconds,
            "app_instance_id": app_instance_id,
        },
        target={"app_instance_id": app_instance_id},
    )

    # Direct WS dispatch — does not go through any scheduler / live-stream priority gate.
    sent = await ws_hub.route_to_tv(uid, app_instance_id, msg)
    await ws_hub.broadcast_to_browsers(uid, msg)

    if not sent:
        # Notify connected mobile/browser sessions with the standard WS error envelope.
        await ws_hub.broadcast_to_browsers(
            uid,
            ws_hub.envelope(
                "error",
                {
                    "reference_message_id": msg["message_id"],
                    "status": "failed",
                    "reason": "Target device not connected",
                    "error_code": ws_hub.WsErrorCode.DEVICE_NOT_CONNECTED,
                    "app_instance_id": app_instance_id,
                    "music_id": body.music_id,
                },
            ),
        )

    return {
        "success": True,
        "dispatched": sent,
        "message_id": msg["message_id"],
        "mode": "music_playback",
        "target_app_instance_id": app_instance_id,
    }
