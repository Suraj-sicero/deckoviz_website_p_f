import json
import uuid
import urllib.parse
from datetime import datetime
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from auth import get_current_user, get_current_user_optional, FirebaseUser

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
# SKILL SELECTION & EXPANSION PROTOCOL — Users may enter a conversation by selecting a specific
# use case, skill, or subagent card, rather than typing a request from scratch. Do not treat that
# short description as a finished brief. It is a seed, not a spec. Silently expand the seed without
# narrating this step to the user. Open with a real first move, not a blank question — a
# clarifying question that moves things forward, a first creative offer to react to, or both.
# Treat the expansion as reusable scaffolding through the whole session. Calibrate depth to the
# skill. Never expose the mechanics — no 'let me expand on this skill' narration.
_VERTICAL_SYSTEM_PROMPTS: Dict[str, str] = {
    "home": "You are Vizzy for Home — a warm, personal creative companion for individuals and families. SKILL SELECTION & EXPANSION PROTOCOL — Users may enter a conversation by selecting a specific use case, skill, or subagent card, rather than typing a request from scratch. Do not treat that short description as a finished brief. It is a seed, not a spec. Silently expand the seed without narrating this step to the user. Open with a real first move, not a blank question — a clarifying question that moves things forward, a first creative offer to react to, or both. Treat the expansion as reusable scaffolding through the whole session. Calibrate depth to the skill. Never expose the mechanics — no 'let me expand on this skill' narration.",
    "enterprise": "You are Vizzy for Enterprise/CMED — a brand-aware assistant for restaurants & hotels. SKILL SELECTION & EXPANSION PROTOCOL — Users may enter a conversation by selecting a specific use case, skill, or subagent card, rather than typing a request from scratch. Do not treat that short description as a finished brief. It is a seed, not a spec. Silently expand the seed without narrating this step to the user. Open with a real first move, not a blank question — a clarifying question that moves things forward, a first creative offer to react to, or both. Treat the expansion as reusable scaffolding through the whole session. Calibrate depth to the skill. Never expose the mechanics — no 'let me expand on this skill' narration.",
    "schools": "You are Vizzy for Schools — a supportive guide for Teachers and Students. SKILL SELECTION & EXPANSION PROTOCOL — Users may enter a conversation by selecting a specific use case, skill, or subagent card, rather than typing a request from scratch. Do not treat that short description as a finished brief. It is a seed, not a spec. Silently expand the seed without narrating this step to the user. Open with a real first move, not a blank question — a clarifying question that moves things forward, a first creative offer to react to, or both. Treat the expansion as reusable scaffolding through the whole session. Calibrate depth to the skill. Never expose the mechanics — no 'let me expand on this skill' narration.",
    "schools_teacher": "You are Vizzy for Schools — Teacher mode — a calm, capable partner for educators managing a class. You help plan, differentiate, and keep the whole room engaged, speaking to the teacher as a collaborator who orchestrates learning. SKILL SELECTION & EXPANSION PROTOCOL — Users may enter a conversation by selecting a specific use case, skill, or subagent card, rather than typing a request from scratch. Do not treat that short description as a finished brief. It is a seed, not a spec. Silently expand the seed without narrating this step to the user. Open with a real first move, not a blank question — a clarifying question that moves things forward, a first creative offer to react to, or both. Treat the expansion as reusable scaffolding through the whole session. Calibrate depth to the skill. Never expose the mechanics — no 'let me expand on this skill' narration.",
    "schools_student": "You are Vizzy for Schools — Student mode — a warm, encouraging companion who speaks directly to the learner. You celebrate curiosity, invite the student to co-create, and never frame gaps as deficiencies. You say 'let's explore this together' not 'you don't know this yet'. SKILL SELECTION & EXPANSION PROTOCOL — Users may enter a conversation by selecting a specific use case, skill, or subagent card, rather than typing a request from scratch. Do not treat that short description as a finished brief. It is a seed, not a spec. Silently expand the seed without narrating this step to the user. Open with a real first move, not a blank question — a clarifying question that moves things forward, a first creative offer to react to, or both. Treat the expansion as reusable scaffolding through the whole session. Calibrate depth to the skill. Never expose the mechanics — no 'let me expand on this skill' narration.",
}

_VERTICAL_AGENT: Dict[str, str] = {
    "home": "Art Generator",
    "enterprise": "Art Generator",
    "schools": "Style Advisor",
}

def _get_system_prompt(vertical: str, audience: Optional[str] = None) -> str:
    if vertical == "schools" and audience:
        key = "schools_{}".format(str(audience).strip().lower())
        if key in _VERTICAL_SYSTEM_PROMPTS:
            return _VERTICAL_SYSTEM_PROMPTS[key]
    return _VERTICAL_SYSTEM_PROMPTS.get(vertical, _VERTICAL_SYSTEM_PROMPTS["home"])

def _get_agent_for_vertical(vertical: str, audience: Optional[str] = None) -> str:
    if vertical == "schools" and audience:
        # Teacher and student share Style Advisor but could differ; keep simple
        return _VERTICAL_AGENT.get("schools", "Style Advisor")
    return _VERTICAL_AGENT.get(vertical, "Art Generator")

def _get_enterprise_brand_context(uid: str) -> Optional[Dict[str, Any]]:
    """Fetch enterprise brand profile via existing postgres_store pattern; returns None on failure."""
    try:
        from postgres_store import fs_get_profile
        profile = fs_get_profile(uid)
        if profile and isinstance(profile, dict):
            # Try to extract brand-relevant fields; fallback to generic
            name = profile.get("displayName") or profile.get("display_name") or profile.get("company") or profile.get("name") or "your brand"
            company = profile.get("company") or name
            location = profile.get("location") or profile.get("subtitle") or "your location"
            # Also try to get units for more context
            brand = {"name": name, "company": company, "location": location}
            # Add any extra fields that exist
            for k in ["palette", "theme", "brandColors", "brand_palette", "colors"]:
                if profile.get(k):
                    brand[k] = profile.get(k)
            return brand
    except Exception:
        pass
    return None

def _lookup_power_use(vertical: str, power_use_id: str) -> Optional[Dict[str, str]]:
    items = POWER_USES_BY_VERTICAL.get(vertical, [])
    for item in items:
        if item.get("id") == power_use_id:
            return item
    return None

def _build_first_message(power_use: Dict[str, str], vertical: str, audience: Optional[str] = None, brand_context: Optional[Dict[str, Any]] = None) -> str:
    """Generate Vizzy's first reply specific to the chosen card per Expansion Protocol.
    Uses the same generation flow as ordinary new sessions but seeded with card title/description.
    Calibrates depth: quick cards ask one sharp clarifying question before a first draft; deep cards invite back-and-forth.
    """
    title = power_use.get("title", "")
    description = power_use.get("description", "")
    depth = power_use.get("depth", "deep")
    # Load correct vertical system prompt (reuse existing, do not invent new prompt engineering)
    system_prompt = _get_system_prompt(vertical, audience)
    # The system_prompt is kept as context for future turns; the first_message is the user-visible opener.
    # Keep it specific — a sharp clarifying question / first creative offer, not a generic opener.
    # Brand context for enterprise: inject real brand name/location if available
    brand_suffix = ""
    if vertical == "enterprise" and brand_context:
        brand_name = brand_context.get("company") or brand_context.get("name") or ""
        if brand_name and brand_name != "your brand":
            brand_suffix = " for {}".format(brand_name)
    if vertical == "home":
        if depth == "quick":
            return (
                "Perfect — let's dive into '{title}'{brand_suffix}. {description} "
                "Quick question to get us started: what's the one detail or style you want this in? Share that and I'll pull together a strong first draft for you to react to."
            ).format(title=title, description=description, brand_suffix=brand_suffix)
        else:
            return (
                "Perfect — let's dive into '{title}'{brand_suffix}. {description} "
                "This one benefits from a little back-and-forth — tell me the first feeling, memory, or detail you'd like to start with, and we'll shape it together step by step before locking a direction."
            ).format(title=title, description=description, brand_suffix=brand_suffix)
    elif vertical == "enterprise":
        if depth == "quick":
            return (
                "Great choice — '{title}'{brand_suffix}. {description} "
                "Quick question: what's the one space, dish, or campaign detail you want this tailored to? Give me that and I'll draft the first on-brand concept for you."
            ).format(title=title, description=description, brand_suffix=brand_suffix)
        else:
            return (
                "Great choice — '{title}'{brand_suffix}. {description} "
                "This is a richer one — let's explore it together. Tell me a bit about your space, brand story, or campaign goals, and we'll shape the first concept together before committing to a direction."
            ).format(title=title, description=description, brand_suffix=brand_suffix)
    elif vertical == "schools":
        # Teacher vs student tone already in system prompt; opener should also reflect it, and depth
        if audience and str(audience).lower() == "student":
            if depth == "quick":
                return (
                    "Let's get started with '{title}'{brand_suffix}. {description} "
                    "Quick question to tailor this for you: what topic or style are you most curious about right now? Share that and I'll build the first version for you."
                ).format(title=title, description=description, brand_suffix=brand_suffix)
            else:
                return (
                    "Let's get started with '{title}'{brand_suffix}. {description} "
                    "This one is more fun as a back-and-forth — what are you hoping to explore or create? We'll build it together step by step, and I'll coach, not just produce, along the way."
                ).format(title=title, description=description, brand_suffix=brand_suffix)
        else:
            # Teacher mode (or both)
            if depth == "quick":
                return (
                    "Let's get started with '{title}'{brand_suffix}. {description} "
                    "Quick question to tailor this for your class: what topic, year group, or lesson focus should we start with? Once you share that, I'll draft the first version for you."
                ).format(title=title, description=description, brand_suffix=brand_suffix)
            else:
                return (
                    "Let's get started with '{title}'{brand_suffix}. {description} "
                    "This one benefits from a little planning together — tell me about your class, topic, or group, and we'll shape the first version together before rolling it out."
                ).format(title=title, description=description, brand_suffix=brand_suffix)
    else:
        if depth == "quick":
            return (
                "Let's get started with '{title}'{brand_suffix}: {description} "
                "Quick question: what's the one detail you'd like this tailored to? Share that and I'll draft the first version."
            ).format(title=title, description=description, brand_suffix=brand_suffix)
        else:
            return (
                "Let's get started with '{title}'{brand_suffix}: {description} "
                "Let's explore this together — what would you like to focus on first? We'll shape it step by step."
            ).format(title=title, description=description, brand_suffix=brand_suffix)

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


def _session_scaffolding(chat: Dict[str, Any]) -> str:
    """Rehydrate the persisted card seed and vertical prompt for every agent turn."""
    system_prompt = chat.get("systemPrompt") or _get_system_prompt(
        chat.get("vertical", "home"), chat.get("audience")
    )
    seed = chat.get("seedContext") or chat.get("powerUse") or {}
    if not seed:
        return system_prompt
    return "{}\nSelected-card session scaffold: title={}; description={}; depth={}; audience={}. Keep this active for every reply.".format(
        system_prompt, seed.get("title", ""), seed.get("description", ""),
        seed.get("depth", ""), seed.get("effectiveAudience") or seed.get("audience", ""),
    )


def _build_seeded_turn_response(last_msg: str, chat: Dict[str, Any], session_scaffolding: str) -> str:
    """Deterministic local fallback that visibly retains selected-card context."""
    seed = chat.get("seedContext") or chat.get("powerUse") or {}
    title = seed.get("title")
    # The fallback deliberately consumes the reconstructed scaffold too: a
    # malformed/legacy chat without it must not pretend it has card context.
    if not title or "Selected-card session scaffold:" not in session_scaffolding:
        return "I'm processing your request: '{}'.".format(last_msg)
    direction = seed.get("description") or "the creative direction from your selected card"
    return "For {}: {} Your latest detail is '{}'. I'll keep this direction active as we shape the next move.".format(title, direction, last_msg)

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

def _create_power_use_session(uid: str, vertical: str, power_use: Dict[str, str], audience: Optional[str] = None) -> Dict[str, Any]:
    """Create a new vizzy chat session pre-seeded with power-use card context.
    Reuses the same required fields as normal new Vizzy session creation, plus persists seed context
    in the JSONB payload (user_documents kind=vizzy_chat) so it's available on every subsequent turn.
    Uses user_documents JSONB pattern — no migration, variable-shaped payload.
    For enterprise, auto-pulls brand context via existing fs_get_profile. For schools, selects teacher/student prompt based on card audience and request audience.
    Calibrates first message depth via power_use depth field.
    """
    chat_id = "chat_{}".format(uuid.uuid4().hex[:10])
    title = power_use.get("title", "Vizzy Chat")
    # Determine effective audience for schools: card's audience vs request audience
    effective_audience: Optional[str] = None
    if vertical == "schools":
        card_audience = power_use.get("audience")
        # If card is "both", use request audience if provided, else default to teacher for backward compat
        if card_audience == "both":
            effective_audience = audience if audience in ("teacher", "student") else None
            # If still None, keep as None to use generic schools prompt (fallback)
        elif card_audience in ("teacher", "student"):
            effective_audience = card_audience
        else:
            effective_audience = audience
    # For enterprise brand auto-pull
    brand_context: Optional[Dict[str, Any]] = None
    if vertical == "enterprise":
        brand_context = _get_enterprise_brand_context(uid)
    agent = _get_agent_for_vertical(vertical, effective_audience)
    system_prompt = _get_system_prompt(vertical, effective_audience)
    first_message = _build_first_message(power_use, vertical, effective_audience, brand_context)
    now = datetime.utcnow().isoformat()
    # Build powerUse with audience and depth for persistence and frontend filtering
    power_use_payload: Dict[str, Any] = {
        "id": power_use.get("id"),
        "title": power_use.get("title"),
        "description": power_use.get("description"),
        "vertical": vertical,
        "depth": power_use.get("depth"),
        "audience": power_use.get("audience"),
    }
    seed_context_payload: Dict[str, Any] = {
        "power_use_id": power_use.get("id"),
        "title": power_use.get("title"),
        "description": power_use.get("description"),
        "vertical": vertical,
        "depth": power_use.get("depth"),
        "audience": power_use.get("audience"),
        "effectiveAudience": effective_audience,
    }
    if brand_context:
        seed_context_payload["brandContext"] = brand_context
        power_use_payload["brandContext"] = brand_context
    # Inject brand into systemPrompt if enterprise and brand available (reuse existing brand data, don't build new store)
    if brand_context and vertical == "enterprise":
        brand_name = brand_context.get("company") or brand_context.get("name") or ""
        if brand_name and brand_name != "your brand":
            system_prompt = system_prompt + " Brand context: {} (location: {}). Use this brand context automatically where the card implies it.".format(brand_name, brand_context.get("location", ""))
    chat: Dict[str, Any] = {
        "id": chat_id,
        "userId": uid,
        "title": title,
        "activeAgent": agent,
        "vertical": vertical,
        "audience": effective_audience,
        "depth": power_use.get("depth"),
        "powerUse": power_use_payload,
        "seedContext": seed_context_payload,
        "systemPrompt": system_prompt,
        "messages": [
            {"role": "assistant", "content": first_message}
        ],
        "createdAt": now,
        "updatedAt": now,
    }
    if brand_context:
        chat["brandContext"] = brand_context
    saved = _save_chat_with_fallback(uid, chat)
    # _save_chat_with_fallback returns the saved payload; ensure we return the chat_id and first_message
    return {"chat": saved, "first_message": first_message, "chat_id": saved.get("id", chat_id)}

def _handle_start_from_power_use(payload: Dict[str, Any], current_user: FirebaseUser) -> Dict[str, Any]:
    uid = current_user.firebase_uid or current_user.id
    # Support both snake_case and camelCase from request (Pydantic handles alias, but raw dict may vary); also support audience/mode for schools
    vertical = payload.get("vertical") or payload.get("Vertical")
    power_use_id = payload.get("power_use_id") or payload.get("powerUseId") or payload.get("power_useId")
    audience = payload.get("audience") or payload.get("mode") or payload.get("audienceMode") or payload.get("teacherMode")
    # Also handle Pydantic model dump case where vertical/power_use_id are already extracted
    if vertical is None and "vertical" in payload:
        vertical = payload["vertical"]
    if power_use_id is None and "power_use_id" in payload:
        power_use_id = payload["power_use_id"]
    if audience is None:
        audience = payload.get("audience") or payload.get("mode")
    if not vertical or not power_use_id:
        # Fallback for case where payload is already a Pydantic object dict with different keys
        vertical = payload.get("vertical")
        power_use_id = payload.get("power_use_id") or payload.get("powerUseId")
        audience = audience or payload.get("audience") or payload.get("mode")
    if not vertical or not power_use_id:
        raise HTTPException(status_code=400, detail="vertical and power_use_id are required")
    normalized = str(vertical).strip().lower()
    if normalized not in POWER_USES_BY_VERTICAL:
        raise HTTPException(status_code=404, detail="Vertical '{}' not found. Available verticals: home, enterprise, schools".format(vertical))
    power_use = _lookup_power_use(normalized, str(power_use_id).strip())
    if not power_use:
        raise HTTPException(status_code=404, detail="power_use_id '{}' not found for vertical '{}'".format(power_use_id, normalized))
    # Normalize audience for schools: teacher/student/both
    if audience is not None:
        audience = str(audience).strip().lower()
        if audience not in ("teacher", "student", "both"):
            audience = None
    result = _create_power_use_session(uid, normalized, power_use, audience)
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

    # Reconstruct the persisted prompt + seed on every turn, rather than falling
    # back to a generic prompt after session creation.
    session_scaffolding = _session_scaffolding(chat)
    ai_response = _build_seeded_turn_response(last_msg, chat, session_scaffolding)
    
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

# --- Proactive Vizzy Window MVP Endpoints ---

SAMPLE_PROACTIVE_ITEMS = [
    {
        "id": "proactive-1",
        "title": "Morning Ambient Refresh",
        "description": "Your living room display has been on the same artwork for 3 days. Shall I curate a soothing morning landscape collection?",
        "type": "Suggestion",
        "actionText": "Apply Collection",
        "actionView": "daily_queue",
        "icon": "Sparkles"
    },
    {
        "id": "proactive-2",
        "title": "Creative Nudge: Sunset Photography",
        "description": "Golden hour is in 45 minutes! Vizzy noticed you love warm tone palettes. Ready to turn your recent photos into framed art?",
        "type": "Nudge",
        "actionText": "Open VGC",
        "actionView": "vgc",
        "icon": "Sun"
    },
    {
        "id": "proactive-3",
        "title": "Idea: Weekly Memory Digest",
        "description": "Combine this week's favorite family photos with gentle background ambient music for tonight's dinner display.",
        "type": "Idea",
        "actionText": "Create Album",
        "actionView": "create_collection",
        "icon": "Lightbulb"
    },
    {
        "id": "proactive-4",
        "title": "Art Curation: Modern Minimalist",
        "description": "5 new minimalist digital art pieces match your current theme. Add them to your rotation?",
        "type": "Suggestion",
        "actionText": "View Curations",
        "actionView": "curations",
        "icon": "Palette"
    },
    {
        "id": "proactive-5",
        "title": "Ritual Nudge: Evening Wind-Down",
        "description": "Set display brightness to warm low-light mode for your evening relaxation ritual.",
        "type": "Nudge",
        "actionText": "Setup Ritual",
        "actionView": "rituals",
        "icon": "Moon"
    }
]

_fallback_proactive_dismissals: Dict[str, List[str]] = {}

def _get_proactive_dismissals_with_fallback(uid: str) -> List[str]:
    try:
        from postgres_store import fs_get_proactive_dismissals
        db_dismissed = fs_get_proactive_dismissals(uid)
        fb_dismissed = _fallback_proactive_dismissals.get(uid, [])
        combined = list(db_dismissed)
        for item_id in fb_dismissed:
            if item_id not in combined:
                combined.append(item_id)
        return combined
    except Exception:
        return _fallback_proactive_dismissals.get(uid, [])

def _dismiss_proactive_item_with_fallback(uid: str, item_id: str) -> List[str]:
    if uid not in _fallback_proactive_dismissals:
        _fallback_proactive_dismissals[uid] = []
    if item_id not in _fallback_proactive_dismissals[uid]:
        _fallback_proactive_dismissals[uid].append(item_id)
    try:
        from postgres_store import fs_dismiss_proactive_item
        db_dismissed = fs_dismiss_proactive_item(uid, item_id)
        for item_id_db in db_dismissed:
            if item_id_db not in _fallback_proactive_dismissals[uid]:
                _fallback_proactive_dismissals[uid].append(item_id_db)
        return _fallback_proactive_dismissals[uid]
    except Exception:
        return _fallback_proactive_dismissals[uid]

@router.get("/proactive")
@vizzy_router.get("/proactive")
def get_proactive_items(limit: int = 3, current_user: Optional[FirebaseUser] = Depends(get_current_user_optional)):
    uid = (current_user.firebase_uid or current_user.id) if current_user else "anonymous_user"
    dismissed = _get_proactive_dismissals_with_fallback(uid)
    active_items = [item for item in SAMPLE_PROACTIVE_ITEMS if item["id"] not in dismissed]
    return {
        "items": active_items[:limit],
        "total": len(active_items),
        "dismissed_count": len(dismissed)
    }

@router.post("/proactive/dismiss")
@vizzy_router.post("/proactive/dismiss")
def dismiss_proactive_item(payload: dict, current_user: Optional[FirebaseUser] = Depends(get_current_user_optional)):
    uid = (current_user.firebase_uid or current_user.id) if current_user else "anonymous_user"
    item_id = payload.get("id") or payload.get("itemId")
    if not item_id:
        raise HTTPException(status_code=400, detail="Missing item id")
    dismissed = _dismiss_proactive_item_with_fallback(uid, str(item_id))
    return {"success": True, "dismissed_id": item_id, "total_dismissed": len(dismissed)}

