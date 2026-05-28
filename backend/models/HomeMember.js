import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const HomeMember = sequelize.define("HomeMember", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: "The primary account holder",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "member",
    comment: "e.g. partner, child, parent, guest",
  },
  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preferences: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "{}",
    comment: "JSON string containing individual preferences of this member",
  },
});

export default HomeMember;
