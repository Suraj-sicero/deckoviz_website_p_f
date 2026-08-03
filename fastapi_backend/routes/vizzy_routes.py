import json
import uuid
import urllib.parse
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from models import User
from auth import get_current_user
from firebase_config import (
    fs_get_vizzy_chats,
    fs_get_vizzy_chat_detail,
    fs_save_vizzy_chat,
    fs_get_media,
    fs_save_media
)

router = APIRouter(prefix="/vizzy-canvas", tags=["Vizzy Generative Canvas"])

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
def get_chats(current_user: User = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    chats = fs_get_vizzy_chats(uid)
    return [
        {
            "id": c.get("id"),
            "title": c.get("title", "Vizzy Chat"),
            "activeAgent": c.get("activeAgent", "Art Generator"),
            "updatedAt": c.get("updatedAt")
        }
        for c in chats
    ]

@router.get("/chats/{id}")
def get_chat_detail(id: str, current_user: User = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    chat = fs_get_vizzy_chat_detail(uid, id)
    if not chat:
        raise HTTPException(status_code=404, detail="Chat session not found")
    return {
        "id": chat.get("id"),
        "title": chat.get("title"),
        "activeAgent": chat.get("activeAgent"),
        "messages": chat.get("messages", [])
    }

@router.post("/agent")
def vizzy_master_agent(payload: dict, current_user: User = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    messages = payload.get("messages") or []
    chat_id = payload.get("chatId") or f"chat_{uuid.uuid4().hex[:10]}"
    
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

    chat = fs_get_vizzy_chat_detail(uid, chat_id) or {
        "id": chat_id,
        "userId": uid,
        "title": last_msg[:40] or "Vizzy Chat",
        "activeAgent": agent_name,
        "messages": []
    }

    ai_response = f"I'm processing your request: '{last_msg}'. Expanding your vision on Deckoviz Canvas!"
    
    chat_messages = chat.get("messages") or []
    chat_messages.append({"role": "user", "content": last_msg})
    chat_messages.append({"role": "assistant", "content": ai_response})
    chat["messages"] = chat_messages
    fs_save_vizzy_chat(uid, chat)

    return {
        "content": ai_response,
        "chatId": chat_id,
        "intent": intent,
        "agentUsed": agent_name,
        "delegateToMedia": delegate
    }

@router.post("/generate")
def generate_image_api(payload: dict, current_user: User = Depends(get_current_user)):
    uid = current_user.firebase_uid or current_user.id
    prompt = payload.get("prompt") or "Stunning Artwork"
    encoded_prompt = urllib.parse.quote(prompt)
    image_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?nologo=true&width=1024&height=1024"
    
    media_doc = {
        "id": f"gen_{uuid.uuid4().hex[:10]}",
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
def send_message(payload: dict, current_user: User = Depends(get_current_user)):
    return vizzy_master_agent(payload, current_user)

@router.get("/images")
def get_vizzy_images(current_user: User = Depends(get_current_user)):
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
