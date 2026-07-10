import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const EnterpriseDailyQueue = sequelize.define("EnterpriseDailyQueue", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.STRING, allowNull: false, defaultValue: "default-enterprise" },
  collectionName: { type: DataTypes.STRING, allowNull: false },
  collectionId: { type: DataTypes.UUID, allowNull: true },
  unitName: { type: DataTypes.STRING, allowNull: true },
  unitId: { type: DataTypes.UUID, allowNull: true },
  startTime: { type: DataTypes.STRING, allowNull: false },
  endTime: { type: DataTypes.STRING, allowNull: false },
  dayOfWeek: { type: DataTypes.INTEGER, defaultValue: -1 },
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
});

export default EnterpriseDailyQueue;
