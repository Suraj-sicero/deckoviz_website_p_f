import fs from "fs";
import path from "path";
import axios from "axios";
import { exec, spawn } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, "../public");

/**
 * Executes a shell command and returns a promise.
 */
function runCmd(command) {
  return new Promise((resolve, reject) => {
    console.log(`[VideoRenderService] Running: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`[VideoRenderService] Error:`, stderr);
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

/**
 * Downloads a file from a URL or copies it from a local path to the temp directory.
 */
async function downloadOrResolve(urlOrPath, tempDir, baseName) {
  if (!urlOrPath) return null;

  // Preserve extension
  const ext = path.extname(urlOrPath.split("?")[0]).toLowerCase();
  const destPath = path.join(tempDir, `${baseName}${ext}`);

  // Handle local URLs (e.g. http://localhost:5000/uploads/abc.png or /uploads/abc.png)
  let cleanPath = urlOrPath;
  if (urlOrPath.startsWith("http")) {
    try {
      const parsed = new URL(urlOrPath);
      if (parsed.pathname.startsWith("/uploads/")) {
        cleanPath = parsed.pathname;
      }
    } catch (e) {
      // Ignore URL parse error and treat as external
    }
  }

  if (cleanPath.startsWith("/uploads/")) {
    const localPath = path.join(PUBLIC_DIR, cleanPath);
    if (fs.existsSync(localPath)) {
      fs.copyFileSync(localPath, destPath);
      return destPath;
    }
  }

  // Handle direct file paths
  if (fs.existsSync(urlOrPath)) {
    fs.copyFileSync(urlOrPath, destPath);
    return destPath;
  }

  // Otherwise, download from external URL
  console.log(`[VideoRenderService] Downloading external media: ${urlOrPath}`);
  const response = await axios({
    method: "get",
    url: urlOrPath,
    responseType: "stream",
  });

  await new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(destPath);
    response.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  return destPath;
}

/**
 * Renders a video from a sequence of images, with fade transitions and mixed audio.
 * Delegated to python script stitch_video.py for local stitching.
 */
export async function renderVideo({
  images,
  transitionDuration,
  narration,
  music,
  narrationVolume = 100,
  musicVolume = 100,
}) {
  if (!images || !images.length) {
    throw new Error("No images provided for rendering");
  }

  return new Promise((resolve, reject) => {
    const finalVideoName = `video-${Date.now()}-${Math.random().toString(36).substring(7)}.mp4`;
    const outputRelPath = `/uploads/${finalVideoName}`;

    const scriptPath = path.join(__dirname, "stitch_video.py");
    const inputPayload = {
      images,
      transitionDuration,
      narration,
      music,
      narrationVolume,
      musicVolume,
      outputPath: outputRelPath
    };

    console.log(`[VideoRenderService] Spawning Python script to render video...`);
    const py = spawn("python3", [scriptPath]);

    let stdout = "";
    let stderr = "";

    py.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    py.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    py.on("close", (code) => {
      if (code !== 0) {
        console.error(`[VideoRenderService] Python script exited with code ${code}. Stderr: ${stderr}`);
        reject(new Error(`Video rendering failed: ${stderr || "exited with code " + code}`));
      } else {
        try {
          const result = JSON.parse(stdout.trim());
          if (result.success) {
            resolve(result.outputVideo);
          } else {
            reject(new Error(result.error || "Unknown rendering error"));
          }
        } catch (e) {
          console.error(`[VideoRenderService] Failed to parse python stdout:`, stdout);
          reject(e);
        }
      }
    });

    // Write input JSON payload to python process stdin
    py.stdin.write(JSON.stringify(inputPayload));
    py.stdin.end();
  });
}

