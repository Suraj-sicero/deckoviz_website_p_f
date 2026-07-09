import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const HomeFavorite = sequelize.define("HomeFavorite", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  itemType: {
    type: DataTypes.ENUM("collection", "artwork", "media", "playlist"),
    allowNull: false,
  },
  itemId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default HomeFavorite;
