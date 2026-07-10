import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const EnterpriseGuest = sequelize.define("EnterpriseGuest", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.STRING, allowNull: false, defaultValue: "default-enterprise" },
  name: { type: DataTypes.STRING, allowNull: false },
  photo: { type: DataTypes.STRING, allowNull: true },
  preferences: { type: DataTypes.TEXT, allowNull: true },
  notes: { type: DataTypes.TEXT, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true },
});

export default EnterpriseGuest;
