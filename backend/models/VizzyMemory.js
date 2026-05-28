import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// ─────────────────────────────────────────────────────────────────────────────
// VizzyMemory
// Stores the 3-tier memory system for each user:
//   • core          — compressed, always-loaded identity snapshot
//   • extended      — full interaction archive (selectively retrieved)
//   • distilled_monthly — monthly compressed rollup for long-term continuity
// ─────────────────────────────────────────────────────────────────────────────

const VizzyMemory = sequelize.define("VizzyMemory", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  // Memory tier
  type: {
    type: DataTypes.ENUM("core", "extended", "distilled_monthly"),
    allowNull: false,
    defaultValue: "extended",
  },
  // JSON-stringified content — structure varies by type:
  //   core:              { persona, aesthetics, emotionalPatterns, recurringMotifs, preferredAgents }
  //   extended:          { intent, agentUsed, summary, timestamp }[]
  //   distilled_monthly: { month, patterns, identitySignals, creativeSummary }
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "{}",
  },
  // Used only for distilled_monthly rows (format: 'YYYY-MM')
  month: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default VizzyMemory;
