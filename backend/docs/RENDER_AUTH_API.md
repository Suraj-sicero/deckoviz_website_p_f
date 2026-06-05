# Deckoviz (Render) Auth — API Reference

**Base URL:** `https://deckoviz-demo.onrender.com`
**Stack:** Node.js + Express + Sequelize (PostgreSQL)
**Auth:** Custom email + password, JWT (HS256). Send `Authorization: Bearer <token>` on protected endpoints.

> **Important — read this first.**
> This backend does **NOT** use Supabase Auth (GoTrue). Authentication is a normal
> application `Users` table: passwords are stored as bcrypt hashes and we issue our
> own JWT. PostgreSQL just happens to be hosted on Supabase, but the Supabase *Auth*
> service (and its signup rate limits) is **not used here**. There is **no
> "Rate Limit Exceeded" on account creation** — create as many accounts as you need.
>
> This is the user store that the website and the Daily Curator admin panel read
> from, so the mobile app must authenticate against **these** endpoints (not Supabase
> Auth) for users to be unified.

---

## Conventions

- All request/response bodies are JSON. Send `Content-Type: application/json`.
- The token is a JWT valid for **7 days**. There is **no refresh-token endpoint** —
  when the token expires (or a protected call returns `401`), send the user through
  login again.
- JWT payload contains `{ id, email, iat, exp }`. `id` is the user's UUID.
- Errors always come back as `{ "error": "message" }` with a `4xx`/`5xx` status.

---

## Endpoints — `/api/auth`

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| POST | `/api/auth/signup` | Register a new user. Returns JWT + user. Grants 50 free credits. | Public |
| POST | `/api/auth/signin` | Login with email + password. Returns JWT + user. | Public |
| GET  | `/api/auth/profile` | Get the current authenticated user (full profile). | Bearer |
| POST | `/api/auth/deduct-credits` | Deduct credits from the current user. | Bearer |

---

### 1. Register — `POST /api/auth/signup`

**Request body**
```json
{
  "email": "you@example.com",
  "password": "secret"
}
```
> Note: this backend uses **email + password only** — there is no `username` field.

**Success — `200`**
```json
{
  "token": "<jwt>",
  "user": {
    "id": "b1c2...uuid",
    "email": "you@example.com",
    "credits": 50
  }
}
```

**Errors**
| Status | Body | When |
| --- | --- | --- |
| 400 | `{ "error": "Email and password are required" }` | Missing field |
| 400 | `{ "error": "Email already in use" }` | Email already registered |
| 500 | `{ "error": "Internal server error" }` | Server error |

---

### 2. Login — `POST /api/auth/signin`

**Request body**
```json
{
  "email": "you@example.com",
  "password": "secret"
}
```

**Success — `200`**
```json
{
  "token": "<jwt>",
  "user": {
    "id": "b1c2...uuid",
    "email": "you@example.com",
    "credits": 50
  }
}
```

**Errors**
| Status | Body | When |
| --- | --- | --- |
| 400 | `{ "error": "Email and password are required" }` | Missing field |
| 400 | `{ "error": "Invalid email or password" }` | Wrong email or password |
| 500 | `{ "error": "Internal server error" }` | Server error |

---

### 3. Current user — `GET /api/auth/profile`

Use this on app launch (and after login) to fetch the **per-user** profile.
**Do not cache one user's profile and show it for another** — always call this with the
logged-in user's own token so each account shows its own data.

**Headers**
```
Authorization: Bearer <token>
```

**Success — `200`**
```json
{
  "user": {
    "id": "b1c2...uuid",
    "email": "you@example.com",
    "credits": 50,
    "tier": "starter",
    "emailVerified": false,
    "isAdmin": false
  }
}
```

**Errors**
| Status | Body | When |
| --- | --- | --- |
| 401 | `{ "error": "Unauthorized" }` | Missing/!Bearer header |
| 401 | `{ "error": "Invalid or expired token" }` | Bad/expired token |
| 404 | `{ "error": "User not found" }` | User no longer exists |

---

### 4. Deduct credits — `POST /api/auth/deduct-credits`

**Headers**
```
Authorization: Bearer <token>
```

**Request body**
```json
{ "amount": 5 }
```

**Success — `200`**
```json
{ "success": true, "remainingCredits": 45 }
```

**Errors**
| Status | Body | When |
| --- | --- | --- |
| 400 | `{ "error": "Invalid amount" }` | `amount` missing or `<= 0` |
| 400 | `{ "error": "Insufficient credits" }` | Balance lower than `amount` |
| 401 | `{ "error": "Unauthorized" }` / `{ "error": "Invalid or expired token" }` | Auth problem |
| 404 | `{ "error": "User not found" }` | User no longer exists |

---

## How to send the token on protected requests

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

The **same token** works for every other protected Render API (Daily Curator,
creative tools, etc.) — they all verify this JWT. So once the user is logged in via
`/api/auth/signin`, reuse the token everywhere.

---

## Migration notes for the mobile app

1. **Remove Supabase Auth (GoTrue).** Delete the Supabase `signUp` / `signInWithPassword`
   calls. They write users into Supabase's hidden `auth.users` schema, which this
   backend does **not** read — that is why mobile users were never visible to the
   website / Daily Curator admin, and why you hit the "Rate Limit Exceeded" error.
2. **Point signup/login at the endpoints above.** Store the returned `token` securely
   (e.g. secure storage / keychain), not in plain Redux state.
3. **Fetch the profile per session.** On launch and after login, call
   `GET /api/auth/profile` with the logged-in user's token and render *that* response —
   do not display a hard-coded or previously cached username. (This fixes the
   "always shows ayush798" bug.)
4. **No refresh token.** Tokens last 7 days. On a `401`, route the user back to login.
5. **Email + password only.** There is no `username` on this backend; if the app needs
   a display name, derive it from the email or add a profile field later.

Once the app authenticates here, mobile and website users live in the **same**
`Users` table and both show up in the Daily Curator admin panel automatically.
