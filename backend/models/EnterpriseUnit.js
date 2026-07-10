import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const EnterpriseUnit = sequelize.define("EnterpriseUnit", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.STRING, allowNull: false, defaultValue: "default-enterprise" },
  name: { type: DataTypes.STRING, allowNull: false },
  frames: { type: DataTypes.INTEGER, defaultValue: 1 },
  status: { type: DataTypes.STRING, defaultValue: "active" },
  collectionName: { type: DataTypes.STRING, allowNull: true },
  collectionId: { type: DataTypes.UUID, allowNull: true },
});

export default EnterpriseUnit;
