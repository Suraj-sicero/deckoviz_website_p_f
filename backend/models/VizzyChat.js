import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const VizzyChat = sequelize.define("VizzyChat", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  messages: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "[]",
  },
  // Vizzy 2.0 — tracks which sub-agent was last active in this chat
  activeAgent: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "vizzy",
  },
  // 'home' or 'enterprise'
  mode: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "home",
  },
  // Cached compressed core memory injected at session start (avoids repeated DB fetch)
  memorySnapshot: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isFavorited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  paranoid: true, // Enables soft-delete via deletedAt timestamp
});

export default VizzyChat;


