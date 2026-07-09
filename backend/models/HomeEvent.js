import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const HomeEvent = sequelize.define("HomeEvent", {
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
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  collectionId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  collectionName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  recurring: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  frequency: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default HomeEvent;
