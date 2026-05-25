import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const AgenticPreset = sequelize.define("AgenticPreset", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shapeType: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "galaxy",
  },
  primaryColor: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "#2ee06a",
  },
  secondaryColor: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "#ffffff",
  },
  backgroundColor: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "#030303",
  },
  spinSpeed: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.1,
  },
  ditherLevels: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 8,
  },
  starDensity: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.5,
  },
  shapeScale: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 1.0,
  },
  shapeDensity: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 1.0,
  },
  shapeParam: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 2.0,
  },
  gridOpacity: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.15,
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default AgenticPreset;
