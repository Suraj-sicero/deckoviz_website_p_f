/**
 * Backend stubs for Palette Wars, Dream Architect, and The Museum of Us.
 *
 * All three follow the same shape Story Forge uses: in-memory rooms with TTL
 * GC, plus mock AI endpoints. The frontend currently runs local-only state;
 * these endpoints define the contract for future server-synced multiplayer.
 *
 * Mount paths (see server.js):
 *   /api/flagship-games/palette-wars
 *   /api/flagship-games/dream-architect
 *   /api/flagship-games/museum-of-us
 */

import express from "express";

const TTL_MS = 1000 * 60 * 60 * 6;

function makeRoomStore() {
  const rooms = new Map();
  function gc() {
    const now = Date.now();
    for (const [code, room] of rooms.entries()) {
      if (now - room.updatedAt > TTL_MS) rooms.delete(code);
    }
  }
  function genCode() {
    const letters = "ACDEFGHJKLMNPQRTUVWXY";
    let code;
    do {
      code = Array.from({ length: 5 }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
    } while (rooms.has(code));
    return code;
  }
  function touch(room) {
    room.updatedAt = Date.now();
    return room;
  }
  return { rooms, gc, genCode, touch };
}

const PLAYER_COLORS = ["#a78bfa", "#22d3ee", "#f472b6", "#fbbf24", "#10b981", "#fb7185", "#60a5fa", "#facc15"];

/* ============================================================
 *  Palette Wars
 * ============================================================ */

const paletteWarsRouter = express.Router();
const pwStore = makeRoomStore();

paletteWarsRouter.post("/rooms", (req, res) => {
  pwStore.gc();
  const { moodId = null, gameMode = "standard" } = req.body || {};
  const code = pwStore.genCode();
  const room = {
    code,
    moodId,
    gameMode,
    players: [],
    phase: "lobby",
    round: 0,
    roundLimit: gameMode === "party" ? 10 : gameMode === "solo" ? 5 : 6,
    artwork: null,
    activeTheme: null,
    responses: [],
    rounds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  pwStore.rooms.set(code, room);
  res.json({ room });
});

paletteWarsRouter.get("/rooms/:code", (req, res) => {
  const room = pwStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  res.json({ room });
});

paletteWarsRouter.post("/rooms/:code/players", (req, res) => {
  const room = pwStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: "name required" });
  if (room.players.length >= 8) return res.status(400).json({ error: "room full" });
  const player = {
    id: `pw-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: String(name).slice(0, 24),
    color: PLAYER_COLORS[room.players.length % PLAYER_COLORS.length],
    points: 0,
    vizzyPicks: 0,
    joyPoints: 0,
    swapUsed: false,
  };
  room.players.push(player);
  pwStore.touch(room);
  res.json({ room, player });
});

paletteWarsRouter.post("/rooms/:code/responses", (req, res) => {
  const room = pwStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { playerId, text } = req.body || {};
  if (!playerId || !text) return res.status(400).json({ error: "playerId + text required" });
  const response = {
    id: `r-${room.round}-${playerId}-${Date.now()}`,
    playerId,
    text: String(text).slice(0, 280),
    round: room.round,
    voteCount: 0,
    laughs: [],
  };
  room.responses.push(response);
  pwStore.touch(room);
  res.json({ room, response });
});

paletteWarsRouter.post("/rooms/:code/vote", (req, res) => {
  const room = pwStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { responseId } = req.body || {};
  const r = room.responses.find((x) => x.id === responseId);
  if (!r) return res.status(400).json({ error: "response not found" });
  r.voteCount += 1;
  pwStore.touch(room);
  res.json({ room });
});

paletteWarsRouter.post("/rooms/:code/laugh", (req, res) => {
  const room = pwStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { responseId, voterId } = req.body || {};
  const r = room.responses.find((x) => x.id === responseId);
  if (!r) return res.status(400).json({ error: "response not found" });
  if (!r.laughs.includes(voterId) && r.playerId !== voterId) r.laughs.push(voterId);
  pwStore.touch(room);
  res.json({ room });
});

paletteWarsRouter.post("/ai/artwork", (req, res) => {
  const { moodId = "raw-emotive", round = 1 } = req.body || {};
  res.json({
    artwork: {
      id: `pw-art-${Date.now()}`,
      moodId,
      seed: Math.floor(Math.random() * 1_000_000) + round * 13,
      prompt: "A procedural abstract composition.",
    },
  });
});

paletteWarsRouter.post("/ai/theme", (req, res) => {
  const themes = [
    { id: "color-and-sound", label: "Include a colour and a sound." },
    { id: "questions-only", label: "Write only in questions." },
    { id: "confession", label: "Your response must feel like a confession." },
    { id: "twelve-words", label: "Use exactly twelve words." },
    { id: "remembers-you", label: "Write as if this artwork remembers you." },
  ];
  res.json({ theme: themes[Math.floor(Math.random() * themes.length)] });
});

/* ============================================================
 *  Dream Architect
 * ============================================================ */

const dreamArchitectRouter = express.Router();
const daStore = makeRoomStore();

dreamArchitectRouter.post("/rooms", (req, res) => {
  daStore.gc();
  const { seedId = null, mode = "multiplayer" } = req.body || {};
  const code = daStore.genCode();
  const room = {
    code,
    seedId,
    mode,
    phase: "lobby",
    players: [],
    contributions: [],
    finalName: null,
    poeticDescription: null,
    library: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  daStore.rooms.set(code, room);
  res.json({ room });
});

dreamArchitectRouter.get("/rooms/:code", (req, res) => {
  const room = daStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  res.json({ room });
});

dreamArchitectRouter.post("/rooms/:code/players", (req, res) => {
  const room = daStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: "name required" });
  if (room.players.length >= 5) return res.status(400).json({ error: "room full" });
  const player = {
    id: `da-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: String(name).slice(0, 24),
    color: PLAYER_COLORS[room.players.length % PLAYER_COLORS.length],
    contributions: { geography: 0, atmosphere: 0, inhabitants: 0, secret: 0 },
  };
  room.players.push(player);
  daStore.touch(room);
  res.json({ room, player });
});

dreamArchitectRouter.post("/rooms/:code/contributions", (req, res) => {
  const room = daStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { playerId, phase, text } = req.body || {};
  if (!playerId || !phase || !text) return res.status(400).json({ error: "playerId + phase + text required" });
  const contribution = {
    id: `c-${phase}-${playerId}-${Date.now()}`,
    playerId,
    phase,
    text: String(text).slice(0, 220),
    createdAt: Date.now(),
  };
  room.contributions.push(contribution);
  const player = room.players.find((p) => p.id === playerId);
  if (player) player.contributions[phase] = (player.contributions[phase] ?? 0) + 1;
  daStore.touch(room);
  res.json({ room, contribution });
});

dreamArchitectRouter.post("/rooms/:code/finalize", (req, res) => {
  const room = daStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { name, description } = req.body || {};
  room.finalName = name ?? room.finalName;
  room.poeticDescription = description ?? room.poeticDescription;
  room.phase = "final";
  daStore.touch(room);
  res.json({ room });
});

dreamArchitectRouter.get("/library", (_req, res) => {
  const worlds = [];
  for (const room of daStore.rooms.values()) {
    for (const w of room.library) worlds.push(w);
  }
  res.json({ worlds });
});

dreamArchitectRouter.post("/ai/world-render", (req, res) => {
  res.json({ render: { generatedAt: Date.now(), prompt: "Composite world render." } });
});

dreamArchitectRouter.post("/ai/name", (req, res) => {
  const { seedText = "an unnamed place" } = req.body || {};
  const noun = seedText.split(/\s+/).find((w) => w.length > 5) ?? "Hollow";
  const cap = (s) => s[0].toUpperCase() + s.slice(1).toLowerCase();
  res.json({ name: `The ${cap(noun)} of Quiet Hours` });
});

/* ============================================================
 *  The Museum of Us
 * ============================================================ */

const museumRouter = express.Router();
const muStore = makeRoomStore();

museumRouter.post("/rooms", (req, res) => {
  muStore.gc();
  const { themeId = null } = req.body || {};
  const code = muStore.genCode();
  const room = {
    code,
    themeId,
    phase: "lobby",
    players: [],
    artworks: [],
    rounds: [],
    museumName: null,
    curatorNote: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  muStore.rooms.set(code, room);
  res.json({ room });
});

museumRouter.get("/rooms/:code", (req, res) => {
  const room = muStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  res.json({ room });
});

museumRouter.post("/rooms/:code/players", (req, res) => {
  const room = muStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: "name required" });
  if (room.players.length >= 6) return res.status(400).json({ error: "room full" });
  const player = {
    id: `mu-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: String(name).slice(0, 24),
    color: PLAYER_COLORS[room.players.length % PLAYER_COLORS.length],
    presenceMoments: 0,
  };
  room.players.push(player);
  muStore.touch(room);
  res.json({ room, player });
});

museumRouter.post("/rooms/:code/artworks", (req, res) => {
  const room = muStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { playerId, round, title, medium, description, anonymous = false } = req.body || {};
  if (!playerId || !title || !medium || !description) {
    return res.status(400).json({ error: "playerId + title + medium + description required" });
  }
  const artwork = {
    id: `art-${playerId}-${round}-${Date.now()}`,
    playerId,
    round,
    title: String(title).slice(0, 80),
    medium,
    description: String(description).slice(0, 400),
    anonymous: !!anonymous,
    createdAt: Date.now(),
  };
  room.artworks.push(artwork);
  muStore.touch(room);
  res.json({ room, artwork });
});

museumRouter.post("/rooms/:code/curate", (req, res) => {
  const room = muStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { museumName, curatorNote } = req.body || {};
  room.museumName = museumName ?? room.museumName;
  room.curatorNote = curatorNote ?? room.curatorNote;
  room.phase = "final-wall";
  muStore.touch(room);
  res.json({ room });
});

museumRouter.post("/ai/prompt", (req, res) => {
  const { themeId = "childhood" } = req.body || {};
  const pool = {
    childhood: [
      "Title an artwork after the smell of your childhood home.",
      "Create a painting named after the game only you remember.",
    ],
    solitude: [
      "Title a photograph after the night you stopped waiting.",
    ],
  };
  const list = pool[themeId] ?? pool.childhood;
  res.json({ prompt: list[Math.floor(Math.random() * list.length)] });
});

museumRouter.post("/ai/vizzy-piece", (req, res) => {
  res.json({
    artwork: {
      id: `vizzy-${Date.now()}`,
      playerId: "vizzy",
      title: "Something I noticed.",
      medium: "Painting",
      description: "A small piece about the colour everyone in this room kept reaching for tonight.",
    },
  });
});

museumRouter.post("/ai/curator-note", (req, res) => {
  res.json({
    note:
      "Tonight, several people returned to rooms they had not entered in years. Someone named a painting after a memory they thought was gone. The light has been turned off gently.",
  });
});

/* ============================================================
 *  Vizzy's Verdict (bluffing)
 * ============================================================ */

const verdictRouter = express.Router();
const vvStore = makeRoomStore();

verdictRouter.post("/rooms", (req, res) => {
  vvStore.gc();
  const { difficulty = "initiated" } = req.body || {};
  const code = vvStore.genCode();
  const room = {
    code,
    difficulty,
    players: [],
    phase: "lobby",
    round: 0,
    roundLimit: 5,
    facts: [],
    rounds: [],
    vizzyBluffUsed: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  vvStore.rooms.set(code, room);
  res.json({ room });
});

verdictRouter.get("/rooms/:code", (req, res) => {
  const room = vvStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  res.json({ room });
});

verdictRouter.post("/rooms/:code/players", (req, res) => {
  const room = vvStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: "name required" });
  if (room.players.length >= 8) return res.status(400).json({ error: "room full" });
  const player = {
    id: `vv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: String(name).slice(0, 24),
    color: PLAYER_COLORS[room.players.length % PLAYER_COLORS.length],
    points: 0,
    perfectBluffs: 0,
    chaosPoints: 0,
    doubleDownUsed: false,
  };
  room.players.push(player);
  vvStore.touch(room);
  res.json({ room, player });
});

verdictRouter.post("/rooms/:code/facts", (req, res) => {
  const room = vvStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { playerId, text, isTruth = false, doubleDown = false } = req.body || {};
  if (!playerId || !text) return res.status(400).json({ error: "playerId + text required" });
  const fact = {
    id: `f-${room.round}-${playerId}-${Date.now()}`,
    playerId,
    text: String(text).slice(0, 240),
    isTruth: !!isTruth,
    doubleDown: !!doubleDown,
    voteCount: 0,
  };
  room.facts.push(fact);
  vvStore.touch(room);
  res.json({ room, fact });
});

verdictRouter.post("/rooms/:code/vote", (req, res) => {
  const room = vvStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { factId } = req.body || {};
  const f = room.facts.find((x) => x.id === factId);
  if (!f) return res.status(400).json({ error: "fact not found" });
  f.voteCount += 1;
  vvStore.touch(room);
  res.json({ room });
});

verdictRouter.post("/ai/artwork", (req, res) => {
  const { difficulty = "initiated" } = req.body || {};
  res.json({
    artwork: {
      id: `vv-${Date.now()}`,
      difficulty,
      prompt: "A real artwork chosen from the database.",
    },
  });
});

verdictRouter.post("/ai/bluff", (req, res) => {
  const templates = [
    "The artist reportedly destroyed two earlier versions before settling on this composition.",
    "An X-ray reveals a different figure beneath the visible surface.",
    "It was misattributed for decades before reattribution in the 1980s.",
  ];
  res.json({ text: templates[Math.floor(Math.random() * templates.length)] });
});

/* ============================================================
 *  One Word At A Time
 * ============================================================ */

const oneWordRouter = express.Router();
const owStore = makeRoomStore();

oneWordRouter.post("/rooms", (req, res) => {
  owStore.gc();
  const { moodId = "absurdist" } = req.body || {};
  const code = owStore.genCode();
  const room = {
    code,
    moodId,
    players: [],
    sentences: [],
    currentWords: [],
    sentenceIdx: 0,
    sessionLimit: 10,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  owStore.rooms.set(code, room);
  res.json({ room });
});

oneWordRouter.get("/rooms/:code", (req, res) => {
  const room = owStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  res.json({ room });
});

oneWordRouter.post("/rooms/:code/players", (req, res) => {
  const room = owStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: "name required" });
  if (room.players.length >= 8) return res.status(400).json({ error: "room full" });
  const player = {
    id: `ow-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: String(name).slice(0, 24),
    color: PLAYER_COLORS[room.players.length % PLAYER_COLORS.length],
    quickfire: 0,
    closers: 0,
    pivots: 0,
  };
  room.players.push(player);
  owStore.touch(room);
  res.json({ room, player });
});

oneWordRouter.post("/rooms/:code/words", (req, res) => {
  const room = owStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { playerId, text } = req.body || {};
  if (!playerId || !text) return res.status(400).json({ error: "playerId + text required" });
  const tokens = String(text).trim().split(/\s+/);
  if (tokens.length > 1) return res.status(400).json({ error: "one word only" });
  const word = {
    id: `w-${Date.now()}`,
    playerId,
    text: tokens[0].slice(0, 30),
    submittedAt: Date.now(),
  };
  room.currentWords.push(word);
  owStore.touch(room);
  res.json({ room, word });
});

oneWordRouter.post("/rooms/:code/end-sentence", (req, res) => {
  const room = owStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { endedById = null, narration = "" } = req.body || {};
  const sentenceText = room.currentWords.map((w) => w.text).join(" ");
  const record = {
    id: `s-${Date.now()}`,
    index: room.sentenceIdx + 1,
    words: room.currentWords,
    text: sentenceText,
    endedById,
    narration,
  };
  room.sentences.push(record);
  room.currentWords = [];
  room.sentenceIdx += 1;
  owStore.touch(room);
  res.json({ room, sentence: record });
});

oneWordRouter.post("/ai/illustration", (req, res) => {
  res.json({ illustration: { id: `ill-${Date.now()}`, prompt: req.body?.text ?? "" } });
});

oneWordRouter.post("/ai/narrate", (req, res) => {
  res.json({ narration: `Vizzy delivers: "${req.body?.text ?? ""}" with operatic commitment.` });
});

/* ============================================================
 *  World in a Frame
 * ============================================================ */

const frameRouter = express.Router();
const wfStore = makeRoomStore();

frameRouter.post("/rooms", (req, res) => {
  wfStore.gc();
  const { styleId = "documentary" } = req.body || {};
  const code = wfStore.genCode();
  const room = {
    code,
    styleId,
    players: [],
    submissions: [],
    rounds: [],
    round: 0,
    roundLimit: 6,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  wfStore.rooms.set(code, room);
  res.json({ room });
});

frameRouter.get("/rooms/:code", (req, res) => {
  const room = wfStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  res.json({ room });
});

frameRouter.post("/rooms/:code/players", (req, res) => {
  const room = wfStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: "name required" });
  if (room.players.length >= 7) return res.status(400).json({ error: "room full" });
  const player = {
    id: `wf-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: String(name).slice(0, 24),
    color: PLAYER_COLORS[room.players.length % PLAYER_COLORS.length],
    points: 0,
  };
  room.players.push(player);
  wfStore.touch(room);
  res.json({ room, player });
});

frameRouter.post("/rooms/:code/submissions", (req, res) => {
  const room = wfStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { playerId, round, text } = req.body || {};
  if (!playerId || !text) return res.status(400).json({ error: "playerId + text required" });
  const submission = {
    id: `wf-${round}-${playerId}-${Date.now()}`,
    playerId,
    round,
    text: String(text).slice(0, 280),
    voteCount: 0,
  };
  room.submissions.push(submission);
  wfStore.touch(room);
  res.json({ room, submission });
});

frameRouter.post("/rooms/:code/vote", (req, res) => {
  const room = wfStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { submissionId } = req.body || {};
  const s = room.submissions.find((x) => x.id === submissionId);
  if (!s) return res.status(400).json({ error: "submission not found" });
  s.voteCount += 1;
  wfStore.touch(room);
  res.json({ room });
});

frameRouter.post("/ai/scene", (req, res) => {
  res.json({ scene: { id: `scene-${Date.now()}`, prompt: "A richly detailed cinematic scene." } });
});

frameRouter.post("/ai/commentary", (req, res) => {
  res.json({ commentary: "This sentence leaves just enough unsaid to become unforgettable." });
});

/* ============================================================
 *  The Inheritance (persistent family archive)
 * ============================================================ */

const inheritanceRouter = express.Router();
const ihFamilies = new Map(); // familyId -> archive

inheritanceRouter.post("/families", (req, res) => {
  const { surname, founding } = req.body || {};
  if (!surname) return res.status(400).json({ error: "surname required" });
  const id = `family-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const archive = {
    id,
    surname,
    founding: founding ?? null,
    members: [],
    chapters: [],
    heirlooms: [],
    letters: [],
    legacyPoints: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  ihFamilies.set(id, archive);
  res.json({ archive });
});

inheritanceRouter.get("/families/:id", (req, res) => {
  const archive = ihFamilies.get(req.params.id);
  if (!archive) return res.status(404).json({ error: "not found" });
  res.json({ archive });
});

inheritanceRouter.put("/families/:id", (req, res) => {
  const archive = ihFamilies.get(req.params.id);
  if (!archive) return res.status(404).json({ error: "not found" });
  Object.assign(archive, req.body || {}, { updatedAt: Date.now() });
  res.json({ archive });
});

inheritanceRouter.post("/families/:id/chapters", (req, res) => {
  const archive = ihFamilies.get(req.params.id);
  if (!archive) return res.status(404).json({ error: "not found" });
  const chapter = { id: `ch-${Date.now()}`, createdAt: Date.now(), ...(req.body || {}) };
  archive.chapters.push(chapter);
  archive.legacyPoints += chapter.legacyPointsAwarded ?? 5;
  archive.updatedAt = Date.now();
  res.json({ archive, chapter });
});

inheritanceRouter.post("/families/:id/members", (req, res) => {
  const archive = ihFamilies.get(req.params.id);
  if (!archive) return res.status(404).json({ error: "not found" });
  const member = { id: `m-${Date.now()}`, ...(req.body || {}) };
  archive.members.push(member);
  archive.updatedAt = Date.now();
  res.json({ archive, member });
});

inheritanceRouter.post("/families/:id/heirlooms", (req, res) => {
  const archive = ihFamilies.get(req.params.id);
  if (!archive) return res.status(404).json({ error: "not found" });
  const heirloom = { id: `h-${Date.now()}`, referencedInChapterIds: [], ...(req.body || {}) };
  archive.heirlooms.push(heirloom);
  archive.updatedAt = Date.now();
  res.json({ archive, heirloom });
});

inheritanceRouter.post("/families/:id/letters", (req, res) => {
  const archive = ihFamilies.get(req.params.id);
  if (!archive) return res.status(404).json({ error: "not found" });
  const letter = { id: `l-${Date.now()}`, ...(req.body || {}) };
  archive.letters.push(letter);
  archive.updatedAt = Date.now();
  res.json({ archive, letter });
});

inheritanceRouter.post("/ai/archival-entry", (req, res) => {
  res.json({
    entry:
      "Something shifted in the house this year. It was recorded. It is part of the family now.",
  });
});

inheritanceRouter.post("/ai/letter", (req, res) => {
  const { acrossYears = "1942 → 1978" } = req.body || {};
  res.json({
    text: `I am writing across ${acrossYears}. I am writing from a house that already knew how this would end.`,
  });
});

/* ============================================================
 *  The Debating Society
 * ============================================================ */

const debatingRouter = express.Router();
const dbStore = makeRoomStore();

debatingRouter.post("/rooms", (req, res) => {
  dbStore.gc();
  const { mode = "civilised" } = req.body || {};
  const code = dbStore.genCode();
  const room = {
    code,
    mode,
    players: [],
    topic: "",
    phase: "lobby",
    speeches: [],
    heckles: [],
    crossExam: null,
    verdict: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  dbStore.rooms.set(code, room);
  res.json({ room });
});

debatingRouter.get("/rooms/:code", (req, res) => {
  const room = dbStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  res.json({ room });
});

debatingRouter.post("/rooms/:code/players", (req, res) => {
  const room = dbStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: "name required" });
  if (room.players.length >= 8) return res.status(400).json({ error: "room full" });
  const player = {
    id: `db-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: String(name).slice(0, 24),
    color: PLAYER_COLORS[room.players.length % PLAYER_COLORS.length],
    side: room.players.length % 2 === 0 ? "for" : "against",
    points: 0,
    heckleToken: true,
    pivotUsed: false,
  };
  room.players.push(player);
  dbStore.touch(room);
  res.json({ room, player });
});

debatingRouter.post("/rooms/:code/speeches", (req, res) => {
  const room = dbStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { playerId, side, phase, text } = req.body || {};
  if (!playerId || !text || !phase) return res.status(400).json({ error: "playerId + phase + text required" });
  const speech = {
    id: `sp-${Date.now()}`,
    playerId,
    side,
    phase,
    text: String(text).slice(0, 800),
    createdAt: Date.now(),
  };
  room.speeches.push(speech);
  dbStore.touch(room);
  res.json({ room, speech });
});

debatingRouter.post("/ai/topic", (req, res) => {
  const { mode = "civilised" } = req.body || {};
  const banks = {
    civilised: ["Should memories be editable?", "Is privacy becoming immoral?"],
    absurd: ["Breakfast is morally suspicious.", "Shoes know too much."],
    personal: ["Should you always tell a friend the truth?"],
  };
  const list = banks[mode] || banks.civilised;
  res.json({ topic: list[Math.floor(Math.random() * list.length)] });
});

debatingRouter.post("/ai/cross-exam", (_req, res) => {
  res.json({ question: "Can you defend the strongest version of your opponent's argument?" });
});

debatingRouter.post("/ai/verdict", (_req, res) => {
  res.json({ verdict: "What this debate revealed is that the room is more frightened than it pretends to be." });
});

/* ============================================================
 *  Cartographers (persistent world archive)
 * ============================================================ */

const cartographersRouter = express.Router();
const cgWorlds = new Map();

cartographersRouter.post("/worlds", (req, res) => {
  const { name } = req.body || {};
  const id = `world-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const archive = {
    id,
    name: name ?? null,
    founding: null,
    layers: [],
    lore: [],
    questions: [],
    contradictions: [],
    events: [],
    expeditions: [],
    depth: { geography: 0, people: 0, history: 0, mythology: 0, culture: 0, mystery: 0 },
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  cgWorlds.set(id, archive);
  res.json({ archive });
});

cartographersRouter.get("/worlds/:id", (req, res) => {
  const archive = cgWorlds.get(req.params.id);
  if (!archive) return res.status(404).json({ error: "not found" });
  res.json({ archive });
});

cartographersRouter.post("/worlds/:id/expeditions", (req, res) => {
  const archive = cgWorlds.get(req.params.id);
  if (!archive) return res.status(404).json({ error: "not found" });
  const exp = { id: `exp-${Date.now()}`, ...(req.body || {}) };
  archive.expeditions.push(exp);
  archive.updatedAt = Date.now();
  res.json({ archive, expedition: exp });
});

cartographersRouter.post("/worlds/:id/questions", (req, res) => {
  const archive = cgWorlds.get(req.params.id);
  if (!archive) return res.status(404).json({ error: "not found" });
  const q = { id: `q-${Date.now()}`, pinned: false, createdAt: Date.now(), ...(req.body || {}) };
  archive.questions.push(q);
  archive.updatedAt = Date.now();
  res.json({ archive, question: q });
});

cartographersRouter.post("/ai/world-event", (_req, res) => {
  res.json({ event: { title: "A Foreign Sail", description: "Three ships of unknown design anchor offshore." } });
});

cartographersRouter.post("/ai/map-render", (_req, res) => {
  res.json({ render: { generatedAt: Date.now(), prompt: "Composite atlas render." } });
});

/* ============================================================
 *  Brilliant Minds
 * ============================================================ */

const mindsRouter = express.Router();
const bmStore = makeRoomStore();

mindsRouter.post("/rooms", (req, res) => {
  bmStore.gc();
  const { universe = "whole" } = req.body || {};
  const code = bmStore.genCode();
  const room = {
    code,
    universe,
    players: [],
    rounds: [],
    roundIdx: 0,
    totalRounds: 5,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  bmStore.rooms.set(code, room);
  res.json({ room });
});

mindsRouter.get("/rooms/:code", (req, res) => {
  const room = bmStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  res.json({ room });
});

mindsRouter.post("/rooms/:code/players", (req, res) => {
  const room = bmStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: "name required" });
  const player = {
    id: `bm-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: String(name).slice(0, 24),
    color: PLAYER_COLORS[room.players.length % PLAYER_COLORS.length],
    points: 0,
  };
  room.players.push(player);
  bmStore.touch(room);
  res.json({ room, player });
});

mindsRouter.post("/rooms/:code/submissions", (req, res) => {
  const room = bmStore.rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: "not found" });
  const { playerId, roundIndex, text } = req.body || {};
  if (!playerId || !text) return res.status(400).json({ error: "playerId + text required" });
  const submission = { id: `sub-${Date.now()}`, playerId, roundIndex, text: String(text).slice(0, 480) };
  room.rounds.push(submission);
  bmStore.touch(room);
  res.json({ room, submission });
});

mindsRouter.post("/ai/question", (req, res) => {
  const { universe = "whole" } = req.body || {};
  res.json({
    question: {
      id: `q-${Date.now()}`,
      universe,
      prompt: "Which mammal is the only one capable of true flight?",
      answer: "Bat",
    },
  });
});

mindsRouter.post("/ai/rabbit-hole", (_req, res) => {
  res.json({
    title: "Why honey never spoils",
    body: "Bee enzymes strip water from microbes; honey from 3,000-year-old Egyptian tombs was still edible.",
  });
});

/* ============================================================
 *  The Oracle
 * ============================================================ */

const oracleRouter = express.Router();
const orSessions = new Map();

oracleRouter.post("/sessions", (req, res) => {
  const { depth = "middle" } = req.body || {};
  const id = `or-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const session = {
    id,
    depth,
    players: [],
    questions: [],
    answers: [],
    guesses: [],
    lastQuestionAnswers: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  orSessions.set(id, session);
  res.json({ session });
});

oracleRouter.get("/sessions/:id", (req, res) => {
  const session = orSessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: "not found" });
  res.json({ session });
});

oracleRouter.post("/sessions/:id/questions", (req, res) => {
  const session = orSessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: "not found" });
  const q = { id: `q-${Date.now()}`, createdAt: Date.now(), ...(req.body || {}) };
  session.questions.push(q);
  session.updatedAt = Date.now();
  res.json({ session, question: q });
});

oracleRouter.post("/sessions/:id/answers", (req, res) => {
  const session = orSessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: "not found" });
  const a = { id: `a-${Date.now()}`, createdAt: Date.now(), ...(req.body || {}) };
  session.answers.push(a);
  session.updatedAt = Date.now();
  res.json({ session, answer: a });
});

oracleRouter.post("/sessions/:id/guesses", (req, res) => {
  const session = orSessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: "not found" });
  const g = { id: `g-${Date.now()}`, createdAt: Date.now(), ...(req.body || {}) };
  session.guesses.push(g);
  session.updatedAt = Date.now();
  res.json({ session, guess: g });
});

oracleRouter.post("/ai/vizzy-question", (req, res) => {
  const { depth = "middle" } = req.body || {};
  const pools = {
    surface: ["What's a small lie this room would forgive?"],
    middle: ["What gets unspoken that everyone here already knows?"],
    deep: ["What kind of silence has this group already learned to share?"],
  };
  const list = pools[depth] || pools.middle;
  res.json({ question: list[Math.floor(Math.random() * list.length)] });
});

oracleRouter.post("/ai/courage-reason", (_req, res) => {
  res.json({ reason: "It admitted what most people only hint at." });
});

export {
  paletteWarsRouter,
  dreamArchitectRouter,
  museumRouter,
  verdictRouter,
  oneWordRouter,
  frameRouter,
  inheritanceRouter,
  debatingRouter,
  cartographersRouter,
  mindsRouter,
  oracleRouter,
};
