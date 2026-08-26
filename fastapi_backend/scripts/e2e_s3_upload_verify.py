"""One-shot production S3 upload verification. Does not print secrets."""

import io
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from typing import Dict, Tuple

try:
    import boto3
    from botocore.exceptions import ClientError
except ImportError:
    boto3 = None

API_BASE = os.environ.get("E2E_API_BASE", "https://ckoviz-backend.onrender.com").rstrip("/")
UPLOAD_PATH = os.environ.get("E2E_UPLOAD_PATH", "/api/upload")
AUTH_TOKEN = os.environ.get("E2E_AUTH_TOKEN", "e2e-s3-verify-20260822")
EXPECTED_BUCKET = os.environ.get("E2E_S3_BUCKET", "deckoviz-media-prod-2026")

# 1x1 PNG
PNG_BYTES = bytes.fromhex(
    "89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c489"
    "0000000a49444154789c6300010000050001"
    "0d0e0b28"
    "0000000049454e44ae426082"
)


def multipart_upload(filename: str, content: bytes, content_type: str) -> Tuple[int, Dict]:
    boundary = f"----DeckovizE2E{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}"
    body = io.BytesIO()
    body.write(f"--{boundary}\r\n".encode())
    body.write(
        f'Content-Disposition: form-data; name="file"; filename="{filename}"\r\n'.encode()
    )
    body.write(f"Content-Type: {content_type}\r\n\r\n".encode())
    body.write(content)
    body.write(f"\r\n--{boundary}--\r\n".encode())

    req = urllib.request.Request(
        f"{API_BASE}{UPLOAD_PATH}",
        data=body.getvalue(),
        method="POST",
        headers={
            "Authorization": f"Bearer {AUTH_TOKEN}",
            "Content-Type": f"multipart/form-data; boundary={boundary}",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return resp.status, json.loads(resp.read().decode())
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode()
        try:
            payload = json.loads(detail)
        except json.JSONDecodeError:
            payload = {"detail": detail}
        return exc.code, payload


def verify_presigned_url(url: str) -> Tuple[int, str]:
    req = urllib.request.Request(url, method="GET")
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return resp.status, resp.headers.get("Content-Type", "")
    except urllib.error.HTTPError as exc:
        return exc.code, exc.read(200).decode(errors="replace")


def verify_s3_object(object_key: str) -> Dict:
    if not boto3:
        return {"checked": False, "reason": "boto3 unavailable"}
    access_key = os.environ.get("AWS_ACCESS_KEY_ID")
    secret_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
    if not access_key or not secret_key:
        return {"checked": False, "reason": "AWS credentials not in environment"}

    client = boto3.client(
        "s3",
        region_name=os.environ.get("AWS_REGION", "eu-west-2"),
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
    )
    try:
        head = client.head_object(Bucket=EXPECTED_BUCKET, Key=object_key)
        return {
            "checked": True,
            "exists": True,
            "bucket": EXPECTED_BUCKET,
            "content_length": head.get("ContentLength"),
            "content_type": head.get("ContentType"),
        }
    except ClientError as exc:
        code = exc.response.get("Error", {}).get("Code", "Unknown")
        return {"checked": True, "exists": False, "bucket": EXPECTED_BUCKET, "error": code}


def redact_url(url: str) -> str:
    if not url:
        return url
    if "?" in url:
        base, _ = url.split("?", 1)
        return f"{base}?<presigned-query-redacted>"
    return url


def main() -> int:
    print(f"API: POST {API_BASE}{UPLOAD_PATH}")
    print(f"Auth: Bearer <token length {len(AUTH_TOKEN)}>")
    print(f"Expected bucket: {EXPECTED_BUCKET}")

    status, payload = multipart_upload("e2e-s3-test.png", PNG_BYTES, "image/png")
    print(f"Upload HTTP: {status}")
    print("Upload response:", json.dumps({**payload, "url": redact_url(payload.get("url", "")), "mediaUrl": redact_url(payload.get("mediaUrl", ""))}, indent=2))

    if status != 200:
        return 1

    url = payload.get("url") or payload.get("mediaUrl") or ""
    if "picsum.photos" in url:
        print("FAIL: response still uses picsum placeholder — S3 upload path not active on this deployment")
        return 2

    if EXPECTED_BUCKET not in url and "amazonaws.com" not in url and "X-Amz" not in url:
        print("WARN: presigned URL does not obviously reference S3; checking via HEAD")

    head_status, content_type = verify_presigned_url(url)
    print(f"Presigned GET HTTP: {head_status}, Content-Type: {content_type}")

    object_key = payload.get("object_key") or payload.get("objectKey")
    if not object_key and "amazonaws.com/" in url.split("?", 1)[0]:
        object_key = url.split("amazonaws.com/", 1)[1].split("?", 1)[0]

    s3_result = {"checked": False}
    if object_key:
        s3_result = verify_s3_object(object_key)
        print("S3 head_object:", json.dumps(s3_result, indent=2))
    else:
        print("No object_key in response; skipping direct S3 head_object")

    ok = status == 200 and head_status == 200 and "picsum.photos" not in url
    if s3_result.get("checked"):
        ok = ok and s3_result.get("exists") is True

    print("RESULT:", "PASS" if ok else "FAIL")
    return 0 if ok else 3


if __name__ == "__main__":
    sys.exit(main())
