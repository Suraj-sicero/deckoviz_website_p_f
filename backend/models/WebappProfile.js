import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const WebappProfile = sequelize.define("WebappProfile", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  displayName: DataTypes.STRING,
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  title: DataTypes.STRING,
  bio: DataTypes.TEXT,
  location: DataTypes.STRING,
  avatar: DataTypes.STRING,
  banner: DataTypes.STRING,
  postCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  followerCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  followingCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  favoriteArtStyles: DataTypes.JSON,
  theme: {
    type: DataTypes.STRING,
    defaultValue: "light",
  },
}, {
  timestamps: true,
});

export default WebappProfile;
