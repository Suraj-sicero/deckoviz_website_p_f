// routes/dailyCuratorRoutes.js
// 🗓️ Daily Curator — admins build per-user daily curations; users read them.
import express from "express";
import { Op } from "sequelize";
import {
  UserDailyCuration,
  DAILY_CURATION_ITEM_TYPES,
} from "../models/UserDailyCuration.js";
import DeckovizCuration from "../models/DeckovizCuration.js";
import { Collection } from "../models/Collection.js";
import { User } from "../models/User.js";
import { MusicAttachment } from "../models/MusicAttachment.js";
import { MusicTrack } from "../models/MediaTracks.js";
import { authenticateUser, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Today's date as YYYY-MM-DD (matches DATEONLY storage).
const todayStr = () => new Date().toISOString().slice(0, 10);

// 🔔 Called whenever an admin changes a user's curation.
// 1) Bumps User.curationUpdatedAt so the mobile app's pull/refresh can detect
//    a change cheaply via GET /me/status (works for adds, edits AND deletes).
// 2) If MOBILE_WEBHOOK_URL is configured, fires an outbound webhook so an
//    external service (push relay, mobile backend, automation) can react.
// Best-effort: never throws into the request path.
async function notifyCurationChanged(userId, change) {
  const now = new Date();
  try {
    await User.update({ curationUpdatedAt: now }, { where: { id: userId } });
  } catch (err) {
    console.error("⚠️ notifyCurationChanged: failed to bump timestamp:", err.message);
  }

  const url = process.env.MOBILE_WEBHOOK_URL;
  if (!url) return; // webhook disabled — pull-based refresh still works
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.MOBILE_WEBHOOK_SECRET
          ? { "X-Webhook-Secret": process.env.MOBILE_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify({
        event: "daily_curation.updated",
        userId,
        updatedAt: now.toISOString(),
        ...change, // { action, displayDate, itemType?, itemId? }
      }),
    });
  } catch (err) {
    console.error("⚠️ notifyCurationChanged: webhook POST failed:", err.message);
  }
}

// Daily itemType -> the targetType used by MusicAttachment (Feature 1).
const musicTargetTypeFor = (itemType) =>
  itemType === "artwork" ? "curation" : "collection";

// Hydrate a list of UserDailyCuration rows with their real artwork/collection
// data and any music the recipient attached to them.
async function hydrateItems(items, userId) {
  const artworkIds = items
    .filter((i) => i.itemType === "artwork")
    .map((i) => i.itemId);
  const collectionIds = items
    .filter((i) => i.itemType === "collection")
    .map((i) => i.itemId);

  const [artworks, collections, attachments] = await Promise.all([
    artworkIds.length
      ? DeckovizCuration.findAll({ where: { id: artworkIds } })
      : [],
    collectionIds.length
      ? Collection.findAll({ where: { id: collectionIds } })
      : [],
    userId ? MusicAttachment.findAll({ where: { userId } }) : [],
  ]);

  const artworkById = Object.fromEntries(artworks.map((a) => [a.id, a]));
  const collectionById = Object.fromEntries(collections.map((c) => [c.id, c]));

  // Map music attachments by "targetType:targetId" for quick lookup.
  const attByKey = {};
  for (const a of attachments) attByKey[`${a.targetType}:${a.targetId}`] = a;
  const trackIds = [...new Set(attachments.map((a) => a.musicTrackId))];
  const tracks = trackIds.length
    ? await MusicTrack.findAll({ where: { id: trackIds } })
    : [];
  const trackById = Object.fromEntries(tracks.map((t) => [t.id, t]));

  return items.map((i) => {
    const data =
      i.itemType === "artwork" ? artworkById[i.itemId] : collectionById[i.itemId];
    const att = attByKey[`${musicTargetTypeFor(i.itemType)}:${i.itemId}`];
    return {
      ...i.toJSON(),
      data: data || null,
      music: att ? trackById[att.musicTrackId] || null : null,
    };
  });
}

// ============================================================
// ADMIN ENDPOINTS
// ============================================================

// GET /admin/users?search= — pick a user to curate for
router.get("/admin/users", requireAdmin, async (req, res) => {
  try {
    const where = {};
    if (req.query.search) {
      where.email = { [Op.iLike]: `%${req.query.search}%` };
    }
    const users = await User.findAll({
      where,
      attributes: ["id", "email", "tier", "isAdmin", "createdAt"],
      order: [["createdAt", "DESC"]],
      limit: 50,
    });
    res.json({ users });
  } catch (err) {
    console.error("❌ admin/users:", err);
    res.status(500).json({ error: "Failed to list users" });
  }
});

// GET /admin/library — artworks + collections an admin can assign
router.get("/admin/library", requireAdmin, async (req, res) => {
  try {
    const [artworks, collections] = await Promise.all([
      DeckovizCuration.findAll({
        order: [["displayOrder", "ASC"], ["createdAt", "DESC"]],
      }),
      Collection.findAll({ order: [["createdAt", "DESC"]], limit: 200 }),
    ]);
    res.json({ artworks, collections });
  } catch (err) {
    console.error("❌ admin/library:", err);
    res.status(500).json({ error: "Failed to load library" });
  }
});

// GET /admin/users/:userId/items?date= — view a user's curation
router.get("/admin/users/:userId/items", requireAdmin, async (req, res) => {
  try {
    const displayDate = req.query.date || todayStr();
    const items = await UserDailyCuration.findAll({
      where: { userId: req.params.userId, displayDate },
      order: [["order", "ASC"], ["createdAt", "ASC"]],
    });
    const hydrated = await hydrateItems(items, req.params.userId);
    res.json({ displayDate, items: hydrated });
  } catch (err) {
    console.error("❌ admin/users/:userId/items:", err);
    res.status(500).json({ error: "Failed to load user's curation" });
  }
});

// POST /admin/items — add an item to a user's curation
// body: { userId, itemType, itemId, displayDate?, order? }
router.post("/admin/items", requireAdmin, async (req, res) => {
  try {
    const { userId, itemType, itemId } = req.body;
    const displayDate = req.body.displayDate || todayStr();
    const order = Number.isInteger(req.body.order) ? req.body.order : 0;

    if (!userId || !itemType || !itemId) {
      return res
        .status(400)
        .json({ error: "userId, itemType and itemId are required" });
    }
    if (!DAILY_CURATION_ITEM_TYPES.includes(itemType)) {
      return res.status(400).json({
        error: `Invalid itemType. Must be one of: ${DAILY_CURATION_ITEM_TYPES.join(", ")}`,
      });
    }

    // Validate the recipient and the referenced item exist.
    const recipient = await User.findByPk(userId);
    if (!recipient) return res.status(404).json({ error: "User not found" });

    const exists =
      itemType === "artwork"
        ? await DeckovizCuration.findByPk(itemId)
        : await Collection.findByPk(itemId);
    if (!exists) return res.status(404).json({ error: `${itemType} not found` });

    const [item, created] = await UserDailyCuration.findOrCreate({
      where: { userId, displayDate, itemType, itemId },
      defaults: { order, addedBy: req.adminUser.id },
    });
    if (!created) {
      // Already present for that day — just refresh the order.
      item.order = order;
      await item.save();
    }

    await notifyCurationChanged(userId, {
      action: created ? "added" : "updated",
      displayDate,
      itemType,
      itemId,
    });

    res.json({ success: true, created, item });
  } catch (err) {
    console.error("❌ admin/items POST:", err);
    res.status(500).json({ error: "Failed to add item" });
  }
});

// PATCH /admin/items/:id — update order or displayDate
router.patch("/admin/items/:id", requireAdmin, async (req, res) => {
  try {
    const item = await UserDailyCuration.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (Number.isInteger(req.body.order)) item.order = req.body.order;
    if (req.body.displayDate) item.displayDate = req.body.displayDate;
    await item.save();

    await notifyCurationChanged(item.userId, {
      action: "reordered",
      displayDate: item.displayDate,
      itemType: item.itemType,
      itemId: item.itemId,
    });

    res.json({ success: true, item });
  } catch (err) {
    console.error("❌ admin/items PATCH:", err);
    res.status(500).json({ error: "Failed to update item" });
  }
});

// DELETE /admin/items/:id — remove an item from a user's curation
router.delete("/admin/items/:id", requireAdmin, async (req, res) => {
  try {
    // Look up the row first so we know whose curation to mark as changed.
    const item = await UserDailyCuration.findByPk(req.params.id);
    const removed = await UserDailyCuration.destroy({
      where: { id: req.params.id },
    });

    if (item) {
      await notifyCurationChanged(item.userId, {
        action: "removed",
        displayDate: item.displayDate,
        itemType: item.itemType,
        itemId: item.itemId,
      });
    }

    res.json({ success: true, removed });
  } catch (err) {
    console.error("❌ admin/items DELETE:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

// ============================================================
// USER ENDPOINTS
// ============================================================

// GET /me?date= — the signed-in user's daily curation (hydrated, grouped)
router.get("/me", authenticateUser, async (req, res) => {
  try {
    const displayDate = req.query.date || todayStr();
    const items = await UserDailyCuration.findAll({
      where: { userId: req.user.id, displayDate },
      order: [["order", "ASC"], ["createdAt", "ASC"]],
    });
    const hydrated = await hydrateItems(items, req.user.id);

    const me = await User.findByPk(req.user.id, {
      attributes: ["curationUpdatedAt"],
    });

    res.json({
      displayDate,
      curationUpdatedAt: me?.curationUpdatedAt || null,
      artworks: hydrated.filter((i) => i.itemType === "artwork"),
      collections: hydrated.filter((i) => i.itemType === "collection"),
    });
  } catch (err) {
    console.error("❌ daily-curator/me:", err);
    res.status(500).json({ error: "Failed to load your daily curation" });
  }
});

// GET /me/status?date= — lightweight poll signal for the mobile app.
// Returns when this user's curation last changed + today's item count, so the
// app can cheaply decide whether to refetch the full /me payload.
router.get("/me/status", authenticateUser, async (req, res) => {
  try {
    const displayDate = req.query.date || todayStr();
    const [me, count] = await Promise.all([
      User.findByPk(req.user.id, { attributes: ["curationUpdatedAt"] }),
      UserDailyCuration.count({
        where: { userId: req.user.id, displayDate },
      }),
    ]);
    res.json({
      displayDate,
      curationUpdatedAt: me?.curationUpdatedAt || null,
      count,
    });
  } catch (err) {
    console.error("❌ daily-curator/me/status:", err);
    res.status(500).json({ error: "Failed to load status" });
  }
});

// POST /me/items/:id/seen — mark one of my curation items as seen
router.post("/me/items/:id/seen", authenticateUser, async (req, res) => {
  try {
    const item = await UserDailyCuration.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (!item.seenAt) {
      item.seenAt = new Date();
      await item.save();
    }
    res.json({ success: true, item });
  } catch (err) {
    console.error("❌ daily-curator/me/seen:", err);
    res.status(500).json({ error: "Failed to mark seen" });
  }
});

export default router;
