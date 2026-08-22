# PostgreSQL / RDS deployment

1. Set `DATABASE_URL` and `DATABASE_CONNECT_ON_STARTUP` in the FastAPI deployment environment. The backend deliberately does not fall back to SQLite or a local PostgreSQL instance.
2. Install dependencies: `python -m pip install -r requirements.txt`.
3. Apply schema: `python -m alembic upgrade head`.
4. Run `uvicorn main:app --host 0.0.0.0 --port 8000` and check `GET /api/health`.

Firebase Auth remains the identity provider. Firestore persistence has been replaced
for the registered FastAPI resource routes by `postgres_store.py`. Existing Firestore
collections can be imported safely by reading each ownership-scoped document and
upserting its original id and payload into `user_documents`; do this as a separate,
reviewed operation after the RDS schema is live. No destructive migration is run.
