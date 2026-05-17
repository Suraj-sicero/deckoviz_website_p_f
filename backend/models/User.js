import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  credits: {
    type: DataTypes.INTEGER,
    defaultValue: 50, // Free credits on signup
  },
  tier: {
    type: DataTypes.ENUM("starter", "creator", "studio"),
    defaultValue: "starter",
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
