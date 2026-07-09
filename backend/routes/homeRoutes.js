import { Router } from "express";
import { Op } from "sequelize";
import HomeProfile from "../models/HomeProfile.js";
import HomeDeepProfile from "../models/HomeDeepProfile.js";
import HomeDailyQueue from "../models/HomeDailyQueue.js";
import HomeEvent from "../models/HomeEvent.js";
import HomeFavorite from "../models/HomeFavorite.js";
import HomeSetting from "../models/HomeSetting.js";
import HomeVCCSession from "../models/HomeVCCSession.js";
import HomeMember from "../models/HomeMember.js";
import { Collection, CollectionItem } from "../models/Collection.js";
import UploadedMedia from "../models/UploadedMedia.js";
import Folder from "../models/Folder.js";
import VizzyChat from "../models/VizzyChat.js";
import VizzyAgentSession from "../models/VizzyAgentSession.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import jwt from "jsonwebtoken";
import { HOME_AGENTS } from "../agents/subAgents.js";
import { processAgentRequest } from "../agents/vizzyMasterAgent.js";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key_here";

router.use((req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      req.user = jwt.verify(token, JWT_SECRET);
    }
  } catch { /* no valid token — continue without user */ }
  next();
});

const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const genAI = geminiKey ? new GoogleGenerativeAI(geminiKey) : null;

const getUserId = (req) => req.user?.id || req.query.userId || req.body?.userId || "default-home";

const validate = (fields, body) => {
  const missing = fields.filter(f => !body[f] && body[f] !== 0);
  if (missing.length) return `Missing required fields: ${missing.join(", ")}`;
  return null;
};

/* ══════════════════════════════════════════
   DRAWING ROOM
   ══════════════════════════════════════════ */

router.get("/home/drawing-room", async (req, res) => {
  try {
    const userId = getUserId(req);
    const [profile, collections, events, mediaCount, favs, dailyQueue] = await Promise.all([
      HomeProfile.findOne({ where: { userId } }),
      Collection.findAll({ where: { userId }, order: [["createdAt", "DESC"]] }),
      HomeEvent.findAll({ where: { userId }, order: [["date", "ASC"]] }),
      UploadedMedia.count({ where: { userId } }),
      HomeFavorite.findAll({ where: { userId } }),
      HomeDailyQueue.findAll({ where: { userId, active: true }, order: [["startTime", "ASC"]] }),
    ]);
    const currentCollection = profile?.currentCollectionId
      ? await Collection.findByPk(profile.currentCollectionId)
      : collections[0] || null;
    const favCollections = favs.filter(f => f.itemType === "collection");
    const favArtworks = favs.filter(f => f.itemType === "artwork");
    res.json({
      profile: profile || {},
      currentCollection,
      collections: collections.slice(0, 4),
      upcomingEvents: events.slice(0, 5),
      totalMedia: mediaCount,
      favoriteCollections: favCollections,
      favoriteArtworks: favArtworks,
      dailyQueue,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════════════════════
   QUICK ACTIONS — Generate
   ══════════════════════════════════════════ */

router.post("/home/generate/art", async (req, res) => {
  try {
    const { prompt, style } = req.body;
    if (!prompt) return res.status(400).json({ error: "prompt is required" });
    let result = { success: true, prompt, style: style || "auto", message: "Art generation queued" };
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const ai = await model.generateContent(`You are an AI art director. Describe a visual artwork for: "${prompt}"${style ? ` Style: ${style}.` : ""} Include: title, description, style, color palette, composition. Respond in JSON format.`);
        const text = ai.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) result = { ...result, ...JSON.parse(jsonMatch[0]), source: "ai" };
      } catch { /* use defaults */ }
    }
    res.json(result);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/home/generate/poster", async (req, res) => {
  try {
    const { prompt, orientation } = req.body;
    if (!prompt) return res.status(400).json({ error: "prompt is required" });
    let result = { success: true, prompt, orientation: orientation || "landscape", message: "Poster generation queued" };
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const ai = await model.generateContent(`You are a poster designer. Describe a poster layout for: "${prompt}" Orientation: ${orientation || "landscape"}. Include: title, tagline, layout, color scheme, typography. Respond in JSON format.`);
        const text = ai.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) result = { ...result, ...JSON.parse(jsonMatch[0]), source: "ai" };
      } catch { /* use defaults */ }
    }
    res.json(result);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/home/generate/sequential-art", async (req, res) => {
  try {
    const { prompt, panels } = req.body;
    if (!prompt) return res.status(400).json({ error: "prompt is required" });
    let result = { success: true, prompt, panels: panels || 4, message: "Sequential art generation queued" };
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const ai = await model.generateContent(`You are a storyboard artist. Create a ${panels || 4}-panel storyboard for: "${prompt}". For each panel: number, visual description, composition, camera angle, transitions. Respond in JSON with a "panels" array.`);
        const text = ai.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) result = { ...result, ...JSON.parse(jsonMatch[0]), source: "ai" };
      } catch { /* use defaults */ }
    }
    res.json(result);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

/* ══════════════════════════════════════════
   PROFILE
   ══════════════════════════════════════════ */

router.get("/home/profile", async (req, res) => {
  try {
    const userId = getUserId(req);
    let profile = await HomeProfile.findOne({ where: { userId } });
    if (!profile) {
      profile = await HomeProfile.create({ userId, displayName: "My Home" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/home/profile", async (req, res) => {
  try {
    const userId = getUserId(req);
    const [profile] = await HomeProfile.upsert({ userId, ...req.body });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════════════════════
   DEEP PROFILE
   ══════════════════════════════════════════ */

router.get("/home/deep-profile", async (req, res) => {
  try {
    const userId = getUserId(req);
    const fields = await HomeDeepProfile.findAll({ where: { userId } });
    const grouped = {};
    for (const f of fields) {
      if (!grouped[f.sectionId]) grouped[f.sectionId] = {};
      grouped[f.sectionId][f.fieldId] = f.fieldType === "tags" && f.fieldValue ? JSON.parse(f.fieldValue) : f.fieldValue;
    }
    res.json({ sections: grouped });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/home/deep-profile", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { sectionId, sectionNumber, fields } = req.body;
    if (!sectionId || !fields) return res.status(400).json({ error: "sectionId and fields required" });
    for (const [fieldId, value] of Object.entries(fields)) {
      const fieldType = typeof value === "object" ? "tags" : "textarea";
      const fieldValue = typeof value === "object" ? JSON.stringify(value) : String(value);
      await HomeDeepProfile.upsert({ userId, sectionId, sectionNumber: sectionNumber || 0, fieldId, fieldValue, fieldType });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════════════════════
   COLLECTIONS (reuse existing Collection model)
   ══════════════════════════════════════════ */

router.get("/home/collections", async (req, res) => {
  try {
    const userId = getUserId(req);
    const collections = await Collection.findAll({ where: { userId }, order: [["createdAt", "DESC"]] });
    const result = await Promise.all(collections.map(async (c) => {
      const items = await CollectionItem.findAll({ where: { collectionId: c.id } });
      return { ...c.toJSON(), itemCount: items.length, items };
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/home/collections", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { name, description, itemIds, itemType } = req.body;
    if (!name) return res.status(400).json({ error: "name is required" });
    const collection = await Collection.create({ userId, name, description: description || "" });
    if (itemIds && Array.isArray(itemIds)) {
      await CollectionItem.bulkCreate(itemIds.map(itemId => ({ collectionId: collection.id, itemType: itemType || "image", itemId })));
    }
    res.status(201).json(collection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/home/collections/:id", async (req, res) => {
  try {
    const collection = await Collection.findByPk(req.params.id);
    if (!collection) return res.status(404).json({ error: "Collection not found" });
    const items = await CollectionItem.findAll({ where: { collectionId: collection.id } });
    res.json({ ...collection.toJSON(), items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/home/collections/:id", async (req, res) => {
  try {
    const collection = await Collection.findByPk(req.params.id);
    if (!collection) return res.status(404).json({ error: "Collection not found" });
    await collection.update(req.body);
    res.json(collection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/home/collections/:id", async (req, res) => {
  try {
    const collection = await Collection.findByPk(req.params.id);
    if (!collection) return res.status(404).json({ error: "Collection not found" });
    await CollectionItem.destroy({ where: { collectionId: collection.id } });
    await collection.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/home/collections/:id/items", async (req, res) => {
  try {
    const { itemId, itemType } = req.body;
    if (!itemId) return res.status(400).json({ error: "itemId is required" });
    const collection = await Collection.findByPk(req.params.id);
    if (!collection) return res.status(404).json({ error: "Collection not found" });
    const item = await CollectionItem.create({ collectionId: collection.id, itemType: itemType || "image", itemId });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/home/collections/:id/items/:itemId", async (req, res) => {
  try {
    const item = await CollectionItem.findOne({ where: { collectionId: req.params.id, itemId: req.params.itemId } });
    if (!item) return res.status(404).json({ error: "Item not found" });
    await item.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/home/collections/:id/cover", async (req, res) => {
  try {
    const collection = await Collection.findByPk(req.params.id);
    if (!collection) return res.status(404).json({ error: "Collection not found" });
    await collection.update({ coverUrl: req.body.coverUrl });
    res.json(collection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════════════════════
   ALL MEDIA
   ══════════════════════════════════════════ */

router.get("/home/media", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { type, search, page = 1, limit = 50 } = req.query;
    const where = { userId };
    if (type) where.mediaType = { [Op.like]: `%${type}%` };
    if (search) where.fileName = { [Op.like]: `%${search}%` };
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const { rows, count } = await UploadedMedia.findAndCountAll({ where, order: [["createdAt", "DESC"]], offset, limit: parseInt(limit) });
    res.json({ items: rows, total: count, page: parseInt(page), totalPages: Math.ceil(count / parseInt(limit)) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/home/media/counts", async (req, res) => {
  try {
    const userId = getUserId(req);
    const baseWhere = { userId };
    const [gen_images, gen_videos, gen_music, gen_narrations, up_images, up_videos, up_music] = await Promise.all([
      UploadedMedia.count({ where: { ...baseWhere, mediaType: { [Op.like]: "image/%" }, mediaUrl: { [Op.like]: "%generated%" } } }),
      UploadedMedia.count({ where: { ...baseWhere, mediaType: { [Op.like]: "video/%" }, mediaUrl: { [Op.like]: "%generated%" } } }),
      UploadedMedia.count({ where: { ...baseWhere, [Op.or]: [{ mediaType: { [Op.like]: "audio/%" } }, { mediaType: { [Op.like]: "music/%" } }] } }),
      UploadedMedia.count({ where: { ...baseWhere, mediaType: { [Op.like]: "%narration%" } } }),
      UploadedMedia.count({ where: { ...baseWhere, mediaType: { [Op.like]: "image/%" }, mediaUrl: { [Op.notLike]: "%generated%" } } }),
      UploadedMedia.count({ where: { ...baseWhere, mediaType: { [Op.like]: "video/%" }, mediaUrl: { [Op.notLike]: "%generated%" } } }),
      UploadedMedia.count({ where: { ...baseWhere, [Op.or]: [{ mediaType: { [Op.like]: "audio/%" } }, { mediaType: { [Op.like]: "music/%" } }], mediaUrl: { [Op.notLike]: "%generated%" } } }),
    ]);
    res.json({ gen_images, gen_videos, gen_music, gen_narrations, up_images, up_videos, up_music });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/home/media/:id", async (req, res) => {
  try {
    const media = await UploadedMedia.findByPk(req.params.id);
    if (!media) return res.status(404).json({ error: "Media not found" });
    await media.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════════════════════
   MEDIA BY TYPE
   ══════════════════════════════════════════ */

const mediaTypeFilters = {
  images: { mediaType: { [Op.like]: "image/%" } },
  videos: { mediaType: { [Op.like]: "video/%" } },
  music: { mediaType: { [Op.or]: [{ [Op.like]: "audio/%" }, { [Op.like]: "music/%" }] } },
  narrations: { mediaType: { [Op.like]: "%narration%" } },
};

router.get("/home/media/:type", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { type } = req.params;
    const { page = 1, limit = 50 } = req.query;
    const filter = mediaTypeFilters[type];
    if (!filter) return res.status(400).json({ error: `Invalid type. Use: ${Object.keys(mediaTypeFilters).join(", ")}` });
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const { rows, count } = await UploadedMedia.findAndCountAll({ where: { userId, ...filter }, order: [["createdAt", "DESC"]], offset, limit: parseInt(limit) });
    res.json({ items: rows, total: count, page: parseInt(page), totalPages: Math.ceil(count / parseInt(limit)) });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/home/media/:type/counts", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { type } = req.params;
    const filter = mediaTypeFilters[type];
    if (!filter) return res.status(400).json({ error: `Invalid type. Use: ${Object.keys(mediaTypeFilters).join(", ")}` });
    const total = await UploadedMedia.count({ where: { userId, ...filter } });
    const generated = await UploadedMedia.count({ where: { userId, ...filter, mediaUrl: { [Op.like]: "%generated%" } } });
    res.json({ total, generated, uploaded: total - generated });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

/* ══════════════════════════════════════════
   FOLDERS
   ══════════════════════════════════════════ */

router.get("/home/folders", async (req, res) => {
  try {
    const userId = getUserId(req);
    const folders = await Folder.findAll({ where: { userId }, order: [["name", "ASC"]] });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/home/folders", async (req, res) => {
  try {
    const userId = getUserId(req);
    const folder = await Folder.create({ userId, name: req.body.name });
    res.status(201).json(folder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/home/folders/:id", async (req, res) => {
  try {
    const folder = await Folder.findByPk(req.params.id);
    if (!folder) return res.status(404).json({ error: "Folder not found" });
    await folder.update(req.body);
    res.json(folder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/home/folders/:id", async (req, res) => {
  try {
    const folder = await Folder.findByPk(req.params.id);
    if (!folder) return res.status(404).json({ error: "Folder not found" });
    await folder.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════════════════════
   DAILY QUEUE
   ══════════════════════════════════════════ */

router.get("/home/daily-queue", async (req, res) => {
  try {
    const userId = getUserId(req);
    let queue = await HomeDailyQueue.findAll({ where: { userId, active: true }, order: [["startTime", "ASC"]] });
    if (queue.length === 0) {
      const seed = [
        { collectionName: "Morning Blend", startTime: "06:00", endTime: "09:00", collectionId: null },
        { collectionName: "Daylight Focus", startTime: "09:00", endTime: "17:00", collectionId: null },
        { collectionName: "Evening Wind Down", startTime: "17:00", endTime: "22:00", collectionId: null },
      ];
      queue = await HomeDailyQueue.bulkCreate(seed.map(s => ({ ...s, userId })));
    }
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/home/daily-queue", async (req, res) => {
  try {
    const userId = getUserId(req);
    const err = validate(["collectionName", "startTime", "endTime"], req.body);
    if (err) return res.status(400).json({ error: err });
    const item = await HomeDailyQueue.create({ ...req.body, userId });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/home/daily-queue/:id", async (req, res) => {
  try {
    const item = await HomeDailyQueue.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Queue item not found" });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/home/daily-queue/:id", async (req, res) => {
  try {
    const item = await HomeDailyQueue.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Queue item not found" });
    await item.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════════════════════
   EVENTS
   ══════════════════════════════════════════ */

router.get("/home/events", async (req, res) => {
  try {
    const userId = getUserId(req);
    let events = await HomeEvent.findAll({ where: { userId }, order: [["date", "ASC"]] });
    if (events.length === 0) {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, "0");
      const d = String(now.getDate()).padStart(2, "0");
      const seed = [
        { title: "Morning Art Walk", date: `${y}-${m}-${d}`, time: "07:00", collectionName: "Morning Blend", recurring: true, frequency: "Daily" },
        { title: "Weekend Movie Night", date: `${y}-${m}-${d}`, time: "20:00", collectionName: "Evening Wind Down", recurring: true, frequency: "Weekly" },
        { title: "Garden Brunch", date: `${y}-${m}-${d}`, time: "11:00", collectionName: "Daylight Focus", recurring: false },
      ];
      events = await HomeEvent.bulkCreate(seed.map(s => ({ ...s, userId })));
    }
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/home/events", async (req, res) => {
  try {
    const userId = getUserId(req);
    const err = validate(["title", "date", "time"], req.body);
    if (err) return res.status(400).json({ error: err });
    const event = await HomeEvent.create({ ...req.body, userId });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/home/events/:id", async (req, res) => {
  try {
    const event = await HomeEvent.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    await event.update(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/home/events/:id", async (req, res) => {
  try {
    const event = await HomeEvent.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    await event.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════════════════════
   FAVORITES
   ══════════════════════════════════════════ */

router.get("/home/favorites", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { type } = req.query;
    const where = { userId };
    if (type) where.itemType = type;
    const favs = await HomeFavorite.findAll({ where, order: [["createdAt", "DESC"]] });
    res.json(favs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/home/favorites", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { itemType, itemId, label } = req.body;
    const existing = await HomeFavorite.findOne({ where: { userId, itemType, itemId } });
    if (existing) return res.json(existing);
    const fav = await HomeFavorite.create({ userId, itemType, itemId, label });
    res.status(201).json(fav);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/home/favorites/:id", async (req, res) => {
  try {
    const fav = await HomeFavorite.findByPk(req.params.id);
    if (!fav) return res.status(404).json({ error: "Favorite not found" });
    await fav.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════════════════════
   VGC — Vizzy Generative Chat (reuse VizzyChat)
   ══════════════════════════════════════════ */

router.get("/home/vgc/agents", async (_req, res) => {
  res.json(HOME_AGENTS.map(a => ({
    id: a.id,
    name: a.label,
    description: a.description,
    capabilities: a.capabilities,
    tone: a.tone,
  })));
});

router.get("/home/vgc/chats", async (req, res) => {
  try {
    const userId = getUserId(req);
    const chats = await VizzyChat.findAll({ where: { userId, mode: "home" }, order: [["updatedAt", "DESC"]], attributes: ["id", "title", "activeAgent", "updatedAt", "createdAt", "isFavorited"] });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/home/vgc/chats", async (req, res) => {
  try {
    const userId = getUserId(req);
    const chat = await VizzyChat.create({ userId, title: req.body.title || "New Chat", messages: "[]", activeAgent: req.body.activeAgent || "vizzy", mode: "home" });
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/home/vgc/chats/:id", async (req, res) => {
  try {
    const chat = await VizzyChat.findByPk(req.params.id);
    if (!chat) return res.status(404).json({ error: "Chat not found" });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/home/vgc/chats/:id", async (req, res) => {
  try {
    const chat = await VizzyChat.findByPk(req.params.id);
    if (!chat) return res.status(404).json({ error: "Chat not found" });
    await chat.update(req.body);
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/home/vgc/chats/:id", async (req, res) => {
  try {
    const chat = await VizzyChat.findByPk(req.params.id);
    if (!chat) return res.status(404).json({ error: "Chat not found" });
    await VizzyAgentSession.destroy({ where: { chatId: chat.id } });
    await chat.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/home/vgc/chat", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { chatId, message, agentId } = req.body;
    if (!message) return res.status(400).json({ error: "message is required" });
    let chat;
    if (chatId) {
      chat = await VizzyChat.findByPk(chatId);
      if (!chat) return res.status(404).json({ error: "Chat not found" });
    } else {
      chat = await VizzyChat.create({ userId, title: message.slice(0, 60), activeAgent: agentId || "vizzy", mode: "home", messages: "[]" });
    }
    const msgs = JSON.parse(chat.messages || "[]");
    msgs.push({ role: "user", content: message, agentId: agentId || chat.activeAgent, timestamp: new Date().toISOString() });
    let aiReply = "I'm processing your request.";
    try {
      const result = await processAgentRequest({ userId, messages: msgs, chatId: chat.id, mode: "home", userInput: message });
      if (result.delegateToMedia) {
        aiReply = "I've identified this as a media generation request. Processing...";
      } else {
        aiReply = result.content;
        if (agentId || result.agentUsed) {
          const activeAgent = agentId || result.agentUsed;
          const [session] = await VizzyAgentSession.findOrCreate({ where: { chatId: chat.id, agentId: activeAgent }, defaults: { chatId: chat.id, userId, agentId: activeAgent, intent: result.intent, turnCount: 1 } });
          if (!session.isNewRecord) { session.turnCount += 1; await session.save(); }
        }
      }
    } catch {
      aiReply = "I encountered an issue. Please try again.";
    }
    msgs.push({ role: "assistant", content: aiReply, agentId: agentId || chat.activeAgent, timestamp: new Date().toISOString() });
    chat.messages = JSON.stringify(msgs);
    if (agentId) chat.activeAgent = agentId;
    if (!chat.title || chat.title === "New Chat") chat.title = message.slice(0, 60);
    await chat.save();
    res.json({ reply: aiReply, chatId: chat.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════════════════════
   VCC — Vizzy Conversational Canvas
   ══════════════════════════════════════════ */

router.get("/home/vcc/sessions", async (req, res) => {
  try {
    const userId = getUserId(req);
    const sessions = await HomeVCCSession.findAll({ where: { userId }, order: [["updatedAt", "DESC"]] });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/home/vcc/sessions", async (req, res) => {
  try {
    const userId = getUserId(req);
    const session = await HomeVCCSession.create({ userId, title: req.body.title || "New Canvas" });
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/home/vcc/sessions/:id", async (req, res) => {
  try {
    const session = await HomeVCCSession.findByPk(req.params.id);
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/home/vcc/sessions/:id", async (req, res) => {
  try {
    const session = await HomeVCCSession.findByPk(req.params.id);
    if (!session) return res.status(404).json({ error: "Session not found" });
    await session.update(req.body);
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/home/vcc/sessions/:id", async (req, res) => {
  try {
    const session = await HomeVCCSession.findByPk(req.params.id);
    if (!session) return res.status(404).json({ error: "Session not found" });
    await session.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/home/vcc/generate", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { sessionId, prompt, tool } = req.body;
    if (!prompt) return res.status(400).json({ error: "prompt is required" });
    let session;
    if (sessionId) {
      session = await HomeVCCSession.findByPk(sessionId);
      if (!session) return res.status(404).json({ error: "Session not found" });
    } else {
      session = await HomeVCCSession.create({ userId, title: prompt.slice(0, 60), activeTool: tool || "brush" });
    }
    let result = { description: `Canvas element generated from: "${prompt}"` };
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const ai = await model.generateContent(`You are a creative AI for a digital canvas. Generate a visual element for: "${prompt}". Tool: ${tool || "brush"}. Respond JSON: elementType (shape/text/image), description, suggestedColors (array), position (x, y, width, height).`);
        const text = ai.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) result = { ...result, ...JSON.parse(jsonMatch[0]), source: "ai" };
      } catch { /* use defaults */ }
    }
    const canvasState = JSON.parse(session.canvasState || "{}");
    const elements = canvasState.elements || [];
    elements.push({ id: `el_${Date.now()}`, ...result, createdAt: new Date().toISOString() });
    canvasState.elements = elements;
    session.canvasState = JSON.stringify(canvasState);
    await session.save();
    res.json({ success: true, element: result, sessionId: session.id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

/* ══════════════════════════════════════════
   HOME MEMBERS
   ══════════════════════════════════════════ */

router.get("/home/members", async (req, res) => {
  try {
    const userId = getUserId(req);
    const members = await HomeMember.findAll({ where: { userId }, order: [["name", "ASC"]] });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/home/members", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { name, role, avatarUrl, preferences } = req.body;
    if (!name) return res.status(400).json({ error: "name is required" });
    const member = await HomeMember.create({
      userId, name, role: role || "member",
      avatarUrl: avatarUrl || null,
      preferences: preferences ? JSON.stringify(preferences) : "{}",
    });
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/home/members/:id", async (req, res) => {
  try {
    const member = await HomeMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: "Member not found" });
    const updates = { ...req.body };
    if (updates.preferences && typeof updates.preferences === "object") {
      updates.preferences = JSON.stringify(updates.preferences);
    }
    await member.update(updates);
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/home/members/:id", async (req, res) => {
  try {
    const member = await HomeMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: "Member not found" });
    await member.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════════════════════
   SETTINGS
   ══════════════════════════════════════════ */

router.get("/home/settings", async (req, res) => {
  try {
    const userId = getUserId(req);
    let settings = await HomeSetting.findAll({ where: { userId } });
    if (settings.length === 0) {
      const seed = [
        { section: "home_preferences", key: "default_view", value: "drawing-room", valueType: "select" },
        { section: "home_preferences", key: "auto_rotate", value: "true", valueType: "boolean" },
        { section: "home_preferences", key: "collection_duration", value: "30", valueType: "number" },
        { section: "home_preferences", key: "daily_schedule_active", value: "true", valueType: "boolean" },
        { section: "vizzy_preferences", key: "default_art_style", value: "Impressionist", valueType: "select" },
        { section: "vizzy_preferences", key: "color_temperature", value: "Warm", valueType: "select" },
        { section: "vizzy_preferences", key: "auto_generate", value: "true", valueType: "boolean" },
        { section: "notifications", key: "event_reminders", value: "true", valueType: "boolean" },
        { section: "notifications", key: "new_content_alerts", value: "true", valueType: "boolean" },
        { section: "display", key: "dark_mode", value: "false", valueType: "boolean" },
        { section: "display", key: "animation_speed", value: "Normal", valueType: "select" },
      ];
      settings = await HomeSetting.bulkCreate(seed.map(s => ({ ...s, userId })));
    }
    const grouped = {};
    for (const s of settings) {
      if (!grouped[s.section]) grouped[s.section] = {};
      grouped[s.section][s.key] = s.valueType === "boolean" ? s.value === "true" : s.value;
    }
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/home/settings", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { section, settings } = req.body;
    if (!section || !settings) return res.status(400).json({ error: "section and settings object required" });
    for (const [key, value] of Object.entries(settings)) {
      const valueType = typeof value === "boolean" ? "boolean" : typeof value === "number" ? "number" : "string";
      await HomeSetting.upsert({ userId, section, key, value: String(value), valueType, id: undefined });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════════════════════
   CURATIONS / EXPLORE LIBRARY
   ══════════════════════════════════════════ */

router.get("/home/curations", async (req, res) => {
  try {
    const type = req.query.type || "all";
    const vizzyCurations = [
      { title: "Morning Serenity", desc: "Calm, bright artworks for morning display", items: 12, cover: "/images/webapp/nature_garden.png" },
      { title: "Evening Ambiance", desc: "Warm tones for evening relaxation", items: 15, cover: "/images/webapp/figma/abstract-wave-wide.jpg" },
      { title: "Weekend Vibes", desc: "Bold and vibrant for weekend enjoyment", items: 10, cover: "/images/webapp/vibrant_face_art.png" },
    ];
    const deckovizCurations = [
      { title: "Nature Collection", desc: "Calming nature scenes", items: 24, cover: "/images/webapp/nature_garden.png" },
      { title: "Abstract Dreams", desc: "Vibrant abstract art", items: 18, cover: "/images/webapp/abstract_landscape.png" },
      { title: "Minimalist", desc: "Clean minimal artwork", items: 16, cover: "/images/webapp/minimalistic_night.png" },
    ];
    if (type === "vizzy") return res.json(vizzyCurations);
    if (type === "deckoviz") return res.json(deckovizCurations);
    res.json({ vizzy: vizzyCurations, deckoviz: deckovizCurations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/home/library", async (req, res) => {
  try {
    res.json({
      art: [
        { title: "Renaissance Revival", count: 120, cover: "/images/webapp/figma/spiral-ocean.jpg" },
        { title: "Pop Art", count: 85, cover: "/images/webapp/vibrant_face_art.png" },
        { title: "Surrealist Dreams", count: 92, cover: "/images/webapp/figma/abstract-wave-wide.jpg" },
      ],
      photos: [
        { title: "Nature Landscapes", count: 340, cover: "/images/webapp/nature_garden.png" },
        { title: "Urban Architecture", count: 200, cover: "/images/webapp/city_fire_reflection.png" },
      ],
      posters: [
        { title: "Motivational Quotes", count: 75, cover: "/images/webapp/figma/violin-art.jpg" },
        { title: "Event Templates", count: 44, cover: "/images/webapp/figma/interior-tech.jpg" },
      ],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════════════════════
   MUSIC LIBRARY
   ══════════════════════════════════════════ */

router.get("/home/music", async (req, res) => {
  try {
    res.json([
      { title: "Soft Rain Ambiance", artist: "Deckoviz Sounds", duration: "8:30", category: "Nature" },
      { title: "Grand Piano Lounge", artist: "Deckoviz Music", duration: "5:15", category: "Piano" },
      { title: "Forest Birds Dawn", artist: "Deckoviz Sounds", duration: "10:45", category: "Nature" },
      { title: "Smooth Jazz Evening", artist: "Deckoviz Music", duration: "6:20", category: "Jazz" },
      { title: "Ocean Waves Sunset", artist: "Deckoviz Sounds", duration: "9:10", category: "Nature" },
      { title: "Classical Strings", artist: "Deckoviz Music", duration: "4:58", category: "Classical" },
      { title: "Urban Night Lo-fi", artist: "Deckoviz Music", duration: "7:30", category: "Lo-fi" },
    ]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ══════════════════════════════════════════
   PROMPT SUGGESTIONS
   ══════════════════════════════════════════ */

router.get("/home/prompts/suggestions", async (_req, res) => {
  res.json({
    explore: [
      "A serene Japanese garden at dawn with gentle mist",
      "Abstract oil painting with bold brushstrokes in deep blues",
      "Watercolor botanical illustration of tropical flowers",
      "Minimalist geometric composition with pastel gradients",
      "Impressionist sunset over rolling lavender fields",
    ],
  });
});

export default router;
