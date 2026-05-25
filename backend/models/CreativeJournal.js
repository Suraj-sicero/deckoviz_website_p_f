import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const CreativeJournal = sequelize.define("CreativeJournal", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  folderId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Untitled Journal",
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "",
  },
  template: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "custom",
  },
  isStarred: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  chatHistory: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "[]",
  },
});

export default CreativeJournal;
