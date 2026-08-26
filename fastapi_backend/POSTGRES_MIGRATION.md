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

Set `AWS_REGION`, `S3_MEDIA_BUCKET`, and optionally `S3_MEDIA_PREFIX`. Do not commit
AWS access keys to this repository. For local development you may export
`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in your shell or `.env` file.
On AWS Lightsail, attach an instance IAM role instead of setting keys.

The role needs `s3:PutObject`, `s3:GetObject`, and `s3:DeleteObject` limited to
`arn:aws:s3:::S3_MEDIA_BUCKET/S3_MEDIA_PREFIX*`, plus `s3:ListBucket` only if
operational tooling requires it. Keep Block Public Access enabled. The API returns
short-lived presigned download URLs; no object ACL is made public.

Apply the media schema with `python -m alembic upgrade head`. The `media_objects`
table records ownership, S3 object key/bucket, MIME type, byte size, SHA-256,
filename, and timestamps; it never stores file bytes.

### Upload flow

1. Frontend sends `multipart/form-data` with a `file` field to `POST /api/upload` (or `POST /api/home/media`) with a Firebase Bearer token.
2. FastAPI verifies the token and resolves the Firebase UID to `users.id` in PostgreSQL.
3. The file is validated (MIME allowlist, max size, sanitized filename) and streamed to private S3 under `media/<hashed-user-id>/<uuid>.<ext>`.
4. Metadata is written to `media_objects`; the response includes presigned `url` / `mediaUrl` aliases.

### Retrieval flow

`GET /api/home/media` and `GET /api/enterprise/media` list the caller's `media_objects` rows and attach fresh presigned GET URLs (default 1 hour). External URL registrations skip S3 and return the stored URL directly.

### Delete flow

`DELETE /api/home/media/{id}` and `DELETE /api/enterprise/media/{id}` verify ownership, delete the S3 object when `object_key` is set, then remove the PostgreSQL row.

## AWS Lightsail deployment

1. **RDS PostgreSQL** — Create a Lightsail managed database (or use existing RDS). Note the endpoint, database name, user, and password. Set:
   ```
   DATABASE_URL=postgresql+asyncpg://USER:PASSWORD@ENDPOINT:5432/DBNAME
   DATABASE_CONNECT_ON_STARTUP=true
   ```

2. **S3 bucket** — Create a private bucket in `eu-west-2`. Enable Block Public Access on all four settings. Set:
   ```
   AWS_REGION=eu-west-2
   S3_MEDIA_BUCKET=your-bucket-name
   S3_MEDIA_PREFIX=media/
   S3_PRESIGNED_URL_EXPIRES_SECONDS=3600
   S3_MAX_UPLOAD_BYTES=26214400
   ```

3. **IAM instance role** — Create a role with an inline policy (replace bucket name):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"],
         "Resource": "arn:aws:s3:::your-bucket-name/media/*"
       }
     ]
   }
   ```
   Attach the role to the Lightsail instance running FastAPI. Do not set `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` on the instance when using a role.

4. **Firebase Auth** — Set `FIREBASE_CREDENTIALS_JSON` (service account JSON as a single env var) or mount `FIREBASE_CREDENTIALS_FILE`. Firebase Storage is not used for uploads.

5. **Deploy** — On the instance:
   ```bash
   cd fastapi_backend
   python -m pip install -r requirements.txt
   python -m alembic upgrade head
   gunicorn main:app -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
   ```

6. **Frontend** — Point `VITE_API_URL` / `VITE_BACKEND_URL` at the Lightsail public URL (or load balancer). WebSocket URL remains separate if TV pairing uses another host.

7. **Verify** — `GET /api/health` returns `database: connected`. Upload a test image via `POST /api/upload` and confirm the response URL loads while the bucket object stays private (direct object URL without signature should fail).
