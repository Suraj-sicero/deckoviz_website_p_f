import { Router } from "express";
import { Op } from "sequelize";
import EnterpriseProfile from "../models/EnterpriseProfile.js";
import EnterpriseUnit from "../models/EnterpriseUnit.js";
import EnterpriseEvent from "../models/EnterpriseEvent.js";
import EnterpriseDailyQueue from "../models/EnterpriseDailyQueue.js";
import EnterpriseGuest from "../models/EnterpriseGuest.js";
import EnterpriseTemplate from "../models/EnterpriseTemplate.js";

const router = Router();
const USER_ID = "default-enterprise";

async function getProfile() {
  let profile = await EnterpriseProfile.findOne({ where: { userId: USER_ID } });
  if (!profile) {
    profile = await EnterpriseProfile.create({ userId: USER_ID });
    await seedDemoData();
  }
  return profile;
}

async function seedDemoData() {
  const existing = await EnterpriseUnit.count({ where: { userId: USER_ID } });
  if (existing > 0) return;

  await EnterpriseUnit.bulkCreate([
    { userId: USER_ID, name: "Grand Lobby", frames: 6, status: "active", collectionName: "Impressionist Masters" },
    { userId: USER_ID, name: "Sky Lounge", frames: 4, status: "active", collectionName: "Abstract Horizons" },
    { userId: USER_ID, name: "Restaurant Azura", frames: 8, status: "active", collectionName: "Mediterranean Dreams" },
    { userId: USER_ID, name: "Penthouse Suite A", frames: 3, status: "scheduled", collectionName: "Modern Portraits" },
    { userId: USER_ID, name: "Spa & Wellness", frames: 5, status: "active", collectionName: "Nature Serenity" },
  ]);

  await EnterpriseEvent.bulkCreate([
    { userId: USER_ID, title: "Wine & Art Evening", date: new Date(Date.now() + 86400000).toISOString().split("T")[0], time: "19:00", collectionName: "Impressionist Masters" },
    { userId: USER_ID, title: "Morning Zen Lobby", date: new Date(Date.now() + 172800000).toISOString().split("T")[0], time: "06:00", collectionName: "Nature Serenity", recurring: true, frequency: "Daily" },
    { userId: USER_ID, title: "Corporate Mixer", date: new Date(Date.now() + 259200000).toISOString().split("T")[0], time: "17:30", collectionName: "Corporate Elegance" },
    { userId: USER_ID, title: "Weekend Jazz Ambiance", date: new Date(Date.now() + 345600000).toISOString().split("T")[0], time: "20:00", collectionName: "Abstract Horizons", recurring: true, frequency: "Weekly" },
    { userId: USER_ID, title: "Sunset Gallery Night", date: new Date(Date.now() + 432000000).toISOString().split("T")[0], time: "18:00", collectionName: "Mediterranean Dreams" },
  ]);

  await EnterpriseDailyQueue.bulkCreate([
    { userId: USER_ID, collectionName: "Impressionist Masters", startTime: "06:00", endTime: "10:00", unitName: "Grand Lobby" },
    { userId: USER_ID, collectionName: "Nature Serenity", startTime: "10:00", endTime: "14:00", unitName: "Spa & Wellness" },
    { userId: USER_ID, collectionName: "Abstract Horizons", startTime: "14:00", endTime: "18:00", unitName: "Sky Lounge" },
    { userId: USER_ID, collectionName: "Mediterranean Dreams", startTime: "18:00", endTime: "22:00", unitName: "Restaurant Azura" },
    { userId: USER_ID, collectionName: "Corporate Elegance", startTime: "08:00", endTime: "18:00", unitName: "Conference Room 1" },
  ]);

  await EnterpriseGuest.bulkCreate([
    { userId: USER_ID, name: "Alexandra Chen", photo: "/images/webapp/figma/artist-1.jpg", preferences: "Prefers abstract art, ambient jazz", notes: "VIP — Suite 1201 regular" },
    { userId: USER_ID, name: "Marcus Williams", photo: "/images/webapp/figma/artist-2.jpg", preferences: "Nature scenes, classical music", notes: "Anniversary visit every June" },
    { userId: USER_ID, name: "Sophia Laurent", photo: "/images/webapp/figma/artist-3.jpg", preferences: "Modern portraits, lo-fi beats", notes: "Interior designer — sends referrals" },
    { userId: USER_ID, name: "James Hartley", photo: "/images/webapp/figma/artist-4.jpg", preferences: "Minimalist, silence preferred", notes: "Board member — quarterly stay" },
  ]);

  await EnterpriseTemplate.bulkCreate([
    { userId: USER_ID, title: "Welcome Guest Message", category: "Hospitality", lastEdited: new Date(Date.now() - 86400000).toISOString().split("T")[0] },
    { userId: USER_ID, title: "Event Announcement", category: "Marketing", lastEdited: new Date(Date.now() - 172800000).toISOString().split("T")[0] },
    { userId: USER_ID, title: "Spa Experience Brief", category: "Wellness", lastEdited: new Date(Date.now() - 345600000).toISOString().split("T")[0] },
  ]);
}

router.get("/enterprise/profile", async (req, res) => {
  try {
    const profile = await getProfile();
    const units = await EnterpriseUnit.count({ where: { userId: USER_ID } });
    const events = await EnterpriseEvent.count({ where: { userId: USER_ID } });
    const queue = await EnterpriseDailyQueue.count({ where: { userId: USER_ID } });
    res.json({
      ...profile.toJSON(),
      units,
      activeFrames: units * 4,
      collections: 37,
      upcomingEvents: events,
      totalMedia: 2461,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/enterprise/profile", async (req, res) => {
  try {
    const profile = await getProfile();
    await profile.update(req.body);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/enterprise/dashboard", async (req, res) => {
  try {
    const profile = await getProfile();
    const units = await EnterpriseUnit.findAll({ where: { userId: USER_ID } });
    const events = await EnterpriseEvent.findAll({ where: { userId: USER_ID }, limit: 5 });
    const queue = await EnterpriseDailyQueue.findAll({ where: { userId: USER_ID }, limit: 5 });
    const totalUnits = units.length;
    const activeUnits = units.filter(u => u.status === "active").length;
    res.json({
      profile: { ...profile.toJSON(), units: totalUnits, activeFrames: activeUnits * 4 },
      stats: [
        { label: "Active Frames", value: String(activeUnits * 4), delta: `+${activeUnits} today`, color: "#3b82f6" },
        { label: "Collections", value: "37", delta: "+2 this week", color: "#8b5cf6" },
        { label: "Upcoming Events", value: String(events.length), delta: "Next in 2h", color: "#f59e0b" },
        { label: "Media Assets", value: "2,461", delta: "+58 this month", color: "#10b981" },
      ],
      units,
      events,
      queue,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/enterprise/units", async (req, res) => {
  try {
    await getProfile();
    const units = await EnterpriseUnit.findAll({ where: { userId: USER_ID }, order: [["createdAt", "ASC"]] });
    res.json(units);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/enterprise/units", async (req, res) => {
  try {
    const unit = await EnterpriseUnit.create({ ...req.body, userId: USER_ID });
    res.status(201).json(unit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/enterprise/units/:id", async (req, res) => {
  try {
    const unit = await EnterpriseUnit.findOne({ where: { id: req.params.id, userId: USER_ID } });
    if (!unit) return res.status(404).json({ error: "Unit not found" });
    await unit.update(req.body);
    res.json(unit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/enterprise/units/:id", async (req, res) => {
  try {
    await EnterpriseUnit.destroy({ where: { id: req.params.id, userId: USER_ID } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/enterprise/events", async (req, res) => {
  try {
    await getProfile();
    const events = await EnterpriseEvent.findAll({ where: { userId: USER_ID }, order: [["date", "ASC"]] });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/enterprise/events", async (req, res) => {
  try {
    const event = await EnterpriseEvent.create({ ...req.body, userId: USER_ID });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/enterprise/events/:id", async (req, res) => {
  try {
    const event = await EnterpriseEvent.findOne({ where: { id: req.params.id, userId: USER_ID } });
    if (!event) return res.status(404).json({ error: "Event not found" });
    await event.update(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/enterprise/events/:id", async (req, res) => {
  try {
    await EnterpriseEvent.destroy({ where: { id: req.params.id, userId: USER_ID } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/enterprise/daily-queue", async (req, res) => {
  try {
    await getProfile();
    const queue = await EnterpriseDailyQueue.findAll({ where: { userId: USER_ID }, order: [["startTime", "ASC"]] });
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/enterprise/daily-queue", async (req, res) => {
  try {
    const item = await EnterpriseDailyQueue.create({ ...req.body, userId: USER_ID });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/enterprise/daily-queue/:id", async (req, res) => {
  try {
    const item = await EnterpriseDailyQueue.findOne({ where: { id: req.params.id, userId: USER_ID } });
    if (!item) return res.status(404).json({ error: "Queue item not found" });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/enterprise/daily-queue/:id", async (req, res) => {
  try {
    await EnterpriseDailyQueue.destroy({ where: { id: req.params.id, userId: USER_ID } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/enterprise/guests", async (req, res) => {
  try {
    await getProfile();
    const guests = await EnterpriseGuest.findAll({ where: { userId: USER_ID } });
    res.json(guests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/enterprise/guests", async (req, res) => {
  try {
    const guest = await EnterpriseGuest.create({ ...req.body, userId: USER_ID });
    res.status(201).json(guest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/enterprise/guests/:id", async (req, res) => {
  try {
    const guest = await EnterpriseGuest.findOne({ where: { id: req.params.id, userId: USER_ID } });
    if (!guest) return res.status(404).json({ error: "Guest not found" });
    await guest.update(req.body);
    res.json(guest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/enterprise/guests/:id", async (req, res) => {
  try {
    await EnterpriseGuest.destroy({ where: { id: req.params.id, userId: USER_ID } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/enterprise/templates", async (req, res) => {
  try {
    await getProfile();
    const templates = await EnterpriseTemplate.findAll({ where: { userId: USER_ID } });
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/enterprise/templates", async (req, res) => {
  try {
    const template = await EnterpriseTemplate.create({ ...req.body, userId: USER_ID });
    res.status(201).json(template);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/enterprise/templates/:id", async (req, res) => {
  try {
    const template = await EnterpriseTemplate.findOne({ where: { id: req.params.id, userId: USER_ID } });
    if (!template) return res.status(404).json({ error: "Template not found" });
    await template.update(req.body);
    res.json(template);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/enterprise/templates/:id", async (req, res) => {
  try {
    await EnterpriseTemplate.destroy({ where: { id: req.params.id, userId: USER_ID } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/enterprise/music", async (_req, res) => {
  res.json([
    { id: 1, title: "Ambient Sunrise", duration: "3:42", genre: "Ambient", createdAt: "2025-06-20" },
    { id: 2, title: "Jazz Lounge Evening", duration: "4:15", genre: "Jazz", createdAt: "2025-06-18" },
    { id: 3, title: "Ocean Whispers", duration: "5:01", genre: "Nature", createdAt: "2025-06-15" },
    { id: 4, title: "Corporate Focus", duration: "3:30", genre: "Electronic", createdAt: "2025-06-12" },
    { id: 5, title: "Garden Meditation", duration: "6:20", genre: "Wellness", createdAt: "2025-06-10" },
  ]);
});

router.get("/enterprise/narrations", async (_req, res) => {
  res.json([
    "Emily — Warm British", "James — Deep American", "Aria — Soft French",
    "Kai — Calm Japanese", "Sofia — Elegant Italian", "Oliver — Classic British",
    "Maya — Energetic Indian", "Liam — Friendly Irish",
  ]);
});

router.get("/enterprise/library", async (_req, res) => {
  res.json({
    art: [
      { title: "Renaissance Revival", count: 120, cover: "/images/webapp/figma/spiral-ocean.jpg" },
      { title: "Pop Art Collection", count: 85, cover: "/images/webapp/vibrant_face_art.png" },
      { title: "Japanese Ukiyo-e", count: 64, cover: "/images/webapp/figma/aurora-lake.jpg" },
      { title: "Surrealist Dreams", count: 92, cover: "/images/webapp/figma/abstract-wave-wide.jpg" },
    ],
    photos: [
      { title: "Urban Architecture", count: 200, cover: "/images/webapp/city_fire_reflection.png" },
      { title: "Nature Landscapes", count: 340, cover: "/images/webapp/nature_garden.png" },
      { title: "Macro Photography", count: 156, cover: "/images/webapp/digital_plants.png" },
      { title: "Aerial Views", count: 88, cover: "/images/webapp/minimalistic_night.png" },
    ],
    posters: [
      { title: "Motivational Quotes", count: 75, cover: "/images/webapp/figma/violin-art.jpg" },
      { title: "Event Templates", count: 44, cover: "/images/webapp/figma/interior-tech.jpg" },
      { title: "Holiday Specials", count: 62, cover: "/images/webapp/figma/boat-pond.jpg" },
      { title: "Brand Signage", count: 38, cover: "/images/webapp/abstract_landscape.png" },
    ],
  });
});

router.get("/enterprise/curations", async (_req, res) => {
  res.json([
    { title: "Morning Serenity Bundle", description: "Curated based on your lobby's morning schedule — calm, bright, inviting", items: 12, cover: "/images/webapp/nature_garden.png" },
    { title: "Corporate Welcome Pack", description: "Professional yet warm art for your boardroom and conference spaces", items: 8, cover: "/images/webapp/minimalistic_night.png" },
    { title: "Evening Ambiance Palette", description: "Warm tones, abstract forms, perfect for dinner ambiance", items: 15, cover: "/images/webapp/figma/abstract-wave-wide.jpg" },
    { title: "Spa Wellness Collection", description: "Nature-inspired calming visuals for your spa and wellness area", items: 20, cover: "/images/webapp/digital_plants.png" },
    { title: "Renaissance Revival", description: "Classic masterpieces reimagined for modern digital display", items: 24, cover: "/images/webapp/figma/spiral-ocean.jpg" },
    { title: "Urban Contemporary", description: "Bold cityscapes and urban art for dynamic spaces", items: 18, cover: "/images/webapp/city_fire_reflection.png" },
    { title: "Botanical Dreams", description: "Lush botanical illustrations and nature art", items: 30, cover: "/images/webapp/digital_plants.png" },
    { title: "Abstract Horizons", description: "Vibrant abstract art with bold colors and gradients", items: 22, cover: "/images/webapp/vibrant_face_art.png" },
    { title: "Minimalist Focus", description: "Clean, minimal artwork for professional spaces", items: 16, cover: "/images/webapp/abstract_landscape.png" },
    { title: "Coastal Serenity", description: "Ocean-inspired art for relaxing environments", items: 20, cover: "/images/webapp/figma/aurora-lake.jpg" },
  ]);
});

export default router;
