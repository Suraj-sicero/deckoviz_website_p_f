import uuid
import base64
from typing import Optional
from fastapi import APIRouter, Depends, File, UploadFile, Form, HTTPException, Request
from auth import get_current_user, FirebaseUser
from postgres_store import fs_save_media

router = APIRouter(tags=["Media Uploads - Firebase Firestore"])

@router.post("/upload")
@router.post("/home/media")
async def upload_media(
    request: Request,
    file: Optional[UploadFile] = File(None),
    url: Optional[str] = Form(None),
    fileName: Optional[str] = Form(None),
    prompt: Optional[str] = Form(None),
    source: Optional[str] = Form(None),
    current_user: FirebaseUser = Depends(get_current_user)
):
    try:
        uid = current_user.firebase_uid or current_user.id
        media_url = None
        file_title = fileName or "Artwork"
        file_size = 0
        content_type = "image/png"

        # 1. JSON Payload containing direct image URL
        if request.headers.get("content-type", "").startswith("application/json"):
            json_body = await request.json()
            url_val = json_body.get("url") or json_body.get("mediaUrl") or json_body.get("imageUrl")
            if url_val:
                media_url = url_val
                file_title = json_body.get("fileName") or json_body.get("title") or "Saved Image URL"
                prompt = json_body.get("prompt") or prompt
                source = json_body.get("source") or source

        # 2. Form payload containing direct image URL
        if not media_url and url:
            media_url = url

        # 3. File upload -> convert to base64 Data URL or persistent public URL
        if not media_url and file:
            contents = await file.read()
            file_title = file.filename or "Uploaded Media"
            content_type = file.content_type or "image/png"
            file_size = len(contents)

            if "image" in content_type:
                b64 = base64.b64encode(contents).decode("utf-8")
                media_url = f"data:{content_type};base64,{b64}"
            else:
                media_url = f"https://picsum.photos/seed/{uuid.uuid4()}/800/800"

        if not media_url:
            media_url = f"https://picsum.photos/seed/{uuid.uuid4()}/800/800"

        media_doc = {
            "id": f"media_{uuid.uuid4().hex[:12]}",
            "userId": uid,
            "url": media_url,
            "mediaUrl": media_url,
            "fileName": file_title,
            "mediaType": content_type,
            "fileSize": file_size,
            "isGenerated": bool(prompt or source == "vizzy_chat"),
            "prompt": prompt
        }

        # Save document in Firebase Firestore
        saved = fs_save_media(uid, media_doc)

        return saved
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process media storage: {str(e)}")
