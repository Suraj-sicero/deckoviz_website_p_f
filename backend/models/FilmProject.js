import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const FilmProject = sequelize.define("FilmProject", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true, // Allow guest/anonymous projects
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Untitled Project",
  },
  styleReferenceImage: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  scenes: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "[]", // JSON string of scene queue
  },
  transitionDuration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5, // Default 5 seconds
  },
  narrationFile: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  musicFile: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  narrationVolume: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100, // 0-100
  },
  musicVolume: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100, // 0-100
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "draft", // "draft", "rendering", "completed", "failed"
  },
  outputVideo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default FilmProject;
