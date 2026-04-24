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
import { sequelize } from "./config/db.js"; // ✅ PostgreSQL (Sequelize)
import blogRoutes from "./routes/blogRoutes.js";
import creativeToolsRoutes from "./routes/creativeTools.js";
import newCreativeToolsRoutes from "./routes/newCreativeTools.js";
import wizzyRoutes from "./routes/wizzyRoutes.js";
import dreamRoutes from "./routes/dreamRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js";
import Stripe from "stripe";
import client from "./redisClient.js";



// ===== Startup Logic (Background) =====
(async () => {
  try {
    await client.set("hello", "Dekoviz");
    console.log(await client.get("hello"));
  } catch (redisErr) {
    console.warn("⚠️ Redis not available, skipping initial test.");
  }

  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected via Sequelize.");
    await sequelize.sync();
  } catch (error) {
    console.warn("❌ Database connection failed. Non-DB features will still work.", error.message);
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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

// ===== ROUTES =====
// ✅ API routes (for frontend JSON calls)
app.use("/api", blogRoutes); // Example: https://deckoviz-demo.onrender.com/api/blog
app.use("/api", creativeToolsRoutes); // Creative Tools Hub (existing)
app.use("/api", newCreativeToolsRoutes); // New Creative Tools
app.use("/api/wizzy", wizzyRoutes);
app.use("/api", dreamRoutes);
app.use("/api/memory", memoryRoutes);

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
      metadata: metadata || {},
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
