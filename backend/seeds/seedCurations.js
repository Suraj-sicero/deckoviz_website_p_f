import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { sequelize } from "../config/db.js";
import DeckovizCuration from "../models/DeckovizCuration.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ARTWORK_DIR = path.join(__dirname, "..", "curated_artworks");

// Configure Cloudinary
const CLOUDINARY_CONFIGURED = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);

if (CLOUDINARY_CONFIGURED) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

async function seed() {
  console.log("🎨 Starting Deckoviz Curations seeding (recursive scan)...");

  if (!fs.existsSync(ARTWORK_DIR)) {
    console.warn(`⚠️  Directory not found: "${ARTWORK_DIR}". Creating empty directory.`);
    fs.mkdirSync(ARTWORK_DIR, { recursive: true });
    console.log(`👉 Please download your artworks, put them inside the folder: "${ARTWORK_DIR}" and re-run this script.`);
    process.exit(0);
  }

  await sequelize.authenticate();
  console.log("✅ Database authenticated.");

  console.log("🔄 Synchronizing database tables...");
  await sequelize.sync({ alter: true });
  console.log("✅ Database tables synchronized.");

  // Retrieve subdirectories
  const items = fs.readdirSync(ARTWORK_DIR);
  const categories = items.filter(item => {
    return fs.statSync(path.join(ARTWORK_DIR, item)).isDirectory();
  });

  if (categories.length === 0) {
    console.log("⚠️  No subdirectories found in curated_artworks folder. Checking top-level instead...");
    // Fallback: search top-level if no folders exist
    const topFiles = fs.readdirSync(ARTWORK_DIR).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return [".png", ".jpg", ".jpeg", ".webp", ".gif"].includes(ext);
    });
    if (topFiles.length === 0) {
      console.log("⚠️  No image files found. Please populate curated_artworks folder.");
      process.exit(0);
    }
    await processFiles(topFiles, ARTWORK_DIR, "Generative");
  } else {
    console.log(`📂 Found ${categories.length} categories to seed: ${categories.join(", ")}`);
    for (const category of categories) {
      const categoryDir = path.join(ARTWORK_DIR, category);
      const files = fs.readdirSync(categoryDir).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return [".png", ".jpg", ".jpeg", ".webp", ".gif"].includes(ext);
      });
      console.log(`\n📁 Category: "${category}" - Found ${files.length} images.`);
      await processFiles(files, categoryDir, category);
    }
  }

  console.log("\n✨ Done! Seeding complete.");
  process.exit(0);
}

async function processFiles(files, directoryPath, category) {
  let uploadedCount = 0;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(directoryPath, file);
    const title = path.basename(file, path.extname(file))
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());

    console.log(`[${i + 1}/${files.length}] Processing "${file}" under "${category}"...`);

    let imageUrl = "";

    if (CLOUDINARY_CONFIGURED) {
      try {
        console.log(`  ☁️  Uploading "${file}" to Cloudinary...`);
        const result = await cloudinary.uploader.upload(filePath, {
          folder: `deckoviz/curations/${category.replace(/\s+/g, "_")}`,
          resource_type: "image",
        });
        imageUrl = result.secure_url;
        console.log(`  ✅ Uploaded successfully: ${imageUrl}`);
      } catch (uploadErr) {
        console.error(`  ❌ Failed to upload "${file}" to Cloudinary:`, uploadErr.message);
        imageUrl = `https://picsum.photos/id/${100 + i}/1200/800`;
        console.log(`  ℹ️  Falling back to mock URL for this record: ${imageUrl}`);
      }
    } else {
      console.warn("  ⚠️  Cloudinary not configured! Using mock URL placeholder.");
      imageUrl = `https://picsum.photos/id/${100 + i}/1200/800`;
    }

    // Try finding existing curation or create new
    const [curation, created] = await DeckovizCuration.findOrCreate({
      where: { title, category },
      defaults: {
        title,
        artist: "Deckoviz Curated",
        imageUrl,
        category,
        style: category === "Abstract Expressionism" ? "Abstract" : "Creative",
        tags: JSON.stringify(["curated", "seed", category.toLowerCase()]),
        description: `Seed artwork curated for the Deckoviz canvas platform from the ${category} collection.`,
        isFeatured: i < 3,
        displayOrder: i,
      }
    });

    if (created) {
      console.log(`  🎉 Created curation record for "${title}"`);
      uploadedCount++;
    } else {
      console.log(`  ℹ️  Record already exists for "${title}" under "${category}", updating imageUrl.`);
      curation.imageUrl = imageUrl;
      await curation.save();
    }
  }
}

seed().catch(err => {
  console.error("❌ Seeding failed with error:", err);
  process.exit(1);
});
