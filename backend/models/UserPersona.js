import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const UserPersona = sequelize.define("UserPersona", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  personaSummary: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: "Brief summary describing the user's personality or style preference",
  },
  preferencesCard: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "{}",
    comment: "JSON string containing flexible personal preferences card fields",
  },
});

export default UserPersona;
