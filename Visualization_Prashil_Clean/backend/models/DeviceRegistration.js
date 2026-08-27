import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const DeviceRegistration = sequelize.define("DeviceRegistration", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  appInstanceId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    comment: "Unique identifier for this specific TV app installation",
  },
  deviceId: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "Hardware device identifier",
  },
  deviceName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Deckoviz TV",
    comment: "User-friendly name e.g. Living Room TV",
  },
  platform: {
    type: DataTypes.ENUM("google_tv", "android_tv", "apple_tv", "fire_tv", "samsung_tizen", "lg_webos"),
    allowNull: false,
    defaultValue: "google_tv",
  },
  platformVersion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  appVersion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastSeen: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM("online", "offline"),
    defaultValue: "offline",
  },
  currentArtwork: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: "UUID of the artwork currently being displayed",
  },
  currentCollection: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: "UUID of the collection currently being displayed",
  },
  playbackState: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "stopped",
    comment: "playing, paused, stopped",
  },
  networkQuality: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "excellent, good, fair, poor",
  },
  cacheStatus: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "Description of cache state",
  },
  availableStorage: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: "Available storage in bytes",
  },
}, {
  timestamps: true,
});

export default DeviceRegistration;
