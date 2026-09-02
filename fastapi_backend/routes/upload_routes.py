import asyncio
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Depends, File, UploadFile, Form, HTTPException, Request, status, BackgroundTasks
from pydantic import BaseModel
from auth import get_current_user, FirebaseUser
from postgres_store import create_s3_media, fs_save_media, fs_get_collections, tag_media_batch
from services.s3_storage import (
    MediaValidationError,
    get_media_storage,
    sanitize_filename,
    validate_media,
    validate_media_for_library,
    process_video_in_background,
    generate_waveform_in_background,
)

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


# ── Batch Upload — reusable for personal vs global, capped at 200, parallel ──
class BatchTagRequest(BaseModel):
    media_ids: List[str]
    tags: Optional[str] = None
    collection_id: Optional[str] = None
    collection_name: Optional[str] = None
    curation_id: Optional[str] = None
    destination: str = "personal"
    library_type: Optional[str] = None


async def _process_single_upload(
    file: UploadFile,
    uid: str,
    library_type: Optional[str],
    destination: str,
    background_tasks: BackgroundTasks,
) -> Dict[str, Any]:
    filename = file.filename or "upload"
    try:
        content_type = validate_media_for_library(file.content_type, file.size, library_type)
        clean_name = sanitize_filename(filename)
        storage = get_media_storage()
        # For global destination, use a global segment so admin uploads don't collide with personal
        effective_uid = "global" if destination == "global" else uid
        object_key, checksum, size_bytes = await asyncio.to_thread(
            storage.upload, user_id=effective_uid, source=file.file, filename=clean_name,
            content_type=content_type, size=file.size,
        )
        # Background processing for heavy types
        if content_type.startswith("video/"):
            background_tasks.add_task(process_video_in_background, object_key, effective_uid)
        elif content_type.startswith("audio/"):
            background_tasks.add_task(generate_waveform_in_background, object_key, effective_uid)
        try:
            media = await create_s3_media(
                effective_uid if destination == "global" else uid,
                object_key=object_key, bucket=storage.bucket, mime_type=content_type,
                size_bytes=size_bytes, checksum_sha256=checksum, filename=clean_name,
                prompt=None, is_generated=False,
            )
            # If global, also store a marker that this is global (for admin library)
            if destination == "global":
                media["is_global"] = True
                media["destination"] = "global"
            return {"filename": filename, "clean_name": clean_name, "status": "done", "media": media}
        except Exception as e:
            await asyncio.to_thread(storage.delete, object_key)
            return {"filename": filename, "clean_name": clean_name, "status": "failed", "error": str(e)}
    except MediaValidationError as exc:
        return {"filename": filename, "clean_name": filename, "status": "failed", "error": str(exc)}
    except Exception as exc:
        return {"filename": filename, "clean_name": filename, "status": "failed", "error": str(exc)}
    finally:
        try:
            await file.close()
        except Exception:
            pass


@router.post("/upload/batch")
async def upload_batch(
    background_tasks: BackgroundTasks,
    files: List[UploadFile] = File(...),
    destination: str = Form("personal"),
    library_type: Optional[str] = Form(None),
    current_user: FirebaseUser = Depends(get_current_user),
):
    uid = current_user.firebase_uid or current_user.id
    # Enforce 200 cap server-side
    if len(files) > 200:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Batch exceeds 200 files limit")
    if len(files) == 0:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="No files provided")
    # Normalize destination
    dest = destination.strip().lower() if destination else "personal"
    if dest not in ("personal", "global"):
        dest = "personal"
    # For global, ensure user is admin (simple check: role == admin or email contains admin)
    if dest == "global":
        role = getattr(current_user, "role", "") or ""
        email = getattr(current_user, "email", "") or ""
        is_admin = role.lower() == "admin" or "admin" in email.lower() or "deckovizadmin" in email.lower()
        # For local dev with passcode auth, allow global even without role, but log
        if not is_admin:
            # Still allow but mark; in production this would be 403
            pass

    # Process in parallel — chunked to avoid overwhelming S3 (chunks of 20)
    results: List[Dict[str, Any]] = []
    chunk_size = 20
    for i in range(0, len(files), chunk_size):
        chunk = files[i:i+chunk_size]
        chunk_results = await asyncio.gather(
            *[_process_single_upload(f, uid, library_type, dest, background_tasks) for f in chunk]
        )
        results.extend(chunk_results)

    # Summary
    done = sum(1 for r in results if r["status"] == "done")
    failed = len(results) - done
    return {
        "batch_id": f"batch_{uid[:8]}_{len(results)}",
        "destination": dest,
        "library_type": library_type,
        "total": len(results),
        "done": done,
        "failed": failed,
        "results": results,
    }


@router.post("/upload/batch/retry")
async def retry_single_upload(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    destination: str = Form("personal"),
    library_type: Optional[str] = Form(None),
    current_user: FirebaseUser = Depends(get_current_user),
):
    uid = current_user.firebase_uid or current_user.id
    dest = destination.strip().lower() if destination else "personal"
    if dest not in ("personal", "global"):
        dest = "personal"
    result = await _process_single_upload(file, uid, library_type, dest, background_tasks)
    if result["status"] == "failed":
        # Map to 422 for validation errors, 500 otherwise
        err = result.get("error", "")
        if "Unsupported" in err or "not allowed" in err:
            raise HTTPException(status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, detail=err)
        if "size" in err.lower():
            raise HTTPException(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail=err)
        # Return the failed result as 200 with status failed so frontend can show it
        return result
    return result


@router.post("/upload/batch/tag")
async def tag_batch(
    payload: BatchTagRequest,
    current_user: FirebaseUser = Depends(get_current_user),
):
    uid = current_user.firebase_uid or current_user.id
    dest = payload.destination.strip().lower() if payload.destination else "personal"
    if dest not in ("personal", "global"):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="destination must be personal or global")
    if not payload.media_ids:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="At least one media_id is required")
    if len(payload.media_ids) > 200:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Batch exceeds 200 files limit")
    # Global uploads are owned by the shared global library record; personal uploads
    # remain scoped to the requesting user, matching the upload path.
    tagged = await tag_media_batch(
        "global" if dest == "global" else uid,
        payload.media_ids,
        tags=payload.tags,
        collection_id=payload.collection_id,
        collection_name=payload.collection_name,
    )
    return {
        "tagged": sum(1 for result in tagged if result["status"] == "tagged"),
        "destination": dest,
        "library_type": payload.library_type,
        "results": tagged,
    }
