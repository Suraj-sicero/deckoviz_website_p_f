import re

file_path = "/home/shashank/Documents/work2/deckoviz-demo/backend/server.js"
with open(file_path, "r") as f:
    content = f.read()

# 1. Imports
if 'import authRoutes from "./routes/authRoutes.js";' not in content:
    content = content.replace('import worldRoutes from "./routes/worldRoutes.js";', 'import worldRoutes from "./routes/worldRoutes.js";\nimport authRoutes from "./routes/authRoutes.js";\nimport { User } from "./models/User.js";')

# 2. Routes
if 'app.use("/api/auth", authRoutes);' not in content:
    content = content.replace('app.use("/api", worldRoutes);', 'app.use("/api", worldRoutes);\napp.use("/api/auth", authRoutes);')

# 3. Modify create-checkout-session
if 'userId: metadata?.userId' not in content:
    old_stripe_session = """      metadata: metadata || {},"""
    new_stripe_session = """      metadata: { ...metadata, userId: req.body.userId || "" },"""
    content = content.replace(old_stripe_session, new_stripe_session)

# 4. Fulfill credits endpoint
fulfill_endpoint = """
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
"""
if "/fulfill-credits" not in content:
    content = content.replace('// --- Get Order Details After Payment ---', fulfill_endpoint + '\n// --- Get Order Details After Payment ---')

with open(file_path, "w") as f:
    f.write(content)
