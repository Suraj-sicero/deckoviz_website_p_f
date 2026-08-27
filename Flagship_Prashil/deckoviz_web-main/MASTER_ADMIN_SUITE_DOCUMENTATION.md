# 🛡️ Deckoviz Master Admin Suite — Technical Documentation

## 1. Executive Summary & Overview
The **Deckoviz Master Admin Suite** is the central management console for the Deckoviz platform. It provides platform administrators with real-time operational control over user accounts, curated visual imagery, ambient audio soundscapes, connected TV Smart Frames, subscription tier rules, and global broadcast announcements.

- **Primary Route**: `/admin` (also accessible via `/admin/users`, `/admin/library`, `/admin/devices`, `/admin/settings`)
- **Backend REST Base**: `https://deckoviz-web-f.onrender.com`
- **WebSocket Gateway**: `wss://ckoviz-backend.onrender.com`
- **Database Layer**: Dual-synchronized Firebase Firestore + Firebase Realtime Database (RTDB) + local persistent fallback.

---

## 2. Authentication & Access Security

### 🔑 Security Passcode
Access to the Master Admin Suite is protected by passcode authentication.
- **Master Passcode**: `deckovizadmin123`
- **Session Storage Key**: `deckoviz_admin_auth` (`"true"`)

### 🛡️ Security Features
1. **Passcode Gatekeeping**: Unauthenticated visitors encountering `/admin` are presented with an encrypted lock screen requiring the master passcode.
2. **Session Persistence**: Authentication state persists across page refreshes via `localStorage`.
3. **Lock Console**: Admin users can manually click **Lock Admin Console** to clear credentials and return to the main application.

---

## 3. Suite Architecture & Key Modules

The Master Admin Suite consists of 5 dedicated operational modules:

```
                  ┌─────────────────────────────────────┐
                  │     Master Admin Suite (/admin)     │
                  └──────────────────┬──────────────────┘
                                     │
    ┌──────────────┬─────────────────┼─────────────────┬──────────────┐
    ▼              ▼                 ▼                 ▼              ▼
┌───────────┐┌───────────┐   ┌───────────────┐   ┌───────────┐  ┌────────────┐
│ Dashboard ││ Users Dir │   │ Global Library│   │ Devices   │  │ Settings   │
│ Overview  ││  Manager  │   │ Art & Music   │   │ TV Pairing│  │ & Tiers    │
└───────────┘└───────────┘   └───────────────┘   └───────────┘  └────────────┘
```

---

## 4. Operational Modules Reference

### 📊 4.1 Dashboard Overview (`/admin`)
The main operational dashboard provides immediate visual metrics and 1-click management shortcuts:
- **Total Registered Users**: Real-time count of active platform accounts.
- **Active Smart Frames**: Active connected TV frames on the WebSocket network.
- **Global Artworks**: Count of 4K artworks in the Master Art Vault.
- **Cloud Storage**: Aggregate storage consumed by high-resolution visual assets.
- **Monthly Revenue**: Active recurring subscription performance.
- **Quick Shortcuts**: 1-click navigation to upload artwork, inspect users, pair devices, or modify tier rules.

---

### 👥 4.2 User Directory (`/admin/users`)
Complete user management interface for customer accounts and enterprise clients:
- **User Table & Search**: Filter members by email, name, subscription tier (`Free`, `Pro`, `Enterprise`), or account status.
- **Single User Detail View (`/admin/users/:id`)**: Deep view into individual user profiles, active devices, saved collections, and credit usage.
- **Tier Upgrades & Modifications**: Modify user tiers directly and grant extra generative AI credits.

---

### 🖼️ 4.3 Global Media Library (`/admin/library`)
The core content curation vault for artwork imagery and ambient music tracks.

#### 🎨 Artwork & Image Vault
- **Instant Link Processing**: Selected image files (`.png`, `.jpg`, `.webp`) are parsed client-side into lightweight persistent URL links.
- **Firebase Firestore & RTDB Storage**:
  - Saved directly into Firebase Firestore (`media` collection) and Realtime Database (`/media` node).
  - Bypasses storage bucket quotas and prevents connection timeouts when hosted.
- **Metadata Fields**: Artwork Title, Category/Collection, Visual Style, and Comma-separated Tags.
- **Multi-tier Deletion**: Deleting an artwork calls `deleteFirebaseMedia()`, removing record entries across Firestore, RTDB, and local cache.

#### 🎵 Music Vault & Audio Curations
- **Audio Processing**: Supports audio file selection (`.mp3`, `.wav`, `.ogg`, `.aac`) or direct audio URL links.
- **Database Link Storage**: Audio links save directly into Firebase Realtime Database (`rtdb` `/music` node) and Firestore (`db` `music` collection).
- **WebSocket Broadcast**: Admins can click **Send to Frame** on any music track card to broadcast live audio playback commands (`action: "play_music"`) across connected TV Smart Frames via WebSocket.
- **Track Deletion**: Delete button calls `deleteFirebaseMusic()`, ensuring track records are cleared from all database layers.

---

### 📺 4.4 Smart Frame Devices (`/admin/devices`)
Remote administration of physical TV frames and browser frame emulators:
- **Device Pairing**: Inspect active 6-digit pairing codes generated via `/api/pairing/session`.
- **Live Stream Sync**: Push artwork or music to online devices in real time.
- **Remote Commands**: Send reload, sleep, play, or collection switch signals directly over the WebSocket server (`wss://ckoviz-backend.onrender.com`).

---

### ⚙️ 4.5 Subscriptions & System Settings (`/admin/settings`)
Global platform configuration console:
- **Subscription Tier Pricing**: Configure monthly rates for `Free`, `Pro`, and `Enterprise` tiers.
- **Generative AI Credit Quotas**: Set monthly credit allocations for user image generation.
- **Global Network Announcements**: Broadcast real-time system notifications to all connected user webapps and Smart Frames.
- **Master Admin Team**: Manage platform owner and admin team access roles.

---

## 5. Technical Integration & File Structure

| Component / Utility | File Path | Function / Responsibilities |
| :--- | :--- | :--- |
| **Admin Suite Wrapper** | [MasterAdminSuite.tsx](file:///d:/deckoviz_website_p_f(1)/deckoviz_web-main/src/components/admin/MasterAdminSuite.tsx) | Passcode auth (`deckovizadmin123`), tab navigation router |
| **Library Component** | [MasterAdminLibrary.tsx](file:///d:/deckoviz_website_p_f(1)/deckoviz_web-main/src/components/admin/MasterAdminLibrary.tsx) | Artwork upload, Music Vault, Firebase DB operations, Audio broadcast |
| **Dashboard Component** | [MasterAdminDashboard.tsx](file:///d:/deckoviz_website_p_f(1)/deckoviz_web-main/src/components/admin/MasterAdminDashboard.tsx) | System metrics, quick shortcuts, platform health status |
| **User Directory** | [MasterAdminUsers.tsx](file:///d:/deckoviz_website_p_f(1)/deckoviz_web-main/src/components/admin/MasterAdminUsers.tsx) | User filter table, tier upgrades, credit adjustments |
| **Device Manager** | [MasterAdminDevices.tsx](file:///d:/deckoviz_website_p_f(1)/deckoviz_web-main/src/components/admin/MasterAdminDevices.tsx) | Frame pairing, live control, WebSocket command triggers |
| **Settings Component** | [MasterAdminSettings.tsx](file:///d:/deckoviz_website_p_f(1)/deckoviz_web-main/src/components/admin/MasterAdminSettings.tsx) | Pricing tiers, AI credit limits, global system broadcasts |
| **Firebase Helper** | [firebaseClient.ts](file:///d:/deckoviz_website_p_f(1)/deckoviz_web-main/src/lib/firebaseClient.ts) | Firestore & RTDB writes (`addFirebaseMedia`, `addFirebaseMusic`), reads, deletion |
| **Constants Config** | [constants.ts](file:///d:/deckoviz_website_p_f(1)/deckoviz_web-main/src/lib/constants.ts) | Base REST API (`https://deckoviz-web-f.onrender.com`) & WebSocket URLs |

---

## 6. How to Deploy & Verify

1. **Local Development**:
   ```bash
   cd deckoviz_web-main
   npm run dev
   ```
   Navigate to `http://localhost:5173/admin` and enter passcode `deckovizadmin123`.

2. **Production Build**:
   ```bash
   npm run build
   ```

3. **Verification Checklist**:
   - [x] Passcode `deckovizadmin123` unlocks the admin suite.
   - [x] Global Media Library uploads images and stores link records directly in Firebase Firestore & Realtime DB.
   - [x] Music Vault stores track links in Firebase RTDB `/music` node and Firestore `music` collection.
   - [x] Delete button cleans media/music entries across Firestore, RTDB, and local cache.
   - [x] Code is pushed to GitHub `main` branch (`https://github.com/Suraj-sicero/deckoviz_website_p_f.git`).
