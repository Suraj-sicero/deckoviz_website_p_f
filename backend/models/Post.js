import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userName: DataTypes.STRING,
  userTitle: DataTypes.STRING,
  userAvatar: DataTypes.STRING,
  content: DataTypes.TEXT,
  image: DataTypes.STRING,
  tags: DataTypes.JSON,
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  comments: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  shares: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
});

export default Post;
