import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const DeckovizCuration = sequelize.define("DeckovizCuration", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Unknown Artist",
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "General",
  },
  style: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "[]",
    comment: "JSON stringified tags array for filtering",
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default DeckovizCuration;
