// ===== server.js =====

// ===== Core Imports =====
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import expressLayouts from "express-ejs-layouts";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
import { sequelize, dbUrl } from "./config/db.js"; // ✅ PostgreSQL (Sequelize)
import blogRoutes from "./routes/blogRoutes.js";
import creativeToolsRoutes from "./routes/creativeTools.js";
import newCreativeToolsRoutes from "./routes/newCreativeTools.js";
import wizzyRoutes from "./routes/wizzyRoutes.js";
import vizzyRoutes from "./routes/vizzyRoutes.js";
import vizzyStudioRoutes from "./routes/vizzyStudioRoutes.js";
import dreamRoutes from "./routes/dreamRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js";
import worldRoutes from "./routes/worldRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import vizzyCanvasRoutes from "./routes/vizzyCanvasRoutes.js";
import dailyCuratorRoutes from "./routes/dailyCuratorRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import storyForgeRoutes from "./routes/storyForgeRoutes.js";
import {
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
} from "./routes/flagshipGamesRoutes.js";

import solarWindRouter from "./routes/solarWind.js";
import earthquakesRouter from "./routes/earthquakes.js";
import agenticPresetsRouter from "./routes/agenticPresets.js";
import soundscapeRoutes from "./routes/soundscapeRoutes.js";
import creativeJournalRoutes from "./routes/creativeJournalRoutes.js";
import ambientClockRoutes from "./routes/ambientClockRoutes.js";
import enterpriseRoutes from "./routes/enterpriseRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import { User } from "./models/User.js";
import Stripe from "stripe";
import client from "./redisClient.js";

// ── Vizzy 2.0 — New Agentic Models (auto-synced by sequelize.sync below) ───
import "./models/VizzyMemory.js";
import "./models/VizzyAgentSession.js";
import "./models/VizzyStudioSession.js";
import "./models/VizzySystemCard.js";
import "./models/UserPersona.js";
import "./models/UserOnboarding.js";
import "./models/HomeMember.js";
import "./models/MediaTracks.js";
import "./models/UploadedMedia.js";
import "./models/Collection.js";
import "./models/DeckovizCuration.js";
import "./models/UserFavoritePrompt.js";
import "./models/UserSavedArtwork.js";
import "./models/FilmProject.js";
import { seedSystemCards } from "./seeds/systemCardSeed.js";


// ===== Startup Logic (Background) =====
(async () => {
  // 1. Database sync runs immediately and independently
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected via Sequelize.");
    await sequelize.sync({ alter: true });
    // Seed system cards after DB is ready (safe to re-run — uses upsert)
    await seedSystemCards();
  } catch (error) {
    console.warn("❌ Database connection failed. Non-DB features will still work.", error.message);
  }

  // 2. Redis test run separately so it never blocks DB operations
  try {
    if (client.isOpen) {
      await client.set("hello", "Dekoviz");
      console.log(await client.get("hello"));
    } else {
      console.warn("⚠️ Redis client is not connected, skipping initial test.");
    }
  } catch (redisErr) {
    console.warn("⚠️ Redis not available, skipping initial test.");
  }
})();

// DB logic moved to background IIFE above
const app = express();
const PORT = process.env.PORT || 5000;
import fs from "fs";
// ===== Resolve __dirname (for ES modules) =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logStream = fs.createWriteStream(path.join(__dirname, "server.log"), { flags: "a" });
const originalLog = console.log;
const originalError = console.error;

console.log = (...args) => {
    const msg = `[${new Date().toISOString()}] LOG: ${args.join(" ")}\n`;
    originalLog(...args);
    logStream.write(msg);
};

console.error = (...args) => {
    const msg = `[${new Date().toISOString()}] ERROR: ${args.join(" ")}\n`;
    originalError(...args);
    logStream.write(msg);
};

app.listen(PORT, () =>
  console.log(`🚀 Unified server running on http://localhost:${PORT}`)
);

// DB logic moved to background IIFE above

// ===== Stripe Configuration =====
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ||
    "sk_test_51S2RGMJ8RKkMEZ712u787r6VLZMz1XL7ZfjarZSFaU1Yat2ZjToH7D9pcV5iO5h4rA6DtxV5F2QbGxa7nr5b9iCG00B5k1Gdsa"
);

// ===== Middlewares =====
app.use(bodyParser.urlencoded({ extended: true, limit: "200mb" }));
app.use(bodyParser.json({ limit: "200mb" }));
app.use(methodOverride("_method"));
app.use(expressLayouts);

// ===== Enable CORS for Frontend =====
const allowedOrigins = [
  "http://localhost:5173",
  "https://deploy-preview-5--tubular-scone-336b8c.netlify.app",
  "https://deckoviz.netlify.app" // Add your main production domain here too
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Check if the origin is in our allowed list or is a netlify preview
      if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".netlify.app")) {
        callback(null, true);
      } else {
        // Fallback: in development/preview, we can be more permissive
        callback(null, true); 
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
  })
);

// Static files AFTER CORS so generated images get proper headers
app.use(express.static(path.join(__dirname, "public")));

// Dedicated download endpoint — forces Content-Disposition: attachment
app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  // Sanitize: only allow alphanumeric, underscores, dots, hyphens
  if (!/^[a-zA-Z0-9_.\-]+$/.test(filename)) {
    return res.status(400).json({ error: "Invalid filename" });
  }
  const filePath = path.join(__dirname, "public/generated", filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-Type", "image/jpeg");
  res.sendFile(filePath);
});

// ===== View Engine (EJS) =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // ✅ Fixed path
app.set("layout", "layout");

// ===== HEALTH CHECK =====
// Lightweight liveness + DB ping for uptime monitors and Render health checks
app.get("/api/health", async (_req, res) => {
  const startedAt = Date.now();
  let db = "unknown";
  try {
    await sequelize.authenticate();
    db = "ok";
  } catch {
    db = "down";
  }
  res.json({
    status: "ok",
    db,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    latencyMs: Date.now() - startedAt,
  });
});

// ===== DEBUG LOGS ENDPOINT =====
app.get("/api/logs", (req, res) => {
  const logPath = path.join(__dirname, "server.log");
  if (fs.existsSync(logPath)) {
    const logs = fs.readFileSync(logPath, "utf8");
    res.header("Content-Type", "text/plain");
    res.send(logs);
  } else {
    res.status(404).send("No log file found");
  }
});

// ===== DEBUG DATABASE URL ENDPOINT =====
app.get("/api/debug-db-url", async (req, res) => {
  let maskedUrl = "N/A";
  if (dbUrl) {
    try {
      const u = new URL(dbUrl);
      if (u.password) u.password = "********";
      maskedUrl = u.toString();
    } catch {
      maskedUrl = dbUrl.replace(/:([^:@]+)@/, ":********@");
    }
  }

  let connectionStatus = "unknown";
  let connectionError = null;
  try {
    await sequelize.authenticate();
    connectionStatus = "connected successfully";
  } catch (err) {
    connectionStatus = "failed";
    connectionError = {
      message: err.message,
      name: err.name,
      original: err.original ? err.original.message : null,
      parent: err.parent ? err.parent.message : null,
    };
  }

  res.json({
    env: {
      DATABASE_URL_exists: !!process.env.DATABASE_URL,
      PG_HOST_exists: !!process.env.PG_HOST,
      PG_HOST: process.env.PG_HOST || null,
      PG_PORT: process.env.PG_PORT || null,
      PG_USER: process.env.PG_USER || null,
      PG_DATABASE: process.env.PG_DATABASE || null,
    },
    resolvedDbUrlMasked: maskedUrl,
    connectionStatus,
    connectionError,
  });
});


// ===== ROUTES =====
// ✅ API routes (for frontend JSON calls)
app.use("/api", blogRoutes); // Example: https://deckoviz-demo.onrender.com/api/blog
app.use("/api", creativeToolsRoutes); // Creative Tools Hub (existing)
app.use("/api", newCreativeToolsRoutes); // New Creative Tools
app.use("/api/wizzy", wizzyRoutes);
app.use("/api/vizzy", vizzyRoutes);
app.use("/api/vizzy-studio", vizzyStudioRoutes);
app.use("/api/vizzy-canvas", vizzyCanvasRoutes);
app.use("/api/daily-curator", dailyCuratorRoutes);
app.use("/api", uploadRoutes);
app.use("/api", dreamRoutes);
app.use("/api/memory", memoryRoutes);
app.use("/api", worldRoutes);

app.use("/api/solar-wind", solarWindRouter);
app.use("/api/earthquakes", earthquakesRouter);
app.use("/api/agentic-presets", agenticPresetsRouter);
app.use("/api/soundscapes", soundscapeRoutes);
app.use("/api/creative-journal", creativeJournalRoutes);
app.use("/api/ambient-clock", ambientClockRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/flagship-games/story-forge", storyForgeRoutes);
app.use("/api/flagship-games/palette-wars", paletteWarsRouter);
app.use("/api/flagship-games/dream-architect", dreamArchitectRouter);
app.use("/api/flagship-games/museum-of-us", museumRouter);
app.use("/api/flagship-games/vizzys-verdict", verdictRouter);
app.use("/api/flagship-games/one-word", oneWordRouter);
app.use("/api/flagship-games/world-in-frame", frameRouter);
app.use("/api/flagship-games/inheritance", inheritanceRouter);
app.use("/api/flagship-games/debating-society", debatingRouter);
app.use("/api/flagship-games/cartographers", cartographersRouter);
app.use("/api/flagship-games/brilliant-minds", mindsRouter);
app.use("/api/flagship-games/oracle", oracleRouter);

// ✅ Enterprise Webapp routes
app.use("/api", enterpriseRoutes);

// ✅ Home Suite routes
app.use("/api", homeRoutes);


// ✅ EJS routes (for admin panel / UI)
app.use("/", blogRoutes); // Example: https://deckoviz-demo.onrender.com/blogs or /add

// ===== Root Message =====
app.get("/", (req, res) => {
  res.redirect("/blogs"); // 👈 automatically go to blogs page
});

// ======================================================================
// ===================== STRIPE PAYMENT ENDPOINTS =======================
// ======================================================================

// --- Create Checkout Session ---
app.post("/create-checkout-session", async (req, res) => {
  const { email, productName, amount, metadata } = req.body;

  if (!email || !productName || !amount) {
    return res.status(400).json({ error: "Missing required information" });
  }

  try {
    // Find or create a Stripe customer
    let customer;
    const existingCustomers = await stripe.customers.list({ email, limit: 1 });
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({ email });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: productName },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { ...metadata, userId: req.body.userId || "" },
      mode: "payment",
      success_url: `${req.headers.origin || "http://localhost:5173"}/order-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || "http://localhost:5173"}/`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Failed to create payment session." });
  }
});


// --- Fulfill Credits after Payment ---
app.post("/fulfill-credits", async (req, res) => {
  const { session_id } = req.body;
  if (!session_id) return res.status(400).json({ error: "Missing session_id" });

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status === "paid") {
      const userId = session.metadata?.userId;
      const creditsToAdd = parseInt(session.metadata?.credits) || 0;
      
      if (userId && creditsToAdd > 0) {
        // You would typically check if this session was already fulfilled
        // Here we assume client calls it once or we check a db flag
        const user = await User.findByPk(userId);
        if (user) {
          user.credits += creditsToAdd;
          await user.save();
          return res.json({ success: true, credits: user.credits });
        }
      }
    }
    res.status(400).json({ error: "Payment not completed or missing metadata" });
  } catch (error) {
    console.error("Fulfill error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// --- Get Order Details After Payment ---
app.get("/order-details", async (req, res) => {
  const sessionId = req.query.session_id;
  if (!sessionId) {
    return res.status(400).json({ error: "Session ID is required." });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    });

    res.json({
      customerName: session.metadata?.customerName,
      customerEmail: session.customer_details?.email,
      shippingAddress: session.metadata?.shipping,
      orderNumber: session.id,
      orderDate: new Date(session.created * 1000).toLocaleDateString(),
      total: (session.amount_total / 100).toFixed(2),
      productName: session.line_items.data[0].price.product.name,
      productDescription: `${session.metadata?.frameType || ""} ${
        session.metadata?.subscription || ""
      }`,
    });
  } catch (error) {
    console.error("Error retrieving session:", error);
    res.status(500).json({ error: "Failed to retrieve order details." });
  }
});

// ======================================================================
// ========================== SERVER START ==============================
// ======================================================================
// Server already started above
