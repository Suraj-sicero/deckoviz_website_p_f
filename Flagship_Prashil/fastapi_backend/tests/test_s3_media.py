"""Mocked S3 and upload-route tests; no AWS or PostgreSQL connection is made."""
import io
import os
import sys
import unittest
from unittest.mock import patch

os.environ.setdefault("DATABASE_URL", "postgresql+asyncpg://user:password@example.invalid:5432/postgres")
os.environ.setdefault("S3_MEDIA_BUCKET", "deckoviz-test-media")
os.environ.setdefault("AWS_REGION", "eu-west-2")

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from httpx import ASGITransport, AsyncClient
from fastapi import FastAPI

from auth import FirebaseUser, get_current_user
from routes.upload_routes import router
from services.s3_storage import MediaValidationError, S3MediaStorage, sanitize_filename, validate_media


class FakeS3Client:
    def __init__(self):
        self.objects = {}
        self.deleted = []

    def upload_fileobj(self, fileobj, bucket, key, ExtraArgs):
        self.objects[(bucket, key)] = {"data": fileobj.read(), "args": ExtraArgs}

    def delete_object(self, Bucket, Key):
        self.deleted.append((Bucket, Key))

    def generate_presigned_url(self, operation, Params, ExpiresIn):
        return f"https://signed.example/{Params['Key']}?expires={ExpiresIn}"


class S3MediaStorageTests(unittest.TestCase):
    @patch.dict(os.environ, {"AWS_ACCESS_KEY_ID": "test-key", "AWS_SECRET_ACCESS_KEY": "test-secret"}, clear=False)
    @patch("services.s3_storage.boto3.client")
    def test_builds_client_with_env_credentials_when_present(self, boto_client):
        from services.s3_storage import _build_s3_client

        _build_s3_client()
        boto_client.assert_called_once()
        kwargs = boto_client.call_args.kwargs
        self.assertEqual(kwargs["aws_access_key_id"], "test-key")
        self.assertEqual(kwargs["aws_secret_access_key"], "test-secret")

    def test_upload_is_private_streamed_and_hashed(self):
        client = FakeS3Client()
        storage = object.__new__(S3MediaStorage)
        storage.bucket, storage.prefix, storage.client = "private-bucket", "media", client

        key, checksum, size = storage.upload(
            user_id="uid/unsafe", source=io.BytesIO(b"hello"), filename="../../My photo!.png",
            content_type="image/png", size=5,
        )

        self.assertTrue(key.startswith("media/"))
        self.assertNotIn("uid/unsafe", key)
        self.assertEqual(size, 5)
        self.assertEqual(len(checksum), 64)
        saved = client.objects[("private-bucket", key)]
        self.assertEqual(saved["data"], b"hello")
        self.assertEqual(saved["args"]["ContentType"], "image/png")
        self.assertEqual(saved["args"]["ServerSideEncryption"], "AES256")

    def test_validation_rejects_invalid_media(self):
        self.assertEqual(sanitize_filename("../../hello world.png"), "hello-world.png")
        with self.assertRaises(MediaValidationError):
            validate_media("application/x-msdownload", 1)

    def test_delete_removes_object_from_s3(self):
        client = FakeS3Client()
        storage = object.__new__(S3MediaStorage)
        storage.bucket, storage.client = "private-bucket", client

        storage.delete("media/user/file.png")

        self.assertEqual(client.deleted, [("private-bucket", "media/user/file.png")])


class UploadRouteTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.app = FastAPI()
        self.app.include_router(router, prefix="/api")
        self.app.dependency_overrides[get_current_user] = lambda: FirebaseUser(
            id="firebase-user", firebase_uid="firebase-user", email="user@example.test"
        )
        transport = ASGITransport(app=self.app)
        self.client = AsyncClient(transport=transport, base_url="http://testserver")

    async def asyncTearDown(self):
        self.app.dependency_overrides.clear()
        await self.client.aclose()

    @patch("routes.upload_routes.create_s3_media")
    @patch("routes.upload_routes.get_media_storage")
    async def test_upload_contract_uses_s3_and_preserves_aliases(self, storage_factory, create_media):
        class Storage:
            bucket = "private-bucket"
            def upload(self, **kwargs): return "media/key.png", "a" * 64, 4
            def delete(self, key): self.deleted_key = key
        storage_factory.return_value = Storage()
        create_media.return_value = {
            "id": "media_1", "url": "https://signed.example/key", "mediaUrl": "https://signed.example/key",
            "fileName": "image.png", "fileSize": 4,
        }

        response = await self.client.post("/api/upload", files={"file": ("image.png", b"data", "image/png")})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["mediaUrl"], response.json()["url"])
        create_media.assert_awaited_once()

