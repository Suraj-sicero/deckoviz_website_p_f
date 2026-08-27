# Deckoviz — Full-Stack Application

Deckoviz is an interactive web platform powered by a **React + Vite** frontend and a **FastAPI (Python) + Firebase** backend.

---

## 📁 Repository Structure

```text
.
├── deckoviz_web-main/             # Frontend application (React, Vite, TypeScript)
│   └── fastapi_backend/           # FastAPI Backend (Python 3.10+, Firebase)
├── backend_legacy/                # Legacy backend reference (if applicable)
├── netlify.toml                   # Frontend deployment configuration
└── README.md                      # Project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites

- **Node.js** (v18+ recommended) & **npm**
- **Python** (v3.10+)
- **Git**

---

### 🎨 Frontend Setup (`/deckoviz_web-main`)

The frontend is built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

1. Navigate to the frontend directory:
   ```bash
   cd deckoviz_web-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The app will run locally (typically at `http://localhost:5173`).

---

### ⚡ Backend Setup (`/deckoviz_web-main/fastapi_backend`)

The backend is built with **FastAPI**, **Uvicorn**, and **Firebase Admin SDK**.

1. Navigate to the backend directory:
   ```bash
   cd deckoviz_web-main/fastapi_backend
   ```

2. Create and activate a virtual environment:
   - **Windows (PowerShell):**
     ```powershell
     python -m venv .venv
     .\.venv\Scripts\Activate
     ```
   - **macOS/Linux:**
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```bash
   python main.py
   ```
   *Alternatively:*
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

5. **API Documentation**:
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`
   - Health Check: `http://localhost:8000/api/health`

---

## ⚙️ Environment Variables

### Backend (`/deckoviz_web-main/fastapi_backend/.env`)
Ensure your backend environment variables (e.g. Firebase credentials, CORS origins) are set up. Refer to `config.py` or `.env.example` in `/deckoviz_web-main/fastapi_backend` for required keys.

### Frontend (`/deckoviz_web-main/.env`)
Set any required Vite environment variables (`VITE_API_BASE_URL`, Firebase client keys, etc.).

---

## 📄 License & Notes

- **CMS / Blog Posts:** Markdown blog posts are located under `deckoviz_web-main/src/content/blogs`.
- Frontmatter `id` must be unique. Tags are discovered automatically.