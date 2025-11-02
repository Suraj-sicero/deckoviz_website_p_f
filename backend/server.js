// ===== server.js =====

// Core Imports
import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import expressLayouts from "express-ejs-layouts";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import Stripe from "stripe";

dotenv.config();

const app = express();

// ===== Connect to MongoDB =====
connectDB();

// ===== Stripe Configuration =====
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_51S2RGMJ8RKkMEZ712u787r6VLZMz1XL7ZfjarZSFaU1Yat2ZjToH7D9pcV5iO5h4rA6DtxV5F2QbGxa7nr5b9iCG00B5k1Gdsa");

// ===== Middlewares =====
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(expressLayouts);

// ===== Enable CORS for Frontend =====
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ===== View Engine =====
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "layout");

// ===== Routes =====
// Blog & CMS
app.use("/api/blog", blogRoutes);
app.use("/", blogRoutes);

// ===== Root Redirect =====
app.get("/", (req, res) => {
  res.redirect("/blogs");
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
            currency: "usd", // Change to 'inr' if needed
            product_data: { name: productName },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      metadata: metadata || {},
      mode: "payment",
      success_url: "http://localhost:5173/order-confirmed?session_id={CHECKOUT_SESSION_ID}",
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
      productDescription: `${session.metadata?.frameType || ""} ${session.metadata?.subscription || ""}`,
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
app.listen(PORT, () => console.log(`🚀 Unified server running on http://localhost:${PORT}`));
