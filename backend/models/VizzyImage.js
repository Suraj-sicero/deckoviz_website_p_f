import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const VizzyImage = sequelize.define("VizzyImage", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prompt: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isFavorited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  paranoid: true, // Enables soft-delete
});

export default VizzyImage;

