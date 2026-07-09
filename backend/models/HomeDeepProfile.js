import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const HomeDeepProfile = sequelize.define("HomeDeepProfile", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  sectionId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sectionNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fieldId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fieldValue: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fieldType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default HomeDeepProfile;
