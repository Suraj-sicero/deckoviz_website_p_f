// ===== models/Blog.js =====
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tag: DataTypes.STRING,
    tagColor: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    readTime: DataTypes.STRING,
    date: DataTypes.STRING,
    image: DataTypes.STRING,
    gradient: DataTypes.STRING,
    size: DataTypes.STRING,
  },
  {
    tableName: "blog_posts", // ✅ Your table name
    timestamps: false, // disable createdAt/updatedAt
  }
);

export default Blog;
