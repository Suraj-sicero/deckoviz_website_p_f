import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Collection = sequelize.define("Collection", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isSystem: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: "True for pre-defined system folders like 'Favorites'",
  },
});

export const CollectionItem = sequelize.define("CollectionItem", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  collectionId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  itemType: {
    type: DataTypes.ENUM("image", "video", "music", "upload", "curation"),
    allowNull: false,
  },
  itemId: {
    type: DataTypes.UUID,
    allowNull: false,
    comment: "UUID matching the corresponding media table",
  },
});
