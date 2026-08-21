import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Boolean, Text, DateTime, ForeignKey, JSON
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
    tags = Column(JSON, default=list)
    display_minutes = Column(Integer, default=0)
    display_hours = Column(Integer, default=0)
    is_system = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="collections")
    items = relationship("CollectionItem", back_populates="collection", cascade="all, delete-orphan")

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
