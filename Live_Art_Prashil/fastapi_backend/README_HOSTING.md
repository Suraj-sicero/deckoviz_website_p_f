# Deckoviz FastAPI Backend & Firebase Integration Guide

This directory contains the production-ready **FastAPI** backend for **Deckoviz Home Webapp** and **Enterprise Webapp**.

---

## Features
- **Firebase Authentication**: Verifies Firebase JWT ID tokens passed via `Authorization: Bearer <token>`.
- **Firebase Storage**: Uploads images and media directly to Firebase Storage buckets and returns public URLs.
- **SQL Database Persistence**: Powered by SQLAlchemy (SQLite for local dev, PostgreSQL for production hosted backend).
- **100% User Data Separation**: Collections, daily queues, profiles, uploaded media, events, notes, and generative chats are isolated per unique user.

---

## 🚀 How to Run Locally

1. **Navigate to the backend folder**:
   ```bash
   cd d:\deckoviz_website_p_f\fastapi_backend
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the FastAPI Server**:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   The interactive API docs will be live at `http://localhost:8000/docs`.

---

## ⚙️ Environment Variables for Hosting & Firebase

When deploying to **Render**, **Railway**, **Fly.io**, or **Heroku**, set the following environment variables:

| Environment Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/deckoviz` |
| `FIREBASE_STORAGE_BUCKET` | Your Firebase Storage Bucket | `deckoviz-app.appspot.com` |
| `FIREBASE_CREDENTIALS_JSON` | Firebase Service Account JSON string | `{"type": "service_account", ...}` |
| `SECRET_KEY` | Secret key for JWT verification | `deckoviz_super_secret_jwt_key_2026` |
| `CORS_ORIGINS` | Allowed origins | `http://localhost:5173,https://yourdomain.com` |

---

## 🔗 Connecting Frontend to FastAPI Backend

In `d:\deckoviz_website_p_f\deckoviz_web-main`:
Set your backend API URL in `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000
```
Or update `https://deckoviz-web-f.onrender.com` in `webappApi.ts` to your hosted FastAPI endpoint!
