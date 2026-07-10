import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Follower = sequelize.define("Follower", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  followerId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: "follower_following",
  },
  followingId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: "follower_following",
  },
}, {
  timestamps: true,
});

export default Follower;
