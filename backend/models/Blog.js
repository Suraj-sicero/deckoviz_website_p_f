import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  tag: String,
  tagColor: String,
  title: String,
  description: String,
  readTime: String,
  date: { type: Date, required: true }, // ✅ store as Date object
  image: String,
  gradient: String,
  size: String,
});

export default mongoose.model("Blog", blogSchema);
