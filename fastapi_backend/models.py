import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, DateTime, ForeignKey, JSON, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    firebase_uid = Column(String, unique=True, index=True, nullable=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=True)
    display_name = Column(String, nullable=True)
    avatar = Column(Text, nullable=True)
    banner = Column(Text, nullable=True)
    role = Column(String, default="user")
    created_at = Column(DateTime, default=datetime.utcnow)

    profiles = relationship("Profile", back_populates="user", cascade="all, delete-orphan")
    collections = relationship("Collection", back_populates="user", cascade="all, delete-orphan")
    media = relationship("UploadedMedia", back_populates="user", cascade="all, delete-orphan")
    queue_slots = relationship("DailyQueueSlot", back_populates="user", cascade="all, delete-orphan")
    favorite_music = relationship("FavoriteMusic", back_populates="user", cascade="all, delete-orphan")

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    display_name = Column(String, nullable=True)
    username = Column(String, nullable=True)
    title = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    location = Column(String, nullable=True)
    avatar = Column(Text, nullable=True)
    banner = Column(Text, nullable=True)
    art_styles = Column(JSON, default=list)
    follower_count = Column(Integer, default=0)
    following_count = Column(Integer, default=0)
    post_count = Column(Integer, default=0)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="profiles")

class Collection(Base):
    __tablename__ = "collections"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    name = Column(String, nullable=False)
    title = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    music_url = Column(Text, nullable=True)
    assigned_music_id = Column(String, ForeignKey("music.id", ondelete="SET NULL"), nullable=True, index=True)
    tags = Column(JSON, default=list)
    display_minutes = Column(Integer, default=0)
    display_hours = Column(Integer, default=0)
    is_system = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="collections")
    items = relationship("CollectionItem", back_populates="collection", cascade="all, delete-orphan")
    assigned_music = relationship("Music", foreign_keys=[assigned_music_id])

class CollectionItem(Base):
    __tablename__ = "collection_items"

    id = Column(String, primary_key=True, default=generate_uuid)
    collection_id = Column(String, ForeignKey("collections.id"), nullable=False, index=True)
    item_type = Column(String, default="image")
    item_id = Column(String, nullable=True)
    url = Column(Text, nullable=True)
    media_url = Column(Text, nullable=True)
    title = Column(String, nullable=True)
    display_hours = Column(String, nullable=True)
    display_seconds = Column(String, nullable=True)
    meta_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    collection = relationship("Collection", back_populates="items")

class UploadedMedia(Base):
    __tablename__ = "uploaded_media"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    url = Column(Text, nullable=True)
    media_url = Column(Text, nullable=False)
    file_name = Column(String, nullable=True)
    media_type = Column(String, default="image/png")
    file_size = Column(Integer, default=0)
    is_generated = Column(Boolean, default=False)
    prompt = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="media")

class MediaObject(Base):
    """Private S3 object metadata. File bytes never enter PostgreSQL."""
    __tablename__ = "media_objects"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    object_key = Column(String(1024), nullable=True, unique=True)
    bucket = Column(String(255), nullable=True)
    mime_type = Column(String(255), nullable=False)
    size_bytes = Column(Integer, nullable=False, default=0)
    checksum_sha256 = Column(String(64), nullable=True)
    filename = Column(String(512), nullable=True)
    external_url = Column(Text, nullable=True)
    is_generated = Column(Boolean, default=False, nullable=False)
    prompt = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

class DailyQueueSlot(Base):
    __tablename__ = "daily_queue_slots"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    collection_id = Column(String, nullable=True)
    collection_name = Column(String, nullable=True)
    title = Column(String, nullable=True)
    start_time = Column(String, nullable=True)
    end_time = Column(String, nullable=True)
    day_of_week = Column(Integer, default=0)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="queue_slots")

class EventItem(Base):
    __tablename__ = "event_items"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, nullable=False, index=True)
    name = Column(String, nullable=False)
    date = Column(String, nullable=True)
    collection_name = Column(String, nullable=True)
    collection_id = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class VizzyChatSession(Base):
    __tablename__ = "vizzy_chat_sessions"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, nullable=False, index=True)
    title = Column(String, nullable=False)
    active_agent = Column(String, default="Art Generator")
    messages_json = Column(Text, default="[]")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class CurationItem(Base):
    __tablename__ = "curation_items"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, nullable=False, index=True)
    title = Column(String, nullable=False)
    subtitle = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=True)
    image_url = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class SavedNoteItem(Base):
    __tablename__ = "saved_note_items"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, nullable=False, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=True)
    tags = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)


class UserDocument(Base):
    """Ownership-scoped flexible payloads migrated from Firestore collections.

    Core collection/media models remain normalized above; this table preserves the
    deliberately variable payloads (enterprise units, templates, settings, etc.)
    without changing established API response shapes.
    """
    __tablename__ = "user_documents"
    __table_args__ = (UniqueConstraint("user_id", "kind", "document_id", name="uq_user_document"),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    kind = Column(String(64), nullable=False, index=True)
    document_id = Column(String(128), nullable=False, index=True)
    payload = Column(JSONB, nullable=False, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


# =========== MUSIC PLAYBACK ===========

class Music(Base):
    """A music track stored in private S3. File bytes never enter the database."""
    __tablename__ = "music"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String(512), nullable=False)
    artist = Column(String(512), nullable=True)
    # S3 storage: object_key + bucket — presigned URL generated on read (same as MediaObject)
    object_key = Column(String(1024), nullable=True, unique=True)
    bucket = Column(String(255), nullable=True)
    # Optional external URL for admin-seeded tracks that live outside S3
    external_url = Column(Text, nullable=True)
    # Nullable: admin-uploaded tracks may have no specific user owner
    uploaded_by = Column(String, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    duration_seconds = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    uploader = relationship("User", foreign_keys=[uploaded_by])
    favorited_by = relationship("FavoriteMusic", back_populates="music", cascade="all, delete-orphan")


class FavoriteMusic(Base):
    """Join table: one row per (user, music) favorite pair."""
    __tablename__ = "favorite_music"
    __table_args__ = (UniqueConstraint("user_id", "music_id", name="uq_favorite_music"),)

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    music_id = Column(String, ForeignKey("music.id", ondelete="CASCADE"), nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="favorite_music")
    music = relationship("Music", back_populates="favorited_by")
