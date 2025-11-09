// ===== server.js =====

// ===== Core Imports =====
import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import expressLayouts from "express-ejs-layouts";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { sequelize } from "./config/db.js"; // ✅ PostgreSQL (Sequelize)
import blogRoutes from "./routes/blogRoutes.js";
import Stripe from "stripe";

dotenv.config();
const app = express();

// ===== Resolve __dirname (for ES modules) =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== Connect to PostgreSQL (Sequelize) =====
try {
  await sequelize.authenticate();
  console.log("✅ PostgreSQL connected via Sequelize.");
  await sequelize.sync(); // Optional: { alter: true } during dev
} catch (error) {
  console.error("❌ Database connection failed:", error);
  process.exit(1);
}

// ===== Stripe Configuration =====
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ||
    "sk_test_51S2RGMJ8RKkMEZ712u787r6VLZMz1XL7ZfjarZSFaU1Yat2ZjToH7D9pcV5iO5h4rA6DtxV5F2QbGxa7nr5b9iCG00B5k1Gdsa"
);

// ===== Middlewares =====
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);

// ===== Enable CORS for Frontend =====
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ===== View Engine (EJS) =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // ✅ Fixed path
app.set("layout", "layout");

// ===== ROUTES =====
// ✅ API routes (for frontend JSON calls)
app.use("/api", blogRoutes); // Example: http://localhost:5000/api/blog

// ✅ EJS routes (for admin panel / UI)
app.use("/", blogRoutes); // Example: http://localhost:5000/blogs or /add

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
      success_url:
        "http://localhost:5173/order-confirmed?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/",
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Unified server running on http://localhost:${PORT}`)
);
