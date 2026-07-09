import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const HomeDailyQueue = sequelize.define("HomeDailyQueue", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  collectionId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  collectionName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dayOfWeek: {
    type: DataTypes.INTEGER,
    defaultValue: -1,
    comment: "-1 = every day, 0 = Sunday, 1 = Monday...",
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default HomeDailyQueue;
