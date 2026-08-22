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


class S3MediaStorage:
    def __init__(self) -> None:
        self.bucket = settings.S3_MEDIA_BUCKET
        self.prefix = settings.S3_MEDIA_PREFIX.strip("/")
        self.client = boto3.client("s3", region_name=settings.AWS_REGION, config=Config(retries={"max_attempts": 3, "mode": "standard"}))

    def upload(self, *, user_id: str, source: BinaryIO, filename: str, content_type: str, size: int | None) -> tuple[str, str, int]:
        mime_type = validate_media(content_type, size)
        clean_name = sanitize_filename(filename)
        extension = os.path.splitext(clean_name)[1].lower()
        object_key = "/".join(part for part in (self.prefix, user_id, f"{uuid.uuid4().hex}{extension}") if part)
        reader = _HashingReader(source)
        self.client.upload_fileobj(reader, self.bucket, object_key, ExtraArgs={
            "ContentType": mime_type,
            "ServerSideEncryption": "AES256",
            "Metadata": {"original-filename": clean_name, "user-id": user_id},
        })
        if reader.bytes_read == 0:
            self.delete(object_key)
            raise MediaValidationError("Upload is empty")
        return object_key, reader.hasher.hexdigest(), reader.bytes_read

    def presigned_url(self, object_key: str) -> str:
        return self.client.generate_presigned_url("get_object", Params={"Bucket": self.bucket, "Key": object_key}, ExpiresIn=settings.S3_PRESIGNED_URL_EXPIRES_SECONDS)

    def delete(self, object_key: str) -> None:
        self.client.delete_object(Bucket=self.bucket, Key=object_key)


def get_media_storage() -> S3MediaStorage:
    return S3MediaStorage()
