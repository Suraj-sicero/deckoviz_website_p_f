import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const MusicTrack = sequelize.define("MusicTrack", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true, // System-wide seed tracks have null userId
  },
  audioUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prompt: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: "Duration in seconds",
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "ambient", // classical or ambient
  },
  isFavorited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export const VideoClip = sequelize.define("VideoClip", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true, // System-wide seed clips have null userId
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prompt: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isFavorited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

