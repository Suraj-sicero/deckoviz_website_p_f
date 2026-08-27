import { WebSocketServer } from "ws";
import { URL } from "url";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import DeviceRegistration from "../models/DeviceRegistration.js";
import { Collection, CollectionItem } from "../models/Collection.js";
import UploadedMedia from "../models/UploadedMedia.js";
import { sequelize } from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key_here";
const MAX_MESSAGE_SIZE = 1024 * 1024; // 1MB
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 100; // messages per window

// ── Connection Store ──────────────────────────────────────────────────────────
// userId → Map<appInstanceId|clientType, { ws, clientType, appInstanceId }>
const connections = new Map();

// ── Rate Limiter ──────────────────────────────────────────────────────────────
const rateLimits = new Map(); // userId → { count, resetAt }

function checkRateLimit(userId) {
  const now = Date.now();
  const limit = rateLimits.get(userId);
  if (!limit || now > limit.resetAt) {
    rateLimits.set(userId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  limit.count++;
  return limit.count <= RATE_LIMIT_MAX;
}

// ── JWT Verification ──────────────────────────────────────────────────────────
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// ── Send JSON to a WebSocket ──────────────────────────────────────────────────
function sendJSON(ws, data) {
  if (ws.readyState === 1) {
    ws.send(JSON.stringify(data));
  }
}

// ── Build & send standard messages ────────────────────────────────────────────
function sendConnected(ws, clientType, userId, appInstanceId) {
  sendJSON(ws, {
    protocol_version: 1,
    message_id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    action: "connected",
    payload: { client_type: clientType, user_id: userId, app_instance_id: appInstanceId, server_time: new Date().toISOString() },
  });
}

function sendAcknowledgement(ws, referenceMessageId, status = "success") {
  sendJSON(ws, {
    protocol_version: 1,
    message_id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    action: "acknowledgement",
    payload: { reference_message_id: referenceMessageId, status },
  });
}

function sendError(ws, referenceMessageId, reason) {
  sendJSON(ws, {
    protocol_version: 1,
    message_id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    action: "error",
    payload: { reference_message_id: referenceMessageId, status: "failed", reason },
  });
}

// ── Route a message to target TV(s) ──────────────────────────────────────────
function routeToTarget(userId, targetAppInstanceId, message) {
  const userConns = connections.get(userId);
  if (!userConns) return;

  let sent = false;
  for (const [key, conn] of userConns) {
    if (conn.clientType !== "tv") continue;
    if (targetAppInstanceId && conn.appInstanceId !== targetAppInstanceId) continue;
    sendJSON(conn.ws, message);
    sent = true;
  }
  return sent;
}

// ── Send devices_list to a browser ───────────────────────────────────────────
async function sendDevicesList(userId, ws) {
  try {
    let devices = [];
    try {
      devices = await DeviceRegistration.findAll({ where: { userId } });
    } catch (dbErr) {
      console.error("[WS] devices_list DB query failed, using in-memory only:", dbErr.message);
    }
    const dbAppIds = new Set(devices.map(d => d.appInstanceId));

    // Start with DB-registered devices
    const liveDevices = devices.map((d) => {
      const dj = d.toJSON();
      const userConns = connections.get(userId);
      const isOnline = userConns ? [...userConns.values()].some(
        (c) => c.clientType === "tv" && c.appInstanceId === dj.appInstanceId
      ) : false;
      return {
        app_instance_id: dj.appInstanceId,
        device_name: dj.deviceName,
        platform: dj.platform,
        status: isOnline ? "online" : "offline",
        last_seen: dj.lastSeen,
        current_artwork: dj.currentArtwork,
        playback_state: dj.playbackState,
      };
    });

    // Also include in-memory TV connections not in DB (e.g. TV connected via WS but never registered via HTTP)
    const userConns = connections.get(userId);
    if (userConns) {
      for (const [key, conn] of userConns) {
        if (conn.clientType === "tv" && conn.appInstanceId && !dbAppIds.has(conn.appInstanceId)) {
          liveDevices.push({
            app_instance_id: conn.appInstanceId,
            device_name: "TV Device",
            platform: "unknown",
            status: "online",
            last_seen: new Date().toISOString(),
            current_artwork: null,
            playback_state: "playing",
          });
        }
      }
    }

    sendJSON(ws, {
      protocol_version: 1,
      message_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action: "devices_list",
      payload: { devices: liveDevices },
    });
  } catch (err) {
    console.error("[WS] Failed to send devices_list:", err.message);
  }
}

// ── Notify browsers when a TV goes offline ────────────────────────────────────
function notifyBrowsersDeviceOffline(userId, appInstanceId) {
  const userConns = connections.get(userId);
  if (!userConns) return;
  for (const [key, conn] of userConns) {
    if (conn.clientType === "browser") {
      sendJSON(conn.ws, {
        protocol_version: 1,
        message_id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        action: "device_offline",
        payload: { app_instance_id: appInstanceId },
      });
    }
  }
}

// ── Resolve collection items with media URLs ──────────────────────────────────
async function resolveCollection(collectionId, userId) {
  const collection = await Collection.findByPk(collectionId);
  if (!collection || collection.userId !== userId) return null;

  const colItems = await CollectionItem.findAll({ where: { collectionId: collection.id } });

  const items = [];
  for (const item of colItems) {
    let mediaUrl = null;
    let fileName = null;
    let mediaType = null;
    if (item.itemType === "upload" || item.itemType === "image") {
      const media = await UploadedMedia.findByPk(item.itemId);
      if (media) {
        mediaUrl = media.url || media.mediaUrl;
        fileName = media.fileName;
        mediaType = media.mediaType;
      }
    } else {
      mediaUrl = item.itemId; // might be a direct URL
    }
    items.push({
      id: item.id,
      itemType: item.itemType,
      itemId: item.itemId,
      mediaUrl,
      fileName,
      mediaType,
    });
  }
  return {
    collection_id: collection.id,
    name: collection.name,
    description: collection.description,
    items,
    item_count: items.length,
  };
}

// ═════════════════════════════════════════════════════════════════════════════
// ACTION HANDLERS — Browser → TV
// ═════════════════════════════════════════════════════════════════════════════

const ACTION_HANDLERS = {
  display_artwork: async (userId, payload, targetAppInstanceId) => {
    const message = {
      protocol_version: 1,
      message_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action: "display_artwork",
      target: targetAppInstanceId ? { app_instance_id: targetAppInstanceId } : undefined,
      payload: {
        artwork_id: payload.artwork_id,
        cdn_url: payload.cdn_url,
        transition: payload.transition || "fade",
        duration: payload.duration || 5000,
      },
    };
    return routeToTarget(userId, targetAppInstanceId, message);
  },

  display_collection: async (userId, payload, targetAppInstanceId) => {
    const resolved = await resolveCollection(payload.collection_id, userId);
    if (!resolved) return false;
    const message = {
      protocol_version: 1,
      message_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action: "display_collection",
      target: targetAppInstanceId ? { app_instance_id: targetAppInstanceId } : undefined,
      payload: {
        ...resolved,
        transition: payload.transition || "fade",
        duration: payload.duration || 5000,
      },
    };
    return routeToTarget(userId, targetAppInstanceId, message);
  },

  queue_collection: async (userId, payload, targetAppInstanceId) => {
    const message = {
      protocol_version: 1,
      message_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action: "queue_collection",
      target: targetAppInstanceId ? { app_instance_id: targetAppInstanceId } : undefined,
      payload: { collection_id: payload.collection_id, position: payload.position || "end" },
    };
    return routeToTarget(userId, targetAppInstanceId, message);
  },

  replace_queue: async (userId, payload, targetAppInstanceId) => {
    const message = {
      protocol_version: 1,
      message_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action: "replace_queue",
      target: targetAppInstanceId ? { app_instance_id: targetAppInstanceId } : undefined,
      payload: { collections: payload.collections || [] },
    };
    return routeToTarget(userId, targetAppInstanceId, message);
  },

  remove_collection: async (userId, payload, targetAppInstanceId) => {
    const message = {
      protocol_version: 1,
      message_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action: "remove_collection",
      target: targetAppInstanceId ? { app_instance_id: targetAppInstanceId } : undefined,
      payload: { collection_id: payload.collection_id },
    };
    return routeToTarget(userId, targetAppInstanceId, message);
  },

  display_image: async (userId, payload, targetAppInstanceId) => {
    const message = {
      protocol_version: 1,
      message_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action: "display_image",
      target: targetAppInstanceId ? { app_instance_id: targetAppInstanceId } : undefined,
      payload: {
        url: payload.url,
        duration: payload.duration || 5000,
        transition: payload.transition || "fade",
      },
    };
    return routeToTarget(userId, targetAppInstanceId, message);
  },

  change_mood: async (userId, payload, targetAppInstanceId) => {
    const message = {
      protocol_version: 1,
      message_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action: "change_mood",
      target: targetAppInstanceId ? { app_instance_id: targetAppInstanceId } : undefined,
      payload: { mood: payload.mood },
    };
    return routeToTarget(userId, targetAppInstanceId, message);
  },

  change_theme: async (userId, payload, targetAppInstanceId) => {
    const message = {
      protocol_version: 1,
      message_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action: "change_theme",
      target: targetAppInstanceId ? { app_instance_id: targetAppInstanceId } : undefined,
      payload: { theme: payload.theme },
    };
    return routeToTarget(userId, targetAppInstanceId, message);
  },

  start_slideshow: async (userId, payload, targetAppInstanceId) => {
    const message = {
      protocol_version: 1,
      message_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action: "start_slideshow",
      target: targetAppInstanceId ? { app_instance_id: targetAppInstanceId } : undefined,
      payload: {
        collection_id: payload.collection_id,
        interval: payload.interval || 10000,
        transition: payload.transition || "fade",
      },
    };
    return routeToTarget(userId, targetAppInstanceId, message);
  },

  pause: async (userId, payload, targetAppInstanceId) => {
    const message = {
      protocol_version: 1,
      message_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action: "pause",
      target: targetAppInstanceId ? { app_instance_id: targetAppInstanceId } : undefined,
      payload: {},
    };
    return routeToTarget(userId, targetAppInstanceId, message);
  },

  resume: async (userId, payload, targetAppInstanceId) => {
    const message = {
      protocol_version: 1,
      message_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action: "resume",
      target: targetAppInstanceId ? { app_instance_id: targetAppInstanceId } : undefined,
      payload: {},
    };
    return routeToTarget(userId, targetAppInstanceId, message);
  },

  skip: async (userId, payload, targetAppInstanceId) => {
    const message = {
      protocol_version: 1,
      message_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action: "skip",
      target: targetAppInstanceId ? { app_instance_id: targetAppInstanceId } : undefined,
      payload: {},
    };
    return routeToTarget(userId, targetAppInstanceId, message);
  },

  refresh_config: async (userId, payload, targetAppInstanceId) => {
    const message = {
      protocol_version: 1,
      message_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action: "refresh_config",
      target: targetAppInstanceId ? { app_instance_id: targetAppInstanceId } : undefined,
      payload: {},
    };
    return routeToTarget(userId, targetAppInstanceId, message);
  },

  synchronize_device: async (userId, payload, targetAppInstanceId) => {
    const message = {
      protocol_version: 1,
      message_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action: "synchronize_device",
      target: targetAppInstanceId ? { app_instance_id: targetAppInstanceId } : undefined,
      payload: {},
    };
    return routeToTarget(userId, targetAppInstanceId, message);
  },

  // ── TV → Backend Actions ──────────────────────────────────────────────────

  heartbeat: async (userId, payload, targetAppInstanceId, tvAppInstanceId) => {
    try {
      await DeviceRegistration.update(
        {
          lastSeen: new Date(),
          status: "online",
          currentArtwork: payload.current_artwork || null,
          currentCollection: payload.current_collection || null,
          playbackState: payload.playback_state || "stopped",
          networkQuality: payload.network_quality || null,
          cacheStatus: payload.cache_status || null,
          availableStorage: payload.available_storage || null,
        },
        { where: { userId, appInstanceId: tvAppInstanceId } }
      );
    } catch (err) {
      console.error("[WS] Heartbeat DB update failed:", err.message);
    }
    return { status: "success" };
  },

  register_device: async (userId, payload, targetAppInstanceId, tvAppInstanceId) => {
    try {
      const [device, created] = await DeviceRegistration.findOrCreate({
        where: { userId, appInstanceId: tvAppInstanceId },
        defaults: {
          userId,
          appInstanceId: tvAppInstanceId,
          deviceId: payload.device_id || null,
          deviceName: payload.device_name || "Deckoviz TV",
          platform: payload.platform || null,
          platformVersion: payload.platform_version || null,
          appVersion: payload.app_version || null,
          lastSeen: new Date(),
          status: "online",
        },
      });
      if (!created) {
        await device.update({
          deviceId: payload.device_id || device.deviceId,
          deviceName: payload.device_name || device.deviceName,
          platform: payload.platform || device.platform,
          platformVersion: payload.platform_version || device.platformVersion,
          appVersion: payload.app_version || device.appVersion,
          lastSeen: new Date(),
          status: "online",
        });
      }
    } catch (err) {
      console.error("[WS] register_device failed:", err.message);
      return { status: "failed", reason: err.message };
    }
    return { status: "success" };
  },
};

// ═════════════════════════════════════════════════════════════════════════════
// MAIN GATEWAY
// ═════════════════════════════════════════════════════════════════════════════

// ═════════════════════════════════════════════════════════════════════════════
// HTTP HELPER EXPORTS (for deviceRoutes)
// ═════════════════════════════════════════════════════════════════════════════

export function getConnectedDevices(userId) {
  const userConns = connections.get(userId);
  if (!userConns) return [];
  const result = [];
  for (const [key, conn] of userConns) {
    if (conn.clientType !== "tv") continue;
    result.push({
      app_instance_id: conn.appInstanceId,
      status: "online",
      last_seen: new Date().toISOString(),
      current_artwork: null,
      current_collection: null,
      playback_state: "playing",
      network_quality: null,
    });
  }
  return result;
}

export function sendToDeviceById(userId, appInstanceId, action, payload) {
  const userConns = connections.get(userId);
  if (!userConns) return false;
  for (const [key, conn] of userConns) {
    if (conn.clientType === "tv" && conn.appInstanceId === appInstanceId) {
      sendJSON(conn.ws, {
        protocol_version: 1,
        message_id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        action,
        target: { app_instance_id: appInstanceId },
        payload,
      });
      return true;
    }
  }
  return false;
}

export function initializeWebSocketServer(server) {
  const wss = new WebSocketServer({ noServer: true });

  // ── HTTP Upgrade Handling ────────────────────────────────────────────────
  // Accepted paths:
  //   /ws/browser?token=<jwt>                          → browser client
  //   /ws/tv?token=<jwt>&app_instance_id=<uuid>        → TV client
  //   /ws/<uuid>?token=<jwt>                           → legacy TV client (backward compat)
  server.on("upgrade", (request, socket, head) => {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const pathname = url.pathname;
    const token = url.searchParams.get("token");

    const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    // ── Resolve path → (clientType, appInstanceId) ───────────────────────
    let clientType;
    let appInstanceId = null;

    if (pathname === "/ws/browser") {
      clientType = "browser";
    } else if (pathname === "/ws/tv") {
      clientType = "tv";
      appInstanceId = url.searchParams.get("app_instance_id") || null;
    } else {
      // Legacy: /ws/<uuid> → treat as TV
      const maybeUuid = pathname.replace(/^\/ws\//, "");
      if (UUID_RE.test(maybeUuid)) {
        clientType = "tv";
        appInstanceId = maybeUuid;
        console.log(`[WS] Legacy path detected: ${pathname} → treating as /ws/tv?app_instance_id=${appInstanceId}`);
      } else {
        socket.destroy();
        return;
      }
    }

    console.log(`[WS] Upgrade request: path=${pathname} clientType=${clientType}${appInstanceId ? ` appInstanceId=${appInstanceId}` : ""}`);

    // ── Auth ─────────────────────────────────────────────────────────────
    if (!token) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    const user = verifyToken(token);
    if (!user) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    if (clientType === "tv" && !appInstanceId) {
      socket.write("HTTP/1.1 400 Bad Request\r\n\r\n");
      socket.destroy();
      return;
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
      ws._userId = user.id;
      ws._clientType = clientType;
      ws._appInstanceId = appInstanceId;
      wss.emit("connection", ws, request);
    });
  });

  // ── Connection Handler ──────────────────────────────────────────────────
  wss.on("connection", async (ws, request) => {
    const userId = ws._userId;
    const clientType = ws._clientType;
    const appInstanceId = ws._appInstanceId;

    console.log(`[WS] ${clientType} connected: userId=${userId}${appInstanceId ? ` appInstanceId=${appInstanceId}` : ""}`);

    // Register connection
    if (!connections.has(userId)) {
      connections.set(userId, new Map());
    }
    const connKey = clientType === "tv" ? appInstanceId : "browser";
    connections.get(userId).set(connKey, { ws, clientType, appInstanceId });

    // ── Message Handler (MUST be registered before any async work) ─────────
    ws.on("message", async (raw) => {
      // Rate limit check
      if (!checkRateLimit(userId)) {
        sendError(ws, null, "Rate limit exceeded. Max 100 messages per minute.");
        return;
      }

      // Size check
      if (raw.length > MAX_MESSAGE_SIZE) {
        sendError(ws, null, "Message too large. Maximum 1MB.");
        return;
      }

      let message;
      try {
        message = JSON.parse(raw.toString());
      } catch {
        sendError(ws, null, "Invalid JSON.");
        return;
      }

      const { action, target, payload, message_id } = message;
      if (!action) {
        sendError(ws, message_id, "Missing 'action' field.");
        return;
      }

      const targetAppInstanceId = target?.app_instance_id || appInstanceId;

      console.log(`[WS] ${clientType} action: ${action} (from userId=${userId})`);

      try {
        const handler = ACTION_HANDLERS[action];
        if (!handler) {
          sendError(ws, message_id, `Unknown action: ${action}`);
          return;
        }

        const result = await handler(userId, payload || {}, targetAppInstanceId, appInstanceId);

        if (result && result.status === "failed") {
          sendError(ws, message_id, result.reason || "Action failed");
        } else {
          sendAcknowledgement(ws, message_id, "success");
        }
      } catch (err) {
        console.error(`[WS] Action handler error (${action}):`, err.message);
        sendError(ws, message_id, err.message || "Internal server error");
      }
    });

    // ── Disconnect Handler ────────────────────────────────────────────────
    ws.on("close", async () => {
      console.log(`[WS] ${clientType} disconnected: userId=${userId}${appInstanceId ? ` appInstanceId=${appInstanceId}` : ""}`);

      // Remove from connections
      const userConns = connections.get(userId);
      if (userConns) {
        userConns.delete(connKey);
        if (userConns.size === 0) connections.delete(userId);
      }

      // If TV, update status and notify browsers
      if (clientType === "tv" && appInstanceId) {
        try {
          await DeviceRegistration.update(
            { status: "offline", lastSeen: new Date() },
            { where: { userId, appInstanceId } }
          );
        } catch (err) {
          console.error("[WS] Failed to update device offline:", err.message);
        }
        notifyBrowsersDeviceOffline(userId, appInstanceId);
        // Also send refreshed devices_list so browsers see the TV as gone
        const remainingConns = connections.get(userId);
        if (remainingConns) {
          for (const [key, conn] of remainingConns) {
            if (conn.clientType === "browser") {
              await sendDevicesList(userId, conn.ws);
            }
          }
        }
      }
    });

    // ── Error Handler ─────────────────────────────────────────────────────
    ws.on("error", (err) => {
      console.error(`[WS] Error (userId=${userId}):`, err.message);
    });

    // ── Post-connect async work (handlers already registered, safe to await) ──
    // Send connected confirmation
    sendConnected(ws, clientType, userId, appInstanceId);

    // If browser, send devices list
    if (clientType === "browser") {
      await sendDevicesList(userId, ws);
    }

    // If TV, update device status to online and notify all browsers
    if (clientType === "tv" && appInstanceId) {
      try {
        await DeviceRegistration.update(
          { status: "online", lastSeen: new Date() },
          { where: { userId, appInstanceId } }
        );
      } catch (err) {
        console.error("[WS] Failed to update device status:", err.message);
      }
      // Notify all browsers of updated device list
      const userConns = connections.get(userId);
      if (userConns) {
        for (const [key, conn] of userConns) {
          if (conn.clientType === "browser") {
            await sendDevicesList(userId, conn.ws);
          }
        }
      }
    }
  });

  console.log("✅ WebSocket gateway initialized on /ws/* (browser, tv, legacy /ws/<uuid>)");
  return wss;
}
