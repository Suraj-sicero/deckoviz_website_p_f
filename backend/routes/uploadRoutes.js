import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// ---- Cloudinary (durable) when configured, local disk otherwise ----
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
  console.log("[upload] Using Cloudinary for durable storage");
} else {
  console.warn(
    "[upload] CLOUDINARY_* env vars not set — falling back to local disk (NOT durable across deploys)"
  );
}

const UPLOAD_DIR = path.join(__dirname, "..", "public", "uploads");
if (!CLOUDINARY_CONFIGURED && !fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const upload = multer({
  storage: CLOUDINARY_CONFIGURED
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
        filename: (_req, file, cb) => {
          const ext = path.extname(file.originalname).toLowerCase() || ".png";
          const safeExt = /^\.(png|jpg|jpeg|webp|gif)$/.test(ext) ? ext : ".png";
          const id = crypto.randomBytes(12).toString("hex");
          cb(null, `${Date.now()}-${id}${safeExt}`);
        },
      }),
  limits: { fileSize: 25 * 1024 * 1024 }, // increased to 25MB for video/audio/pdf files
  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      "image/",
      "audio/",
      "video/",
      "application/pdf"
    ];
    if (allowedTypes.some(type => file.mimetype.startsWith(type))) {
      cb(null, true);
    } else {
      cb(new Error("Only image, audio, video, and PDF files are allowed"));
    }
  },
});

router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    if (CLOUDINARY_CONFIGURED) {
      // Upload buffer via upload_stream
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "vizzy/uploads", resource_type: "auto" },
          (err, uploadResult) => (err ? reject(err) : resolve(uploadResult))
        );
        stream.end(req.file.buffer);
      });

      return res.json({
        image: {
          url: result.secure_url,
          publicId: result.public_id,
          fileName: req.file.originalname,
          fileSize: req.file.size,
        },
      });
    }

    // Local disk fallback
    const host = `${req.protocol}://${req.get("host")}`;
    return res.json({
      image: {
        url: `${host}/uploads/${req.file.filename}`,
        fileName: req.file.originalname,
        fileSize: req.file.size,
      },
    });
  } catch (err) {
    console.error("[upload] error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Upload failed" });
  }
});

router.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default router;
