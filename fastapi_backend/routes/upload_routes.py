import asyncio
from typing import Optional
from fastapi import APIRouter, Depends, File, UploadFile, Form, HTTPException, Request, status
from auth import get_current_user, FirebaseUser
from postgres_store import create_s3_media, fs_save_media
from services.s3_storage import MediaValidationError, get_media_storage, sanitize_filename, validate_media

router = APIRouter(tags=["Media Uploads - private S3"])

@router.post("/upload")
@router.post("/home/media")
async def upload_media(
    request: Request,
    file: Optional[UploadFile] = File(None),
    url: Optional[str] = Form(None),
    fileName: Optional[str] = Form(None),
    prompt: Optional[str] = Form(None),
    source: Optional[str] = Form(None),
    current_user: FirebaseUser = Depends(get_current_user)
):
    uid = current_user.firebase_uid or current_user.id
    try:
        # Existing clients can still register a trusted external URL. File uploads
        # always go to private S3; data URLs and placeholder fallbacks are rejected.
        if request.headers.get("content-type", "").startswith("application/json"):
            payload = await request.json()
            payload["prompt"] = payload.get("prompt") or prompt
            payload["isGenerated"] = bool(payload.get("isGenerated") or source == "vizzy_chat")
            return fs_save_media(uid, payload)
        if url:
            return fs_save_media(uid, {"url": url, "fileName": fileName, "prompt": prompt, "isGenerated": source == "vizzy_chat"})
        if not file:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="A media file or URL is required")

        content_type = validate_media(file.content_type, file.size)
        filename = sanitize_filename(fileName or file.filename)
        storage = get_media_storage()
        object_key, checksum, size_bytes = await asyncio.to_thread(
            storage.upload, user_id=uid, source=file.file, filename=filename,
            content_type=content_type, size=file.size,
        )
        try:
            return await create_s3_media(
                uid, object_key=object_key, bucket=storage.bucket, mime_type=content_type,
                size_bytes=size_bytes, checksum_sha256=checksum, filename=filename,
                prompt=prompt, is_generated=bool(prompt or source == "vizzy_chat"),
            )
        except Exception:
            await asyncio.to_thread(storage.delete, object_key)
            raise
    except MediaValidationError as exc:
        status_code = status.HTTP_413_REQUEST_ENTITY_TOO_LARGE if "size" in str(exc).lower() else status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
        raise HTTPException(status_code=status_code, detail=str(exc)) from exc
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to store media")
    finally:
        if file:
            await file.close()
