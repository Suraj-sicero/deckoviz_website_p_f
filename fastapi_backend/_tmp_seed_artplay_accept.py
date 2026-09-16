import asyncio
import json
import urllib.request
from datetime import datetime

from database import AsyncSessionLocal
from models import User, MediaObject
from sqlalchemy import select, text
from auth import create_access_token

UID = "uid_kartvayaraikwar_gmail_com"
TOKEN = create_access_token({"uid": UID, "sub": UID})


async def seed():
    async with AsyncSessionLocal() as session:
        u = await session.get(User, UID)
        if not u:
            session.add(
                User(
                    id=UID,
                    email="kartvayaraikwar@gmail.com",
                    display_name="Kartvaya",
                    created_at=datetime.utcnow(),
                )
            )
            await session.commit()
            print("created user")
        else:
            print("user exists", u.email)

        n = await session.execute(text("select count(*) from art_play_queue"))
        print("art_play_queue ok", n.scalar())

        rows = (
            await session.execute(select(MediaObject).where(MediaObject.user_id == UID).limit(5))
        ).scalars().all()
        print("media sample", len(rows))
        if len(rows) < 2:
            for i, url in enumerate(
                [
                    "https://picsum.photos/seed/artplay1/800/1000",
                    "https://picsum.photos/seed/artplay2/800/1000",
                ]
            ):
                mid = f"artplay_media_{i + 1}"
                existing = await session.get(MediaObject, mid)
                if not existing:
                    session.add(
                        MediaObject(
                            id=mid,
                            user_id=UID,
                            mime_type="image/jpeg",
                            size_bytes=12345,
                            filename=f"Art Play Test {i + 1}.jpg",
                            external_url=url,
                            created_at=datetime.utcnow(),
                        )
                    )
            await session.commit()
            print("seeded media")
        else:
            for r in rows[:2]:
                print(r.id, r.external_url, r.filename)


def http_json(method: str, url: str, body=None):
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, resp.read().decode()
    except Exception as e:
        if hasattr(e, "read"):
            return getattr(e, "code", 0), e.read().decode(errors="replace")
        return 0, str(e)


async def main():
    await seed()
    print("TOKEN", TOKEN)
    print("GET", http_json("GET", "http://127.0.0.1:8000/api/artplay/accept-test-instance"))
    print(
        "POST1",
        http_json(
            "POST",
            "http://127.0.0.1:8000/api/artplay/accept-test-instance/send",
            {
                "artwork_id": "artplay_media_1",
                "url": "https://picsum.photos/seed/artplay1/800/1000",
                "title": "Art Play Test 1",
            },
        ),
    )


if __name__ == "__main__":
    asyncio.run(main())
