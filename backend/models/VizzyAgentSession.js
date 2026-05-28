import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// ─────────────────────────────────────────────────────────────────────────────
// VizzyAgentSession
// Tracks which sub-agent was active for each chat turn.
// Enables continuity — Vizzy knows which specialist was engaged last.
// ─────────────────────────────────────────────────────────────────────────────

const VizzyAgentSession = sequelize.define("VizzyAgentSession", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  chatId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true, // null for anonymous/guest sessions
  },
  // ID of the active sub-agent (matches subAgents.js id field)
  // e.g. 'personal_artist', 'curator', 'vizzy_muse', 'chief_agent'
  agentId: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "vizzy", // vizzy master handles directly
  },
  // The classified intent that triggered this agent
  intent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Number of turns this agent has been active in this chat
  turnCount: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  activatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default VizzyAgentSession;
