import { Router } from "express";
import DeviceRegistration from "../models/DeviceRegistration.js";
import { getConnectedDevices, sendToDeviceById } from "../websocket/gateway.js";
import { v4 as uuidv4 } from "uuid";
import { authenticateUser } from "../middleware/auth.js";

const router = Router();

router.use(authenticateUser);

// ── GET /api/devices — List all registered devices ───────────────────────────
router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const devices = await DeviceRegistration.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    // Merge live connection status
    const liveDevices = getConnectedDevices(userId);
    const liveMap = {};
    for (const d of liveDevices) {
      liveMap[d.app_instance_id] = d;
    }

    const result = devices.map((d) => {
      const live = liveMap[d.appInstanceId] || {};
      return {
        id: d.id,
        app_instance_id: d.appInstanceId,
        device_id: d.deviceId,
        device_name: d.deviceName,
        platform: d.platform,
        platform_version: d.platformVersion,
        app_version: d.appVersion,
        status: live.status || d.status,
        last_seen: live.last_seen || d.lastSeen,
        current_artwork: live.current_artwork || d.currentArtwork,
        current_collection: live.current_collection || d.currentCollection,
        playback_state: live.playback_state || d.playbackState,
        network_quality: live.network_quality || d.networkQuality,
        cache_status: live.cacheStatus,
        available_storage: live.available_storage || d.availableStorage,
        created_at: d.createdAt,
        updated_at: d.updatedAt,
      };
    });

    res.json(result);
  } catch (err) {
    console.error("GET /devices error:", err);
    res.status(500).json({ error: "Failed to fetch devices" });
  }
});

// ── POST /api/devices — Register a new device ────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const { app_instance_id, device_id, device_name, platform, platform_version, app_version } = req.body;

    if (!app_instance_id) {
      return res.status(400).json({ error: "app_instance_id is required" });
    }

    const [device, created] = await DeviceRegistration.findOrCreate({
      where: { appInstanceId: app_instance_id },
      defaults: {
        userId,
        appInstanceId: app_instance_id,
        deviceId: device_id || null,
        deviceName: device_name || "Deckoviz TV",
        platform: platform || "google_tv",
        platformVersion: platform_version || null,
        appVersion: app_version || null,
        lastSeen: new Date(),
        status: "offline",
      },
    });

    if (!created) {
      // Update existing device
      await device.update({
        userId,
        deviceId: device_id || device.deviceId,
        deviceName: device_name || device.deviceName,
        platform: platform || device.platform,
        platformVersion: platform_version || device.platformVersion,
        appVersion: app_version || device.appVersion,
      });
    }

    res.status(created ? 201 : 200).json({
      id: device.id,
      app_instance_id: device.appInstanceId,
      device_name: device.deviceName,
      platform: device.platform,
      status: device.status,
      created,
    });
  } catch (err) {
    console.error("POST /devices error:", err);
    res.status(500).json({ error: "Failed to register device" });
  }
});

// ── POST /api/devices/generate-id — Generate a new app instance ID ───────────
router.post("/generate-id", (_req, res) => {
  res.json({ app_instance_id: uuidv4() });
});

// ── GET /api/devices/:id — Get a specific device ─────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const userId = req.user.id;
    const device = await DeviceRegistration.findOne({
      where: { id: req.params.id, userId },
    });
    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    const live = getConnectedDevices(userId).find(
      (d) => d.app_instance_id === device.appInstanceId
    );

    res.json({
      id: device.id,
      app_instance_id: device.appInstanceId,
      device_id: device.deviceId,
      device_name: device.deviceName,
      platform: device.platform,
      platform_version: device.platformVersion,
      app_version: device.appVersion,
      status: live?.status || device.status,
      last_seen: live?.last_seen || device.lastSeen,
      current_artwork: live?.current_artwork || device.currentArtwork,
      current_collection: live?.current_collection || device.currentCollection,
      playback_state: live?.playback_state || device.playbackState,
      network_quality: live?.network_quality || device.networkQuality,
    });
  } catch (err) {
    console.error("GET /devices/:id error:", err);
    res.status(500).json({ error: "Failed to fetch device" });
  }
});

// ── PUT /api/devices/:id — Update device info ────────────────────────────────
router.put("/:id", async (req, res) => {
  try {
    const userId = req.user.id;
    const device = await DeviceRegistration.findOne({
      where: { id: req.params.id, userId },
    });
    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    const { device_name, platform, platform_version, app_version } = req.body;
    await device.update({
      deviceName: device_name || device.deviceName,
      platform: platform || device.platform,
      platformVersion: platform_version || device.platformVersion,
      appVersion: app_version || device.appVersion,
    });

    res.json({
      id: device.id,
      app_instance_id: device.appInstanceId,
      device_name: device.deviceName,
      platform: device.platform,
      status: device.status,
    });
  } catch (err) {
    console.error("PUT /devices/:id error:", err);
    res.status(500).json({ error: "Failed to update device" });
  }
});

// ── DELETE /api/devices/:id — Unregister a device ────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.user.id;
    const device = await DeviceRegistration.findOne({
      where: { id: req.params.id, userId },
    });
    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    await device.destroy();
    res.json({ success: true, message: "Device unregistered" });
  } catch (err) {
    console.error("DELETE /devices/:id error:", err);
    res.status(500).json({ error: "Failed to delete device" });
  }
});

// ── GET /api/devices/:id/status — Get real-time device status ────────────────
router.get("/:id/status", async (req, res) => {
  try {
    const userId = req.user.id;
    const device = await DeviceRegistration.findOne({
      where: { id: req.params.id, userId },
    });
    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    const live = getConnectedDevices(userId).find(
      (d) => d.app_instance_id === device.appInstanceId
    );

    res.json({
      app_instance_id: device.appInstanceId,
      device_name: device.deviceName,
      is_online: !!live,
      last_seen: live?.last_seen || device.lastSeen,
      current_artwork: live?.current_artwork || device.currentArtwork,
      current_collection: live?.current_collection || device.currentCollection,
      playback_state: live?.playback_state || device.playbackState,
      network_quality: live?.network_quality || device.networkQuality,
      cache_status: live?.cache_status || device.cacheStatus,
      available_storage: live?.available_storage || device.availableStorage,
    });
  } catch (err) {
    console.error("GET /devices/:id/status error:", err);
    res.status(500).json({ error: "Failed to get device status" });
  }
});

// ── POST /api/devices/:id/display — HTTP fallback to send display command ────
router.post("/:id/display", async (req, res) => {
  try {
    const userId = req.user.id;
    const device = await DeviceRegistration.findOne({
      where: { id: req.params.id, userId },
    });
    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    const { action, payload } = req.body;
    if (!action) {
      return res.status(400).json({ error: "action is required" });
    }

    const sent = sendToDeviceById(userId, device.appInstanceId, action, payload || {});
    if (!sent) {
      return res.status(503).json({
        error: "Device is not currently connected via WebSocket",
        device_name: device.deviceName,
        status: device.status,
      });
    }

    res.json({
      success: true,
      message: `Command '${action}' sent to ${device.deviceName}`,
      device_name: device.deviceName,
    });
  } catch (err) {
    console.error("POST /devices/:id/display error:", err);
    res.status(500).json({ error: "Failed to send command" });
  }
});

// ── POST /api/devices/display-all — Send to all user's devices ───────────────
router.post("/display-all", async (req, res) => {
  try {
    const userId = req.user.id;
    const { action, payload } = req.body;
    if (!action) {
      return res.status(400).json({ error: "action is required" });
    }

    const liveDevices = getConnectedDevices(userId);
    if (liveDevices.length === 0) {
      return res.status(503).json({ error: "No devices currently connected" });
    }

    let sentCount = 0;
    for (const device of liveDevices) {
      const sent = sendToDeviceById(userId, device.app_instance_id, action, payload || {});
      if (sent) sentCount++;
    }

    res.json({
      success: sentCount > 0,
      message: `Command '${action}' sent to ${sentCount}/${liveDevices.length} devices`,
      devices_targeted: sentCount,
      devices_total: liveDevices.length,
    });
  } catch (err) {
    console.error("POST /devices/display-all error:", err);
    res.status(500).json({ error: "Failed to send command" });
  }
});

export default router;
