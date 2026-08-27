// models/UserSavedArtwork.js
// 💾 Per-user Save / Like state for Daily Curator items.
// A row exists when a user has saved AND/OR liked an artwork (or collection).
//   saved === true  -> shows in the user's Collections tab until they remove it.
//   liked === true  -> a lightweight engagement toggle (independent of saved).
// When both become false the row is deleted (no orphan rows).
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const UserSavedArtwork = sequelize.define(
  "UserSavedArtwork",
  {
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
      type: DataTypes.STRING, // "artwork" | "collection"
      allowNull: false,
      defaultValue: "artwork",
    },
    itemId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    saved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    liked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "user_saved_artworks",
    timestamps: true,
    indexes: [
      { fields: ["userId"] },
      { unique: true, fields: ["userId", "itemType", "itemId"] },
    ],
  }
);

export const SAVED_ITEM_TYPES = ["artwork", "collection"];
