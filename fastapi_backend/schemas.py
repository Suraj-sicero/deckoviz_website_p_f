from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Any
from datetime import datetime
import re

# --- Auth & User Schemas ---
class UserBase(BaseModel):
    email: str
    name: Optional[str] = None
    display_name: Optional[str] = None

class UserCreate(UserBase):
    password: Optional[str] = None
    firebase_uid: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: Optional[str] = None
    id_token: Optional[str] = None

class UserResponse(UserBase):
    id: str
    firebase_uid: Optional[str] = None
    avatar: Optional[str] = None
    banner: Optional[str] = None
    role: str = "user"
    created_at: datetime

    class Config:
        from_attributes = True

# --- Profile Schemas ---
class ProfileBase(BaseModel):
    display_name: Optional[str] = None
    username: Optional[str] = None
    title: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    avatar: Optional[str] = None
    banner: Optional[str] = None
    favorite_art_styles: Optional[List[str]] = Field(default=[], alias="favoriteArtStyles")

class ProfileUpdate(ProfileBase):
    pass

class ProfileResponse(ProfileBase):
    id: str
    user_id: str
    follower_count: int = Field(default=0, alias="followerCount")
    following_count: int = Field(default=0, alias="followingCount")
    post_count: int = Field(default=0, alias="postCount")

    class Config:
        from_attributes = True
        populate_by_name = True

# --- Collection Item Schemas ---
class CollectionItemBase(BaseModel):
    item_type: Optional[str] = Field(default="image", alias="itemType")
    item_id: Optional[str] = Field(default=None, alias="itemId")
    url: Optional[str] = None
    media_url: Optional[str] = Field(default=None, alias="mediaUrl")
    title: Optional[str] = None
    display_hours: Optional[str] = Field(default=None, alias="displayHours")
    display_seconds: Optional[str] = Field(default=None, alias="displaySeconds")
    meta_notes: Optional[str] = Field(default=None, alias="metaNotes")

class CollectionItemCreate(CollectionItemBase):
    pass

class CollectionItemResponse(CollectionItemBase):
    id: str
    collection_id: str
    created_at: datetime

    class Config:
        from_attributes = True
        populate_by_name = True

# --- Collection Schemas ---
class CollectionBase(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = ""
    music_url: Optional[str] = Field(default=None, alias="musicUrl")
    tags: Optional[List[str]] = []
    display_minutes: Optional[int] = Field(default=0, alias="displayMinutes")
    display_hours: Optional[int] = Field(default=0, alias="displayHours")

class CollectionCreate(CollectionBase):
    items: Optional[List[CollectionItemCreate]] = []
    images: Optional[List[CollectionItemCreate]] = []
    item_ids: Optional[List[str]] = Field(default=None, alias="itemIds")

class CollectionResponse(CollectionBase):
    id: str
    user_id: str
    item_count: int = Field(default=0, alias="itemCount")
    items: List[CollectionItemResponse] = []
    created_at: datetime

    class Config:
        from_attributes = True
        populate_by_name = True

# --- Media Schemas ---
class MediaCreate(BaseModel):
    url: Optional[str] = None
    media_url: str = Field(alias="mediaUrl")
    file_name: Optional[str] = Field(default="Artwork", alias="fileName")
    media_type: Optional[str] = Field(default="image/png", alias="mediaType")
    file_size: Optional[int] = Field(default=0, alias="fileSize")
    is_generated: Optional[bool] = Field(default=False, alias="isGenerated")
    prompt: Optional[str] = None

class MediaResponse(BaseModel):
    id: str
    user_id: str
    url: Optional[str] = None
    media_url: str = Field(alias="mediaUrl")
    file_name: Optional[str] = Field(alias="fileName")
    media_type: Optional[str] = Field(alias="mediaType")
    file_size: Optional[int] = Field(alias="fileSize")
    is_generated: bool = Field(alias="isGenerated")
    prompt: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
        populate_by_name = True

# --- Daily Queue Schemas ---
class DailyQueueSlotCreate(BaseModel):
    collection_id: Optional[str] = Field(default=None, alias="collectionId")
    collection_name: Optional[str] = Field(default=None, alias="collectionName")
    title: Optional[str] = None
    start_time: Optional[str] = Field(default=None, alias="startTime")
    end_time: Optional[str] = Field(default=None, alias="endTime")
    day_of_week: Optional[int] = Field(default=0, alias="dayOfWeek")
    active: Optional[bool] = True

class DailyQueueSlotResponse(DailyQueueSlotCreate):
    id: str
    user_id: str
    created_at: datetime

    class Config:
        from_attributes = True
        populate_by_name = True

# --- Prompt Library Schemas ---
class PromptTemplate(BaseModel):
    id: str
    vertical: str
    category: str
    title: str
    prompt_text: str
    placeholders: List[str] = []

def extract_placeholders(text: str) -> List[str]:
    """Helper to extract [placeholders] from a prompt template string."""
    return re.findall(r'\[(.*?)\]', text)

# --- Power Uses Schemas (10 Power Uses per vertical) ---
class PowerUseItem(BaseModel):
    id: str
    title: str
    description: str

class PowerUseListResponse(BaseModel):
    vertical: str
    items: List[PowerUseItem]

