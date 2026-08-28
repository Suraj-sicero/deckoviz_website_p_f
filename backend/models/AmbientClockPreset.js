import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const AmbientClockPreset = sequelize.define("AmbientClockPreset", {
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
  prompt: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  style: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Minimal",
  },
  mood: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Calm",
  },
  handColor: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "#ffffff",
  },
  secondHandColor: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "#ff0077",
  },
  dialColor: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "#ffffff",
  },
  numeralStyle: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "minimal", // minimal | roman | arabic | none | abstract
  },
  handStyle: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "minimal", // wooden | neon | metallic | glowing | fluid | cosmic | minimal
  },
  accentColor: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "#888888",
  },
  ambientSound: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "none", // rain | forest | cafe | waves | vinyl | piano | city | fireplace | wind | lo-fi | none
  },
  lore: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  animationType: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "particles", // rain | fog | particles | stars | flowing-ink | breathing-gradient
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default AmbientClockPreset;
