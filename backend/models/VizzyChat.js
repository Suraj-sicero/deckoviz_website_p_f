import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const VizzyChat = sequelize.define("VizzyChat", {
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
    allowNull: true,
  },
  messages: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "[]",
  },
});

export default VizzyChat;
