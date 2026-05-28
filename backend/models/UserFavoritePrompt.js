import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const UserFavoritePrompt = sequelize.define("UserFavoritePrompt", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  templateId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "The string identifier of the quick template (e.g. video_vibe_1)",
  },
});

export default UserFavoritePrompt;
