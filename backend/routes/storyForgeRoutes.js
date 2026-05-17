/**
 * Story Forge — backend routes
 *
 * In-memory room / story state with mock AI endpoints so the frontend can later
 * be migrated from local-only state to server-synced multiplayer without
 * changing the client contract.
 *
 * Endpoints
 *  POST   /api/flagship-games/story-forge/rooms                   -> create room
 *  GET    /api/flagship-games/story-forge/rooms/:code             -> fetch room
 *  POST   /api/flagship-games/story-forge/rooms/:code/players     -> join
 *  POST   /api/flagship-games/story-forge/rooms/:code/start       -> start game
 *  POST   /api/flagship-games/story-forge/rooms/:code/sentences   -> submit sentence
 *  POST   /api/flagship-games/story-forge/rooms/:code/vote        -> cast vote
 *  POST   /api/flagship-games/story-forge/rooms/:code/twist       -> draw a twist
 *  POST   /api/flagship-games/story-forge/rooms/:code/ending      -> finalize ending
 *  POST   /api/flagship-games/story-forge/ai/scene                -> mock scene generation
 *  POST   /api/flagship-games/story-forge/ai/narrate              -> mock narration text
 *  POST   /api/flagship-games/story-forge/ai/title                -> mock title
 */

import express from "express";

const router = express.Router();

const rooms = new Map();

const ROOM_TTL_MS = 1000 * 60 * 60 * 6; // 6h
const PLAYER_COLORS = [
  "#a78bfa",
  "#22d3ee",
  "#f472b6",
  "#fbbf24",
  "#10b981",
  "#fb7185",
];

function gcRooms() {
  const now = Date.now();
  for (const [code, room] of rooms.entries()) {
    if (now - room.updatedAt > ROOM_TTL_MS) rooms.delete(code);
  }
}

function genRoomCode() {
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

function notFound(res) {
  return res.status(404).json({ error: "Room not found" });
}

const TWIST_POOL = {
  mystery: [
    "A child appears who knows everyone's real name.",
    "Someone finds a photograph of the group, taken yesterday.",
    "A door that was locked is now open. A door that was open is now gone.",
  ],
  emotional: [
    "Someone confesses something they meant to keep forever.",
    "An old letter arrives — addressed to a name nobody used to know.",
  ],
  cosmic: [
    "The sky turns the colour of old copper.",
    "Time slips backward for thirty-seven seconds.",
  ],
  betrayal: [
    "One of the characters is lying.",
    "The trusted one knows more than they have said.",
  ],
  weather: [
    "Snow begins to fall, although it shouldn't.",
    "The rain begins to fall upward.",
  ],
  horror: [
    "Something in the corner is breathing in their rhythm.",
    "The reflection blinks first.",
  ],
  fantasy: [
    "A talking creature offers a single, dangerous favor.",
    "An object in the room hums when it is told the truth.",
  ],
  psychological: [
    "One of them is dreaming. They don't know who.",
    "Memory bends. A shared past begins to disagree with itself.",
  ],
};

function drawTwist(bias = [], usedIds = []) {
  const cats = Object.keys(TWIST_POOL);
  const pool = [...bias.filter((b) => cats.includes(b)), ...cats];
  for (let i = 0; i < 25; i++) {
    const cat = pool[Math.floor(Math.random() * pool.length)];
    const list = TWIST_POOL[cat];
    const text = list[Math.floor(Math.random() * list.length)];
    const id = `${cat}:${text}`;
    if (!usedIds.includes(id)) return { id, category: cat, text, intensity: 2 };
  }
  const cat = cats[0];
  return { id: `${cat}:fallback:${Date.now()}`, category: cat, text: TWIST_POOL[cat][0], intensity: 2 };
}

/* ---------- room endpoints ---------- */

router.post("/rooms", (req, res) => {
  gcRooms();
  const { genreId = null, mode = "multiplayer" } = req.body || {};
  const code = genRoomCode();
  const room = {
    code,
    genreId,
    mode,
    players: [],
    phase: "lobby",
    round: 0,
    roundLimit: 5,
    sentences: [],
    rounds: [],
    activeTwist: null,
    twistsUsed: [],
    endingTone: null,
    endingText: null,
    storyTitle: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  rooms.set(code, room);
  res.json({ room });
});

router.get("/rooms/:code", (req, res) => {
  const room = rooms.get(req.params.code.toUpperCase());
  if (!room) return notFound(res);
  res.json({ room });
});

router.post("/rooms/:code/players", (req, res) => {
  const room = rooms.get(req.params.code.toUpperCase());
  if (!room) return notFound(res);
  const { name } = req.body || {};
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "name required" });
  }
  if (room.players.length >= 6) {
    return res.status(400).json({ error: "room full" });
  }
  const player = {
    id: `player-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: name.slice(0, 24),
    color: PLAYER_COLORS[room.players.length % PLAYER_COLORS.length],
    ready: false,
    resonance: 0,
  };
  room.players.push(player);
  touch(room);
  res.json({ room, player });
});

router.post("/rooms/:code/start", (req, res) => {
  const room = rooms.get(req.params.code.toUpperCase());
  if (!room) return notFound(res);
  const { genreId } = req.body || {};
  if (genreId) room.genreId = genreId;
  room.phase = "round";
  room.round = 1;
  touch(room);
  res.json({ room });
});

router.post("/rooms/:code/sentences", (req, res) => {
  const room = rooms.get(req.params.code.toUpperCase());
  if (!room) return notFound(res);
  const { playerId, text } = req.body || {};
  if (!playerId || !text) {
    return res.status(400).json({ error: "playerId + text required" });
  }
  if (!room.players.some((p) => p.id === playerId)) {
    return res.status(400).json({ error: "unknown player" });
  }
  const sentence = {
    id: `s-${room.round}-${Date.now()}`,
    playerId,
    text: String(text).slice(0, 240),
    round: room.round,
    voteCount: 0,
  };
  room.sentences.push(sentence);
  touch(room);
  res.json({ room, sentence });
});

router.post("/rooms/:code/vote", (req, res) => {
  const room = rooms.get(req.params.code.toUpperCase());
  if (!room) return notFound(res);
  const { sentenceId } = req.body || {};
  const sentence = room.sentences.find((s) => s.id === sentenceId);
  if (!sentence) return res.status(400).json({ error: "sentence not found" });
  sentence.voteCount += 1;
  const player = room.players.find((p) => p.id === sentence.playerId);
  if (player) player.resonance += 1;
  touch(room);
  res.json({ room });
});

router.post("/rooms/:code/twist", (req, res) => {
  const room = rooms.get(req.params.code.toUpperCase());
  if (!room) return notFound(res);
  const { bias = [] } = req.body || {};
  const twist = drawTwist(bias, room.twistsUsed);
  room.activeTwist = twist;
  room.twistsUsed.push(twist.id);
  room.phase = "twist";
  touch(room);
  res.json({ twist, room });
});

router.post("/rooms/:code/advance", (req, res) => {
  const room = rooms.get(req.params.code.toUpperCase());
  if (!room) return notFound(res);
  const completed = {
    round: room.round,
    sentences: room.sentences.filter((s) => s.round === room.round),
    twist: room.activeTwist,
  };
  room.rounds.push(completed);
  room.round += 1;
  room.activeTwist = null;
  if (room.round > room.roundLimit) {
    room.phase = "ending-vote";
  } else {
    room.phase = "round";
  }
  touch(room);
  res.json({ room });
});

router.post("/rooms/:code/extend", (req, res) => {
  const room = rooms.get(req.params.code.toUpperCase());
  if (!room) return notFound(res);
  room.roundLimit += 2;
  touch(room);
  res.json({ room });
});

router.post("/rooms/:code/ending", (req, res) => {
  const room = rooms.get(req.params.code.toUpperCase());
  if (!room) return notFound(res);
  const { tone = "ambiguous", text, title } = req.body || {};
  room.endingTone = tone;
  room.endingText = text ?? room.endingText;
  room.storyTitle = title ?? room.storyTitle;
  room.phase = "ending";
  touch(room);
  res.json({ room });
});

/* ---------- mock AI endpoints (provider-ready stubs) ---------- */

router.post("/ai/scene", (req, res) => {
  const { round = 1, genreId = "dark-fable", storySoFar = [], twist = null } = req.body || {};
  const seed = ((round * 37) + (twist?.id?.length || 0)) % 100;
  res.json({
    scene: {
      id: `scene-${round}-${Date.now()}`,
      genreId,
      prompt: `Cinematic ${genreId} illustration. Story so far: ${storySoFar.slice(-2).join(" ")}.${
        twist ? ` Twist: ${twist.text}` : ""
      }`,
      seed,
    },
  });
});

router.post("/ai/narrate", (req, res) => {
  const { text = "", type = "sentence" } = req.body || {};
  res.json({
    chunks: text
      .split(/\s+/)
      .reduce((acc, w) => {
        if (acc.length === 0) acc.push(w);
        else if (acc[acc.length - 1].split(" ").length < 4) acc[acc.length - 1] += ` ${w}`;
        else acc.push(w);
        return acc;
      }, [])
      .map((chunk) => ({ text: chunk, delayMs: type === "ending" ? 110 : 70 })),
  });
});

router.post("/ai/title", (req, res) => {
  const { storyLines = [], genreId = "dark-fable" } = req.body || {};
  const seed = storyLines.find((l) => l.length > 12) || "Unwritten Hour";
  const noun = seed
    .replace(/[^a-zA-Z\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 4)[0];
  const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : "Lantern");
  const titles = [
    `The ${cap(noun)} of ${genreId.split("-")[0]}`,
    `Where the ${cap(noun)} Goes`,
    `On the Night of the ${cap(noun)}`,
  ];
  res.json({ title: titles[Math.floor(Math.random() * titles.length)] });
});

export default router;
