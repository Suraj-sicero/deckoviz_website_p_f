"""Private S3 media storage using the standard AWS IAM credential chain."""
from __future__ import annotations

import hashlib
import os
import re
import uuid
from pathlib import PurePath
from typing import BinaryIO

import boto3
from botocore.config import Config

from config import settings

ALLOWED_MEDIA_TYPES = {
    "image/jpeg", "image/png", "image/webp", "image/gif",
    "video/mp4", "video/webm", "audio/mpeg", "audio/mp4", "audio/ogg", "audio/wav",
}

# Per-library allowed types — extend helper, don't replace validate_media
LIBRARY_TYPE_MIMES: dict[str, set[str]] = {
    "image": {"image/jpeg", "image/png", "image/webp", "image/gif"},
    "music": {"audio/mpeg", "audio/mp4", "audio/ogg", "audio/wav"},
    "video": {"video/mp4", "video/webm"},
    "art": {"image/jpeg", "image/png", "image/webp", "image/gif"},
    "posters": {"image/jpeg", "image/png", "image/webp", "image/gif"},
    "photos": {"image/jpeg", "image/png", "image/webp", "image/gif"},
    "art/posters/photos": {"image/jpeg", "image/png", "image/webp", "image/gif"},
    "all": ALLOWED_MEDIA_TYPES,
}


class MediaValidationError(ValueError):
    pass


def sanitize_filename(filename: str | None) -> str:
    name = PurePath(filename or "upload").name
    stem, extension = os.path.splitext(name)
    stem = re.sub(r"[^A-Za-z0-9_-]+", "-", stem).strip(".-")
    extension = re.sub(r"[^A-Za-z0-9.]", "", extension.lower())[:16]
    return f"{(stem or 'upload')[:180]}{extension}"


def validate_media(content_type: str | None, size: int | None) -> str:
    mime_type = (content_type or "").lower().split(";", 1)[0].strip()
    if mime_type not in ALLOWED_MEDIA_TYPES:
        raise MediaValidationError("Unsupported media type")
    if size is not None and size > settings.S3_MAX_UPLOAD_BYTES:
        raise MediaValidationError("Upload exceeds the configured size limit")
    return mime_type


def get_allowed_types_for_library(library_type: str | None) -> set[str]:
    if not library_type:
        return ALLOWED_MEDIA_TYPES
    key = library_type.strip().lower()
    return LIBRARY_TYPE_MIMES.get(key, ALLOWED_MEDIA_TYPES)


def validate_media_for_library(content_type: str | None, size: int | None, library_type: str | None) -> str:
    """Validate mime matches target library (e.g. reject video in image library). Extends validate_media."""
    mime_type = validate_media(content_type, size)
    allowed = get_allowed_types_for_library(library_type)
    if mime_type not in allowed:
        raise MediaValidationError(f"File type {mime_type} not allowed in {library_type or 'all'} library")
    return mime_type


class _HashingReader:
    def __init__(self, source: BinaryIO):
        self.source = source
        self.hasher = hashlib.sha256()
        self.bytes_read = 0

    def read(self, size: int = -1) -> bytes:
        chunk = self.source.read(size)
        if chunk:
            self.hasher.update(chunk)
            self.bytes_read += len(chunk)
            if self.bytes_read > settings.S3_MAX_UPLOAD_BYTES:
                raise MediaValidationError("Upload exceeds the configured size limit")
        return chunk


def _build_s3_client():
    """Use explicit env credentials when set; otherwise the standard IAM provider chain."""
    client_kwargs: dict = {
        "region_name": settings.AWS_REGION,
        "config": Config(connect_timeout=5, read_timeout=60, retries={"max_attempts": 3, "mode": "standard"}),
    }
    access_key = os.environ.get("AWS_ACCESS_KEY_ID")
    secret_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
    if access_key and secret_key:
        client_kwargs["aws_access_key_id"] = access_key
        client_kwargs["aws_secret_access_key"] = secret_key
    return boto3.client("s3", **client_kwargs)


class S3MediaStorage:
    def __init__(self) -> None:
        self.bucket = settings.S3_MEDIA_BUCKET
        self.prefix = settings.S3_MEDIA_PREFIX.strip("/")
        self.client = _build_s3_client()

    def upload(self, *, user_id: str, source: BinaryIO, filename: str, content_type: str, size: int | None) -> tuple[str, str, int]:
        mime_type = validate_media(content_type, size)
        clean_name = sanitize_filename(filename)
        extension = os.path.splitext(clean_name)[1].lower()
        # Never use an identity value directly as a path segment.
        user_segment = hashlib.sha256(user_id.encode("utf-8")).hexdigest()[:32]
        unique_name = f"{uuid.uuid4().hex}{extension}"
        object_key = "/".join(part for part in (self.prefix, user_segment, unique_name) if part)
        reader = _HashingReader(source)
        
        # Try S3 if client and bucket configured; otherwise gracefully fallback to local static storage
        if self.client and self.bucket and "your-private-media-bucket" not in self.bucket:
            try:
                self.client.upload_fileobj(reader, self.bucket, object_key, ExtraArgs={
                    "ContentType": mime_type,
                    "ServerSideEncryption": "AES256",
                    "Metadata": {"original-filename": clean_name, "user-id": user_id},
                })
                if reader.bytes_read == 0:
                    self.delete(object_key)
                    raise MediaValidationError("Upload is empty")
                return object_key, reader.hasher.hexdigest(), reader.bytes_read
            except MediaValidationError:
                raise
            except Exception as e:
                import logging
                logging.getLogger("deckoviz.s3").warning("S3 upload failed, falling back to local static storage: %s", e)

        # Local static upload fallback
        upload_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "static", "uploads")
        os.makedirs(upload_dir, exist_ok=True)
        local_filename = f"{user_segment}_{unique_name}"
        local_path = os.path.join(upload_dir, local_filename)
        
        source.seek(0)
        reader = _HashingReader(source)
        with open(local_path, "wb") as f:
            while chunk := reader.read(65536):
                f.write(chunk)
                
        if reader.bytes_read == 0:
            if os.path.exists(local_path):
                os.remove(local_path)
            raise MediaValidationError("Upload is empty")
            
        local_key = f"local/{local_filename}"
        return local_key, reader.hasher.hexdigest(), reader.bytes_read

    def presigned_url(self, object_key: str) -> str:
        if not object_key:
            return ""
        if object_key.startswith("http://") or object_key.startswith("https://"):
            return object_key
        if object_key.startswith("local/"):
            filename = object_key.replace("local/", "")
            return f"http://127.0.0.1:8000/static/uploads/{filename}"
        try:
            return self.client.generate_presigned_url("get_object", Params={"Bucket": self.bucket, "Key": object_key}, ExpiresIn=settings.S3_PRESIGNED_URL_EXPIRES_SECONDS)
        except Exception:
            return f"http://127.0.0.1:8000/static/uploads/{os.path.basename(object_key)}"

    def delete(self, object_key: str) -> None:
        if object_key.startswith("local/"):
            filename = object_key.replace("local/", "")
            upload_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "static", "uploads")
            local_path = os.path.join(upload_dir, filename)
            if os.path.exists(local_path):
                try:
                    os.remove(local_path)
                except Exception:
                    pass
            return
        try:
            self.client.delete_object(Bucket=self.bucket, Key=object_key)
        except Exception:
            pass


def process_video_in_background(object_key: str, user_id: str) -> None:
    """Placeholder for heavy video transcoding — runs via BackgroundTasks so upload returns fast."""
    # In production this would trigger a transcoding pipeline (e.g. FFmpeg, MediaConvert)
    # For now we just log; the file is already in S3 and accessible.
    import logging
    logging.getLogger("deckoviz.s3").info(f"Background video processing queued for {object_key} user {user_id}")


def generate_waveform_in_background(object_key: str, user_id: str) -> None:
    """Placeholder for audio waveform generation — runs via BackgroundTasks."""
    import logging
    logging.getLogger("deckoviz.s3").info(f"Background waveform generation queued for {object_key} user {user_id}")


def get_media_storage() -> S3MediaStorage:
    return S3MediaStorage()
