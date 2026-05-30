// models/MusicAttachment.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// 🎵 MusicAttachment — links a single MusicTrack to a target item.
// "One track per item" is enforced by the unique index on (userId, targetType, targetId).
// targetType:
//   "collection" -> Collection.id
//   "artwork"    -> VizzyImage.id (a user's generated artwork)
//   "curation"   -> DeckovizCuration.id (a curated / daily artwork)
export const MusicAttachment = sequelize.define(
  "MusicAttachment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false, // the user who attached the music
    },
    targetType: {
      type: DataTypes.STRING, // "collection" | "artwork" | "curation"
      allowNull: false,
    },
    targetId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    musicTrackId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "music_attachments",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "targetType", "targetId"],
      },
    ],
  }
);

// Valid target types, reused by the routes for validation.
export const MUSIC_TARGET_TYPES = ["collection", "artwork", "curation"];
