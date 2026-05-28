import VizzyMemory from "../models/VizzyMemory.js";
import { Op } from "sequelize";

// ─────────────────────────────────────────────────────────────────────────────
// memoryService.js
//
// The memory layer is what transforms Vizzy from a stateless LLM call into a
// persistent evolving intelligence. This service handles all memory operations:
//
//   getCoreMemory()         — small always-loaded identity snapshot
//   appendExtendedMemory()  — logs each interaction to the archive
//   getRelevantExtended()   — retrieves contextually relevant past interactions
//   updateCoreMemory()      — refreshes the compressed core identity
//   distillMonthlyMemory()  — monthly compression of extended → distilled
// ─────────────────────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════
// DEFAULT CORE MEMORY (for new / anonymous users)
// ═══════════════════════════════════════════

const DEFAULT_CORE_MEMORY = {
  persona: "A curious creative exploring the space between imagination and reality.",
  aesthetics: [],
  emotionalPatterns: [],
  recurringMotifs: [],
  preferredAgents: [],
  preferredMoods: [],
  creativeSummary: "",
};

// ═══════════════════════════════════════════
// GET CORE MEMORY
// Always-loaded: injected into every request.
// Returns a short, compressed string for context injection.
// ═══════════════════════════════════════════

export async function getCoreMemory(userId) {
  if (!userId) return formatCoreMemoryForPrompt(DEFAULT_CORE_MEMORY);

  try {
    const record = await VizzyMemory.findOne({
      where: { userId, type: "core" },
      order: [["updatedAt", "DESC"]],
    });

    if (!record) return formatCoreMemoryForPrompt(DEFAULT_CORE_MEMORY);

    const parsed = JSON.parse(record.content || "{}");
    return formatCoreMemoryForPrompt({ ...DEFAULT_CORE_MEMORY, ...parsed });
  } catch {
    return formatCoreMemoryForPrompt(DEFAULT_CORE_MEMORY);
  }
}

function formatCoreMemoryForPrompt(mem) {
  const lines = [];
  if (mem.persona) lines.push(`User persona: ${mem.persona}`);
  if (mem.aesthetics?.length) lines.push(`Aesthetic preferences: ${mem.aesthetics.join(", ")}`);
  if (mem.emotionalPatterns?.length) lines.push(`Emotional tendencies: ${mem.emotionalPatterns.join(", ")}`);
  if (mem.recurringMotifs?.length) lines.push(`Recurring creative motifs: ${mem.recurringMotifs.join(", ")}`);
  if (mem.preferredMoods?.length) lines.push(`Preferred moods: ${mem.preferredMoods.join(", ")}`);
  if (mem.preferredAgents?.length) lines.push(`Most-used creative modes: ${mem.preferredAgents.join(", ")}`);
  if (mem.creativeSummary) lines.push(`Creative identity summary: ${mem.creativeSummary}`);
  return lines.length ? lines.join("\n") : "";
}

// ═══════════════════════════════════════════
// APPEND EXTENDED MEMORY
// Called after every successful agent response.
// Stores a lightweight interaction record for future retrieval.
// ═══════════════════════════════════════════

export async function appendExtendedMemory(userId, interaction) {
  if (!userId) return; // Don't persist for anonymous sessions

  // interaction shape: { intent, agentUsed, userInput, responseSummary, timestamp }
  try {
    const existing = await VizzyMemory.findOne({
      where: { userId, type: "extended" },
    });

    const entry = {
      intent: interaction.intent || "general",
      agentUsed: interaction.agentUsed || "vizzy",
      userInput: (interaction.userInput || "").substring(0, 200), // cap size
      responseSummary: (interaction.responseSummary || "").substring(0, 300),
      timestamp: interaction.timestamp || Date.now(),
    };

    if (existing) {
      const history = JSON.parse(existing.content || "[]");
      // Keep last 200 interactions max to prevent unbounded growth
      const trimmed = [...history, entry].slice(-200);
      existing.content = JSON.stringify(trimmed);
      await existing.save();
    } else {
      await VizzyMemory.create({
        userId,
        type: "extended",
        content: JSON.stringify([entry]),
      });
    }
  } catch (err) {
    // Memory failures must never crash the main response
    console.error("[memoryService] appendExtendedMemory failed:", err.message);
  }
}

// ═══════════════════════════════════════════
// GET RELEVANT EXTENDED MEMORY
// Simple keyword-relevance retrieval (no vector DB needed for Phase 1).
// Returns the most contextually relevant past interactions as a prompt snippet.
// ═══════════════════════════════════════════

export async function getRelevantExtendedMemory(userId, intent, limit = 4) {
  if (!userId) return "";

  try {
    const record = await VizzyMemory.findOne({
      where: { userId, type: "extended" },
    });

    if (!record) return "";

    const history = JSON.parse(record.content || "[]");
    if (!history.length) return "";

    // Score each entry by keyword similarity to current intent
    const intentWords = (intent || "").toLowerCase().split("_");

    const scored = history
      .map((entry) => {
        const text = `${entry.intent} ${entry.agentUsed} ${entry.userInput}`.toLowerCase();
        const score = intentWords.reduce((acc, word) => acc + (text.includes(word) ? 1 : 0), 0);
        return { ...entry, score };
      })
      .sort((a, b) => b.score - a.score || b.timestamp - a.timestamp)
      .slice(0, limit);

    if (!scored.length || scored[0].score === 0) {
      // No relevant matches — just use most recent entries
      const recent = history.slice(-limit);
      return formatExtendedMemoryForPrompt(recent);
    }

    return formatExtendedMemoryForPrompt(scored);
  } catch {
    return "";
  }
}

function formatExtendedMemoryForPrompt(entries) {
  if (!entries?.length) return "";
  const lines = entries.map(
    (e) => `- Past ${e.agentUsed || "vizzy"} session (${e.intent || "general"}): ${e.responseSummary || ""}`
  );
  return `Relevant past creative sessions:\n${lines.join("\n")}`;
}

// ═══════════════════════════════════════════
// UPDATE CORE MEMORY
// Called when Vizzy detects a stable new signal about the user
// (e.g. repeated aesthetic preference, dominant mood, preferred agent).
// ═══════════════════════════════════════════

export async function updateCoreMemory(userId, updates) {
  if (!userId) return;

  try {
    const existing = await VizzyMemory.findOne({
      where: { userId, type: "core" },
    });

    if (existing) {
      const current = JSON.parse(existing.content || "{}");
      const merged = deepMergeMemory(current, updates);
      existing.content = JSON.stringify(merged);
      await existing.save();
    } else {
      await VizzyMemory.create({
        userId,
        type: "core",
        content: JSON.stringify({ ...DEFAULT_CORE_MEMORY, ...updates }),
      });
    }
  } catch (err) {
    console.error("[memoryService] updateCoreMemory failed:", err.message);
  }
}

function deepMergeMemory(current, updates) {
  const merged = { ...current };
  for (const [key, val] of Object.entries(updates)) {
    if (Array.isArray(val) && Array.isArray(current[key])) {
      // Merge arrays, deduplicate, keep last 20 items
      merged[key] = [...new Set([...current[key], ...val])].slice(-20);
    } else {
      merged[key] = val;
    }
  }
  return merged;
}

// ═══════════════════════════════════════════
// DISTILL MONTHLY MEMORY
// Compresses the extended memory archive into a monthly summary.
// Should be called by a monthly job or admin trigger.
// ═══════════════════════════════════════════

export async function distillMonthlyMemory(userId) {
  if (!userId) return;

  const month = new Date().toISOString().slice(0, 7); // 'YYYY-MM'

  try {
    const record = await VizzyMemory.findOne({
      where: { userId, type: "extended" },
    });

    if (!record) return;

    const history = JSON.parse(record.content || "[]");
    if (!history.length) return;

    // Count agent usage frequency
    const agentCounts = {};
    const intentCounts = {};
    history.forEach((e) => {
      agentCounts[e.agentUsed] = (agentCounts[e.agentUsed] || 0) + 1;
      intentCounts[e.intent] = (intentCounts[e.intent] || 0) + 1;
    });

    const topAgents = Object.entries(agentCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([k]) => k);

    const topIntents = Object.entries(intentCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([k]) => k);

    const distilled = {
      month,
      totalInteractions: history.length,
      topAgents,
      topIntents,
      patterns: `This user most frequently worked on ${topIntents.join(", ")} using ${topAgents.join(", ")}.`,
      generatedAt: new Date().toISOString(),
    };

    // Upsert distilled record for this month
    const existing = await VizzyMemory.findOne({
      where: { userId, type: "distilled_monthly", month },
    });

    if (existing) {
      existing.content = JSON.stringify(distilled);
      await existing.save();
    } else {
      await VizzyMemory.create({
        userId,
        type: "distilled_monthly",
        month,
        content: JSON.stringify(distilled),
      });
    }

    // Also update core memory with new signals from the distillation
    await updateCoreMemory(userId, {
      preferredAgents: topAgents,
    });

    console.log(`[memoryService] Monthly distillation complete for user ${userId} — ${month}`);
  } catch (err) {
    console.error("[memoryService] distillMonthlyMemory failed:", err.message);
  }
}

// ═══════════════════════════════════════════
// GET RAW CORE MEMORY OBJECT
// For the frontend GET /memory/core endpoint
// ═══════════════════════════════════════════

export async function getCoreMemoryObject(userId) {
  if (!userId) return DEFAULT_CORE_MEMORY;

  try {
    const record = await VizzyMemory.findOne({
      where: { userId, type: "core" },
    });

    if (!record) return DEFAULT_CORE_MEMORY;
    return { ...DEFAULT_CORE_MEMORY, ...JSON.parse(record.content || "{}") };
  } catch {
    return DEFAULT_CORE_MEMORY;
  }
}
