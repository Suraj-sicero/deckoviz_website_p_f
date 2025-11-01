import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

// ===== FRONTEND API =====
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ _id: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== ADMIN DASHBOARD =====
router.get("/blogs", async (req, res) => {
  const blogs = await Blog.find().sort({ _id: -1 });
  res.render("blog", { title: "All Blogs", blogs });
});

// Add Blog Form
router.get("/add", (req, res) => {
  res.render("addBlog", { title: "Add Blog" });
});

// Save Blog
router.post("/add", async (req, res) => {
  const { tag, tagColor, title, description, readTime, date, image, gradient, size } = req.body;
  await Blog.create({ tag, tagColor, title, description, readTime, date, image, gradient, size });
  res.redirect("/blogs");
});

// Delete Blog
router.delete("/delete/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect("/blogs");
});

export default router;
