import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const VizzyStudioSession = sequelize.define("VizzyStudioSession", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true, // Allow guest/anonymous sessions
  },
  featureName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "active", // "active", "completed", "saved"
  },
  messages: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "[]", // JSON string of message history
  },
  context: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "{}", // JSON string of emotional, narrative context
  },
  progress: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "{}", // JSON string of active stage, completed stages, next step
  },
  metadata: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "{}", // JSON string of custom metadata
  },
}, {
  timestamps: true,
});

export default VizzyStudioSession;
