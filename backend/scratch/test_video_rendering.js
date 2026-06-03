import { renderVideo } from "../services/VideoRenderService.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  // Use two existing video clips from the uploads directory
  const images = [
    "/uploads/video-1780415640362-t7g72.mp4",
    "/uploads/video-1780415346658-1x8fj.mp4"
  ];
  
  console.log("Running Python stitcher on video clips...");
  try {
    const videoUrl = await renderVideo({
      images,
      transitionDuration: 4,
      transitionEffect: "fade-black",
      music: "/uploads/default_lofi.mp3",
      musicVolume: 100,
      narration: null
    });
    console.log("✅ Success! Stitched video generated at:", videoUrl);
  } catch (err) {
    console.error("❌ Stitching failed:", err.message);
  }
}

run();
