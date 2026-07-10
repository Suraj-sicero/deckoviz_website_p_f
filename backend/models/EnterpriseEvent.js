import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const EnterpriseEvent = sequelize.define("EnterpriseEvent", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.STRING, allowNull: false, defaultValue: "default-enterprise" },
  title: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.STRING, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  collectionName: { type: DataTypes.STRING, allowNull: true },
  collectionId: { type: DataTypes.UUID, allowNull: true },
  recurring: { type: DataTypes.BOOLEAN, defaultValue: false },
  frequency: { type: DataTypes.STRING, allowNull: true },
  notes: { type: DataTypes.TEXT, allowNull: true },
});

export default EnterpriseEvent;
