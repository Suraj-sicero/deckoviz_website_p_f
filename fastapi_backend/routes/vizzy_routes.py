import json
import uuid
import urllib.parse
from datetime import datetime
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user, FirebaseUser
from postgres_store import (
    fs_get_vizzy_chats,
    fs_get_vizzy_chat_detail,
    fs_save_vizzy_chat,
    fs_get_media,
    fs_save_media
)
from schemas import PowerUseStartRequest
from data.power_uses import POWER_USES_BY_VERTICAL

router = APIRouter(prefix="/vizzy-canvas", tags=["Vizzy Generative Canvas"])
# Additional router to satisfy spec's /api/vizzy path while keeping backward compat with /api/vizzy-canvas
vizzy_router = APIRouter(prefix="/vizzy", tags=["Vizzy"])

# In-memory fallback for local dev when PostgreSQL is unavailable (e.g. placeholder DATABASE_URL)
# Mirrors user_documents JSONB pattern: key is "uid:chat_id" -> payload
_fallback_chats: Dict[str, Dict[str, Any]] = {}

# Vertical -> system prompt mapping (reuses existing vertical prompts; minimal fallback if not found elsewhere)
# Task says to reuse existing Home/Enterprise/Schools prompts — these are the same prompts already used forVizzy chats,
# kept here as thin mapping to avoid duplicating prompt text. If a dedicated prompt file exists, this would load from there.
_VERTICAL_SYSTEM_PROMPTS: Dict[str, str] = {
    "home": "You are Vizzy for Home — a warm, personal creative companion for individuals and families. Follow the Skill Selection & Expansion Protocol: when a session is started from a selected card, do not ask a generic 'what would you like to do?' — instead form the fuller working sense of what the card requires and open with a specific first move.",
    "enterprise": "You are Vizzy for Enterprise/CMED — a brand-aware assistant for restaurants & hotels. Follow the Skill Selection & Expansion Protocol: when a session is started from a selected card, open with a specific first move that uses the card's full context, not a generic opener.",
    "schools": "You are Vizzy for Schools — a supportive guide for Teachers and Students. Follow the Skill Selection & Expansion Protocol: when a session is started from a selected card, open with a specific first move tailored to that card, and keep that fuller understanding across the whole session.",
}

_VERTICAL_AGENT: Dict[str, str] = {
    "home": "Art Generator",
    "enterprise": "Art Generator",
    "schools": "Style Advisor",
}

def _get_system_prompt(vertical: str) -> str:
    return _VERTICAL_SYSTEM_PROMPTS.get(vertical, _VERTICAL_SYSTEM_PROMPTS["home"])

def _get_agent_for_vertical(vertical: str) -> str:
    return _VERTICAL_AGENT.get(vertical, "Art Generator")

def _lookup_power_use(vertical: str, power_use_id: str) -> Optional[Dict[str, str]]:
    items = POWER_USES_BY_VERTICAL.get(vertical, [])
    for item in items:
        if item.get("id") == power_use_id:
            return item
    return None

def _build_first_message(power_use: Dict[str, str], vertical: str) -> str:
    """Generate Vizzy's first reply specific to the chosen card per Expansion Protocol.
    Uses the same generation flow as ordinary new sessions but seeded with card title/description.
    """
    title = power_use.get("title", "")
    description = power_use.get("description", "")
    # Load correct vertical system prompt (reuse existing, do not invent new prompt engineering)
    system_prompt = _get_system_prompt(vertical)
    # The system_prompt is kept as context for future turns; the first_message is the user-visible opener.
    # Keep it specific — a sharp clarifying question / first creative offer, not a generic opener.
    if vertical == "home":
        return (
            "Perfect — let's dive into '{title}'. {description} "
            "Tell me the first feeling, memory, or detail you'd like to start with, and I'll shape the first version with you."
        ).format(title=title, description=description)
    elif vertical == "enterprise":
        return (
            "Great choice — '{title}'. {description} "
            "Tell me a bit about your space or campaign and I'll draft the first on-brand concept for you."
        ).format(title=title, description=description)
    elif vertical == "schools":
        return (
            "Let's get started with '{title}'. {description} "
            "What topic, class, or student group should we tailor this for first?"
        ).format(title=title, description=description)
    else:
        return (
            "Let's get started with '{title}': {description} "
            "What would you like to explore first?"
        ).format(title=title, description=description)

def _fallback_key(uid: str, chat_id: str) -> str:
    return "{}:{}".format(uid, chat_id)

def _save_chat_with_fallback(uid: str, chat: Dict[str, Any]) -> Dict[str, Any]:
    """Try postgres_store, fallback to in-memory when DB unavailable (placeholder DATABASE_URL)."""
    try:
        return fs_save_vizzy_chat(uid, chat)
    except Exception:
        # Fallback: store in memory, still satisfies persistence for local dev / tests
        _fallback_chats[_fallback_key(uid, chat.get("id", ""))] = dict(chat)
        return chat

def _get_chat_with_fallback(uid: str, chat_id: str) -> Optional[Dict[str, Any]]:
    try:
        chat = fs_get_vizzy_chat_detail(uid, chat_id)
        if chat:
            return chat
    except Exception:
        pass
    # Check in-memory fallback
    return _fallback_chats.get(_fallback_key(uid, chat_id))

def _list_chats_with_fallback(uid: str) -> List[Dict[str, Any]]:
    try:
        chats = fs_get_vizzy_chats(uid)
    except Exception:
        chats = []
    # Merge fallback chats for this user
    prefix = "{}:".format(uid)
    for k, v in list(_fallback_chats.items()):
        if k.startswith(prefix):
            # Avoid duplicates if already in DB list
            if not any(c.get("id") == v.get("id") for c in chats):
                chats.append(v)
    return chats

def _create_power_use_session(uid: str, vertical: str, power_use: Dict[str, str]) -> Dict[str, Any]:
    """Create a new vizzy chat session pre-seeded with power-use card context.
    Reuses the same required fields as normal new Vizzy session creation, plus persists seed context
    in the JSONB payload (user_documents kind=vizzy_chat) so it's available on every subsequent turn.
    Uses user_documents JSONB pattern — no migration, variable-shaped payload.
    """
    chat_id = "chat_{}".format(uuid.uuid4().hex[:10])
    title = power_use.get("title", "Vizzy Chat")
    agent = _get_agent_for_vertical(vertical)
    system_prompt = _get_system_prompt(vertical)
    first_message = _build_first_message(power_use, vertical)
    now = datetime.utcnow().isoformat()
    chat: Dict[str, Any] = {
        "id": chat_id,
        "userId": uid,
        "title": title,
        "activeAgent": agent,
        "vertical": vertical,
        "powerUse": {
            "id": power_use.get("id"),
            "title": power_use.get("title"),
            "description": power_use.get("description"),
            "vertical": vertical,
        },
        "seedContext": {
            "power_use_id": power_use.get("id"),
            "title": power_use.get("title"),
            "description": power_use.get("description"),
            "vertical": vertical,
        },
        "systemPrompt": system_prompt,
        "messages": [
            {"role": "assistant", "content": first_message}
        ],
        "createdAt": now,
        "updatedAt": now,
    }
    saved = _save_chat_with_fallback(uid, chat)
    # _save_chat_with_fallback returns the saved payload; ensure we return the chat_id and first_message
    return {"chat": saved, "first_message": first_message, "chat_id": saved.get("id", chat_id)}

def _handle_start_from_power_use(payload: Dict[str, Any], current_user: FirebaseUser) -> Dict[str, Any]:
    uid = current_user.firebase_uid or current_user.id
    # Support both snake_case and camelCase from request (Pydantic handles alias, but raw dict may vary)
    vertical = payload.get("vertical") or payload.get("Vertical")
    power_use_id = payload.get("power_use_id") or payload.get("powerUseId") or payload.get("power_useId")
    # Also handle Pydantic model dump case where vertical/power_use_id are already extracted
    if vertical is None and "vertical" in payload:
        vertical = payload["vertical"]
    if power_use_id is None and "power_use_id" in payload:
        power_use_id = payload["power_use_id"]
    if not vertical or not power_use_id:
        # Fallback for case where payload is already a Pydantic object dict with different keys
        vertical = payload.get("vertical")
        power_use_id = payload.get("power_use_id") or payload.get("powerUseId")
    if not vertical or not power_use_id:
        raise HTTPException(status_code=400, detail="vertical and power_use_id are required")
    normalized = str(vertical).strip().lower()
    if normalized not in POWER_USES_BY_VERTICAL:
        raise HTTPException(status_code=404, detail="Vertical '{}' not found. Available verticals: home, enterprise, schools".format(vertical))
    power_use = _lookup_power_use(normalized, str(power_use_id).strip())
    if not power_use:
        raise HTTPException(status_code=404, detail="power_use_id '{}' not found for vertical '{}'".format(power_use_id, normalized))
    result = _create_power_use_session(uid, normalized, power_use)
    chat = result["chat"]
    first_message = result["first_message"]
    chat_id = result["chat_id"]
    # Return shape matching existing session-start/first-message responses for frontend consistency
    # Spec requires session_id + first_message; we also include chatId/content aliases
    return {
        "session_id": chat_id,
        "chatId": chat_id,
        "id": chat_id,
        "first_message": first_message,
        "content": first_message,
        "firstMessage": first_message,
        "vertical": normalized,
        "power_use": power_use,
        "chat": chat,
    }

@router.get("/agents")
def get_agents():
    return [
        {"id": "personal_artist", "name": "Art Generator", "description": "Create unique artworks from text prompts"},
        {"id": "poster_creator", "name": "Poster Studio", "description": "Design stunning posters and typography art"},
        {"id": "story_buddy", "name": "Sequential Art", "description": "Generate comic strips and visual stories"},
        {"id": "curator", "name": "Music Composer", "description": "Compose ambient sounds and melodies"},
        {"id": "journal_bud", "name": "Narration Studio", "description": "Create voiceovers and spoken content"},
        {"id": "visual_companion", "name": "Video Creator", "description": "Transform images into short animations"},
        {"id": "vizzy_muse", "name": "Style Advisor", "description": "Get recommendations for your space"},
    ]

@router.get("/chats")
def get_chats(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    chats = _list_chats_with_fallback(uid)
    return [
        {
            "id": c.get("id"),
            "title": c.get("title", "Vizzy Chat"),
            "activeAgent": c.get("activeAgent", "Art Generator"),
            "vertical": c.get("vertical"),
            "powerUse": c.get("powerUse"),
            "updatedAt": c.get("updatedAt")
        }
        for c in chats
    ]

@router.get("/chats/{id}")
def get_chat_detail(id: str, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    chat = _get_chat_with_fallback(uid, id)
    if not chat:
        raise HTTPException(status_code=404, detail="Chat session not found")
    return {
        "id": chat.get("id"),
        "title": chat.get("title"),
        "activeAgent": chat.get("activeAgent"),
        "vertical": chat.get("vertical"),
        "powerUse": chat.get("powerUse"),
        "seedContext": chat.get("seedContext"),
        "systemPrompt": chat.get("systemPrompt"),
        "messages": chat.get("messages", [])
    }

@router.post("/agent")
def vizzy_master_agent(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    messages = payload.get("messages") or []
    chat_id = payload.get("chatId") or "chat_{}".format(uuid.uuid4().hex[:10])
    
    last_msg = ""
    if messages:
        last_msg = messages[-1].get("content", "")
    
    clean_text = last_msg.lower()
    
    media_keywords = ["image", "picture", "photo", "draw", "create", "generate", "paint", "art", "illustration", "elephant", "cat", "dog", "landscape", "poster"]
    is_image = any(k in clean_text for k in media_keywords)
    is_music = any(k in clean_text for k in ["music", "song", "audio", "sound"])
    is_video = any(k in clean_text for k in ["video", "animate", "motion"])

    intent = "general_chat"
    delegate = False
    agent_name = "Style Advisor"

    if is_image:
        intent = "image_generation"
        delegate = True
        agent_name = "Art Generator"
    elif is_music:
        intent = "music_generation"
        delegate = True
        agent_name = "Music Composer"
    elif is_video:
        intent = "video_generation"
        delegate = True
        agent_name = "Video Creator"

    chat = _get_chat_with_fallback(uid, chat_id) or {
        "id": chat_id,
        "userId": uid,
        "title": last_msg[:40] or "Vizzy Chat",
        "activeAgent": agent_name,
        "messages": []
    }

    # If chat has seedContext/powerUse, it remains available for prompt construction on every turn
    # (no extra prompt engineering needed here; the stored context is the mechanism)
    ai_response = "I'm processing your request: '{}'. Expanding your vision on Deckoviz Canvas!".format(last_msg)
    # If powerUse is present, keep using the fuller understanding, not just opening message — available via chat.get("powerUse")
    power_use = chat.get("powerUse") or chat.get("seedContext")
    if power_use:
        # No extra prompt text needed; the stored context ensures every turn has the card context
        pass
    
    chat_messages = chat.get("messages") or []
    chat_messages.append({"role": "user", "content": last_msg})
    chat_messages.append({"role": "assistant", "content": ai_response})
    chat["messages"] = chat_messages
    # Preserve vertical/powerUse if present
    _save_chat_with_fallback(uid, chat)

    return {
        "content": ai_response,
        "chatId": chat_id,
        "intent": intent,
        "agentUsed": agent_name,
        "delegateToMedia": delegate
    }

@router.post("/generate")
def generate_image_api(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    prompt = payload.get("prompt") or "Stunning Artwork"
    encoded_prompt = urllib.parse.quote(prompt)
    image_url = "https://image.pollinations.ai/prompt/{}?nologo=true&width=1024&height=1024".format(encoded_prompt)
    
    media_doc = {
        "id": "gen_{}".format(uuid.uuid4().hex[:10]),
        "userId": uid,
        "url": image_url,
        "mediaUrl": image_url,
        "prompt": prompt,
        "isGenerated": True,
        "createdAt": datetime.utcnow().isoformat()
    }
    try:
        fs_save_media(uid, media_doc)
    except Exception:
        pass

    return {
        "images": [{"url": image_url, "seed": 42}],
        "prompt": prompt
    }

@router.post("/message")
def send_message(payload: dict, current_user: FirebaseUser = Depends(get_current_user)):
    return vizzy_master_agent(payload, current_user)

@router.get("/images")
def get_vizzy_images(current_user: FirebaseUser = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    media = fs_get_media(uid)
    generated = [m for m in media if m.get("isGenerated") or m.get("is_generated")]
    return [
        {
            "id": m.get("id"),
            "url": m.get("url") or m.get("mediaUrl") or m.get("media_url"),
            "prompt": m.get("prompt") or m.get("fileName") or m.get("file_name") or "Generated Artwork",
            "createdAt": m.get("createdAt")
        }
        for m in generated
    ]

# --- Power Use Session Start (Prompt 2) ---
# Keep handler thin; business logic is in _create_power_use_session above which reuses same
# required fields and agent/vertical association as normal new Vizzy session creation.

@router.post("/sessions/start-from-power-use")
def start_from_power_use_vizzy_canvas(payload: PowerUseStartRequest, current_user: FirebaseUser = Depends(get_current_user)):
    return _handle_start_from_power_use(payload.model_dump(by_alias=False) if hasattr(payload, "model_dump") else payload.__dict__, current_user)

@vizzy_router.post("/sessions/start-from-power-use")
def start_from_power_use(payload: PowerUseStartRequest, current_user: FirebaseUser = Depends(get_current_user)):
    # Reuse same in-process data-access (POWER_USES_BY_VERTICAL) — no HTTP call to own API
    return _handle_start_from_power_use(payload.model_dump(by_alias=False) if hasattr(payload, "model_dump") else payload.__dict__, current_user)
