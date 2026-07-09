import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const HomeSetting = sequelize.define("HomeSetting", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "home_preferences, vizzy_preferences, notifications, display",
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  valueType: {
    type: DataTypes.ENUM("string", "boolean", "number", "select"),
    defaultValue: "string",
  },
});

export default HomeSetting;
