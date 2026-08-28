import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const SoundscapePreset = sequelize.define("SoundscapePreset", {
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
  mood: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // Store ambient layers and their volumes as a JSON object, e.g. {"Rain": 0.5, "Fireplace": 0.3}
  ambientLayers: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "{}",
  },
  classicalTrackId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  musicVolume: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.5,
  },
  binauralCarrier: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 200,
  },
  binauralBeat: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 10,
  },
  binauralVolume: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.2,
  },
  binauralWaveform: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "sine",
  },
  binauralEnabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  gradientPreset: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "focused",
  },
  activeVisualizer: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "waveform",
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default SoundscapePreset;
