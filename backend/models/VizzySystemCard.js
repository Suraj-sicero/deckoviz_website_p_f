import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// ─────────────────────────────────────────────────────────────────────────────
// VizzySystemCard
// Stores modular behavioral instructions per agent section.
// Each sub-agent only receives its own section — keeps context lean.
// Sections: 'global', 'personal_artist', 'poster_creator', 'curator',
//           'story_buddy', 'journal_bud', 'visual_companion', 'vizzy_muse',
//           'chief_agent', 'signage_creator', 'brand_photographer',
//           'director_video', 'experience_designer', 'brand_storyteller',
//           'sound_designer'
// ─────────────────────────────────────────────────────────────────────────────

const VizzySystemCard = sequelize.define("VizzySystemCard", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  // Unique section key — one row per section
  section: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // Full behavioral instruction text for this section
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Incremented each time the section is refined
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

export default VizzySystemCard;
