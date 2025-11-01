import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import expressLayouts from "express-ejs-layouts";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import cors from "cors"; // ✅ Import cors

dotenv.config();

const app = express();

// ===== Connect to MongoDB =====
connectDB();

// ===== Middlewares =====
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(expressLayouts);

// ===== Enable CORS for localhost:5173 =====
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
// ✅ API Route (for frontend)
app.use("/api/blog", blogRoutes);

// ✅ Admin CMS Routes
app.use("/", blogRoutes);

// ===== Root Redirect =====
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// ===== Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
