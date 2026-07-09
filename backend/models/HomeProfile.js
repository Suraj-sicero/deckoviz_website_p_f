import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const HomeProfile = sequelize.define("HomeProfile", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING,
    defaultValue: "My Home",
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  banner: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  theme: {
    type: DataTypes.STRING,
    defaultValue: "light",
  },
  currentCollectionId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
});

export default HomeProfile;
