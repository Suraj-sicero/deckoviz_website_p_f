import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userName: DataTypes.STRING,
  userAvatar: DataTypes.STRING,
  text: DataTypes.TEXT,
  time: DataTypes.STRING,
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  dislikes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  parentId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default Comment;
