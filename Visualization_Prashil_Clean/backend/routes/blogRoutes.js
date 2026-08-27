// ===== routes/blogRoutes.js =====
import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

// ===================================================================
// ======================= FRONTEND API ===============================
// ===================================================================

// ✅ GET: All blogs (for API / frontend)
router.get("/api/blog", async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      order: [["id", "DESC"]],
    });
    res.json(blogs);
  } catch (err) {
    console.error("❌ Error fetching blogs:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===================================================================
// ======================= ADMIN DASHBOARD ============================
// ===================================================================

// ✅ Render all blogs (EJS view)
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.findAll({ order: [["id", "DESC"]] });
    res.render("blogs", { title: "All Blogs", blogs });
  } catch (err) {
    console.error("❌ Error rendering blogs:", err);
    res.status(500).send("Error loading blogs");
  }
});

// ✅ Render add-blog form
router.get("/add", (req, res) => {
  res.render("addBlog", { title: "Add Blog" });
});

// ✅ Add new blog post
router.post("/add", async (req, res) => {
  try {
    const {
      tag,
      tagColor,
      title,
      description,
      readTime,
      date,
      image,
      gradient,
      size,
    } = req.body;

    await Blog.create({
      tag,
      tagColor,
      title,
      description,
      readTime,
      date,
      image,
      gradient,
      size,
    });

    res.redirect("/blogs");
  } catch (err) {
    console.error("❌ Error adding blog:", err);
    res.status(500).send("Error adding blog");
  }
});

// ✅ Delete a blog post
router.delete("/delete/:id", async (req, res) => {
  try {
    await Blog.destroy({ where: { id: req.params.id } });
    res.redirect("/blogs");
  } catch (err) {
    console.error("❌ Error deleting blog:", err);
    res.status(500).send("Error deleting blog");
  }
});

export default router;
