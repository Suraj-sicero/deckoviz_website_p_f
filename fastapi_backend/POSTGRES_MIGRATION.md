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

## Private S3 media storage

Set `AWS_REGION`, `S3_MEDIA_BUCKET`, and optionally `S3_MEDIA_PREFIX`. Do not set
AWS access keys in this repository: the Lightsail instance/deployment role must
grant the standard AWS SDK credential chain access to the configured bucket.

The role needs `s3:PutObject`, `s3:GetObject`, and `s3:DeleteObject` limited to
`arn:aws:s3:::S3_MEDIA_BUCKET/S3_MEDIA_PREFIX/*`, plus `s3:ListBucket` only if
operational tooling requires it. Keep Block Public Access enabled. The API returns
short-lived presigned download URLs; no object ACL is made public.

Apply the media schema with `python -m alembic upgrade head`. The `media_objects`
table records ownership, S3 object key/bucket, MIME type, byte size, SHA-256,
filename, and timestamps; it never stores file bytes.
