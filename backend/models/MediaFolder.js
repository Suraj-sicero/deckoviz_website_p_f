import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const MediaFolder = sequelize.define("MediaFolder", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: DataTypes.STRING,
  fileCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lastUpdated: DataTypes.STRING,
  storage: DataTypes.STRING,
}, {
  timestamps: true,
});

export default MediaFolder;
