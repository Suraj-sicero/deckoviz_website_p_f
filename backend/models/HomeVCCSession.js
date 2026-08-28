import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const HomeVCCSession = sequelize.define("HomeVCCSession", {
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
    defaultValue: "New Canvas",
  },
  canvasState: {
    type: DataTypes.TEXT,
    defaultValue: "{}",
    comment: "JSON string of canvas elements and layout",
  },
  activeTool: {
    type: DataTypes.STRING,
    defaultValue: "brush",
  },
  thumbnailUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default HomeVCCSession;
