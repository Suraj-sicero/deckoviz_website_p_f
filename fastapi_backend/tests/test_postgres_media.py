"""PostgreSQL media store tests with mocked S3; no live AWS or database."""
import asyncio
import os
import sys
import unittest
from unittest.mock import AsyncMock, MagicMock, patch

os.environ.setdefault("DATABASE_URL", "postgresql+asyncpg://user:password@example.invalid:5432/postgres")
os.environ.setdefault("S3_MEDIA_BUCKET", "deckoviz-test-media")
os.environ.setdefault("AWS_REGION", "eu-west-2")

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from models import MediaObject


class PostgresMediaStoreTests(unittest.TestCase):
    @patch("postgres_store.get_media_storage")
    @patch("postgres_store.AsyncSessionLocal")
    def test_delete_media_removes_s3_object_and_db_row(self, session_factory, storage_factory):
        import postgres_store

        media = MediaObject(
            id="media_abc",
            user_id="user_1",
            object_key="media/segment/file.png",
            bucket="private-bucket",
            mime_type="image/png",
            size_bytes=4,
        )

        session = MagicMock()
        session.scalar = AsyncMock(return_value=media)
        session.execute = AsyncMock()
        session.execute.return_value.rowcount = 1
        session.commit = AsyncMock()
        session.__aenter__ = AsyncMock(return_value=session)
        session.__aexit__ = AsyncMock(return_value=False)
        session_factory.return_value = session

        storage = MagicMock()
        storage_factory.return_value = storage

        result = postgres_store.fs_delete_media("user_1", "media_abc")

        self.assertTrue(result)
        storage.delete.assert_called_once_with("media/segment/file.png")
        self.assertEqual(session_factory.call_count, 2)

    @patch("postgres_store.get_media_storage")
    def test_media_payload_includes_url_aliases(self, storage_factory):
        import postgres_store

        storage = MagicMock()
        storage.presigned_url.return_value = "https://signed.example/object"
        storage_factory.return_value = storage

        media = MediaObject(
            id="media_1",
            user_id="user_1",
            object_key="media/key.png",
            bucket="bucket",
            mime_type="image/png",
            size_bytes=10,
            filename="key.png",
            is_generated=False,
        )
        media.created_at = media.created_at or __import__("datetime").datetime.utcnow()

        payload = postgres_store._media_payload(media)

        self.assertEqual(payload["url"], payload["mediaUrl"])
        self.assertEqual(payload["url"], "https://signed.example/object")
        self.assertEqual(payload["fileName"], "key.png")


class PostgresStoreAsyncTests(unittest.IsolatedAsyncioTestCase):
    @patch("postgres_store.AsyncSessionLocal")
    async def test_create_s3_media_persists_metadata(self, session_factory):
        import postgres_store

        session = MagicMock()
        session.get = AsyncMock(return_value=None)
        session.add = MagicMock()
        session.commit = AsyncMock()
        session.refresh = AsyncMock(side_effect=lambda obj: setattr(obj, "created_at", __import__("datetime").datetime.utcnow()))
        session.__aenter__ = AsyncMock(return_value=session)
        session.__aexit__ = AsyncMock(return_value=False)
        session_factory.return_value = session

        with patch("postgres_store.get_media_storage") as storage_factory:
            storage = MagicMock()
            storage.presigned_url.return_value = "https://signed.example/new"
            storage_factory.return_value = storage

            payload = await postgres_store.create_s3_media(
                "user_1",
                object_key="media/u/file.jpg",
                bucket="bucket",
                mime_type="image/jpeg",
                size_bytes=100,
                checksum_sha256="abc",
                filename="file.jpg",
            )

        self.assertEqual(payload["url"], payload["mediaUrl"])
        session.add.assert_called()
        added_media = [call.args[0] for call in session.add.call_args_list if isinstance(call.args[0], MediaObject)]
        self.assertEqual(len(added_media), 1)
        self.assertEqual(added_media[0].user_id, "user_1")
        self.assertEqual(added_media[0].object_key, "media/u/file.jpg")


if __name__ == "__main__":
    unittest.main()
