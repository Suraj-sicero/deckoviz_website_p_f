# Deckoviz — Live Art Hub (Prashil_Combined Branch)

This folder contains the Live Art Hub feature work developed by Prashil Maske, integrated into the main Deckoviz website.

---

## ?? Quick Start

### 1. Prerequisites

Make sure you have the following installed:
- **Node.js** v18 or higher — https://nodejs.org/
- **npm** (comes with Node.js)

### 2. Install Dependencies

Navigate into this folder and install:

```bash
cd Live_Art_Prashil/deckoviz_web-main
npm install
```

### 3. Run the Website (Dev Server)

```bash
npm run dev
```

Then open your browser at: **http://localhost:5173**

---

## What's New in This Branch

### Live Art Link in Navbar
A **Live Art** navigation link has been added to the top navbar (both desktop and mobile). Clicking it takes you to the Live Art Hub gallery.

### Live Art Hub Card in "Extended Universe"
On the homepage All Features section, scroll down to **Extended Universe** and you will find a new **Live Art Hub** card. Clicking it navigates directly to the Live Art Hub.

### Live Art Hub Page (/art-hub)
Browse all available Live Art modes:
- **Ink Tide** — Fluid ink simulation reacting to mouse movement
- **Gravity** — Particle gravity simulation with multiple art styles
- And more coming soon

Each mode opens in full TV Mode for immersive viewing.

---

## Live Art to Video Export (Optional Feature)

The Live Art pages include a **Live Art to Video Converter** panel that can export the artwork as an MP4 video.

> This feature requires a separate API server to be running alongside the dev server.

### Setup for Video Export

**Terminal 1 — Run the website:**
```bash
npm run dev
```

**Terminal 2 — Run the export API server:**
```bash
npm run api
```

### How to Export a Video
1. Open any Live Art mode (e.g. Ink Tide at http://localhost:5173/ink-tide.html)
2. Move your mouse to reveal the controls panel
3. Scroll down to **Live Art to Video Convertor**
4. Click a duration button (5m, 10m, 20m, 30m)
5. Wait for the export to complete in the background
6. A green **Download MP4** button will appear when ready

Note: Video encoding is CPU-intensive. A 5-minute video may take 10-30 minutes to fully process depending on your machine.

---

## Key Files Changed

| File | Description |
|------|-------------|
| src/components/layout/Navbar.tsx | Added Live Art nav link |
| src/components/homepage/AllFeatures.tsx | Added Live Art Hub card to Extended Universe |
| api-server.cjs | Express API server for video export jobs |
| render-worker.cjs | Puppeteer + FFmpeg video capture and encoding worker |

---

## Branch Info

- **Branch:** Prashil_Combined
- **Repo:** https://github.com/Suraj-sicero/deckoviz_website_p_f
- **Does NOT affect:** main branch
