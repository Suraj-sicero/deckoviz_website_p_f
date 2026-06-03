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
  transitionEffect = "fade-black",
  narration,
  music,
  narrationVolume = 100,
  musicVolume = 100,
}) {
  if (!images || !images.length) {
    throw new Error("No images provided for rendering");
  }

  try {
    console.log("[VideoRenderService] Attempting rendering via Python script...");
    return await renderVideoPython({
      images,
      transitionDuration,
      transitionEffect,
      narration,
      music,
      narrationVolume,
      musicVolume
    });
  } catch (pyError) {
    console.warn(`[VideoRenderService] Python rendering failed or python3 is not available. Falling back to native JS rendering. Details: ${pyError.message}`);
    return await renderVideoJS({
      images,
      transitionDuration,
      transitionEffect,
      narration,
      music,
      narrationVolume,
      musicVolume
    });
  }
}

/**
 * Invokes the python script to render the video.
 */
function renderVideoPython({
  images,
  transitionDuration,
  transitionEffect,
  narration,
  music,
  narrationVolume,
  musicVolume,
}) {
  return new Promise((resolve, reject) => {
    const finalVideoName = `video-${Date.now()}-${Math.random().toString(36).substring(7)}.mp4`;
    const outputRelPath = `/uploads/${finalVideoName}`;

    const scriptPath = path.join(__dirname, "stitch_video.py");
    const inputPayload = {
      images,
      transitionDuration,
      transitionEffect,
      narration,
      music,
      narrationVolume,
      musicVolume,
      outputPath: outputRelPath
    };

    const py = spawn("python3", [scriptPath]);

    let stdout = "";
    let stderr = "";

    py.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    py.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    // CRITICAL: Handle error event (e.g. if python3 is not installed) to prevent server crash
    py.on("error", (err) => {
      reject(new Error(`Failed to spawn python3: ${err.message}`));
    });

    py.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(stderr.trim() || `Python exited with code ${code}`));
      } else {
        try {
          const result = JSON.parse(stdout.trim());
          if (result.success) {
            resolve(result.outputVideo);
          } else {
            reject(new Error(result.error || "Unknown rendering error"));
          }
        } catch (e) {
          reject(new Error(`Failed to parse python stdout: ${e.message}`));
        }
      }
    });

    // Write input JSON payload to python process stdin
    py.stdin.write(JSON.stringify(inputPayload));
    py.stdin.end();
  });
}

/**
 * Fallback native JS renderer executing FFmpeg commands directly.
 */
async function renderVideoJS({
  images,
  transitionDuration,
  transitionEffect = "fade-black",
  narration,
  music,
  narrationVolume = 100,
  musicVolume = 100,
}) {
  const jobId = `render-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  const tempDir = path.join(PUBLIC_DIR, "uploads", jobId);
  fs.mkdirSync(tempDir, { recursive: true });

  try {
    const duration = parseInt(transitionDuration) || 5;

    // 1. Download/resolve images
    console.log(`[VideoRenderService] JS Fallback: Preparing ${images.length} images...`);
    const localImages = [];
    for (let i = 0; i < images.length; i++) {
      const localImg = await downloadOrResolve(images[i], tempDir, `img-${i}`);
      localImages.push(localImg);
    }

    // 2. Generate clip for each image with fade transitions
    console.log("[VideoRenderService] JS Fallback: Rendering individual clips with fades...");
    const clips = [];
    for (let i = 0; i < localImages.length; i++) {
      const clipPath = path.join(tempDir, `clip-${i}.mp4`);
      const fadeDuration = 0.5;
      const fadeOutStart = duration - fadeDuration;

      // Container optimized: 480p resolution, single thread, ultrafast preset, 10 fps
      let vfFilters = `scale=854:480:force_original_aspect_ratio=decrease,pad=854:480:(ow-iw)/2:(oh-ih)/2:black`;
      if (transitionEffect === "fade-black") {
        vfFilters += `,fade=t=in:st=0:d=${fadeDuration},fade=t=out:st=${fadeOutStart}:d=${fadeDuration}`;
      } else if (transitionEffect === "fade-white") {
        vfFilters += `,fade=t=in:st=0:d=${fadeDuration}:color=white,fade=t=out:st=${fadeOutStart}:d=${fadeDuration}:color=white`;
      } else if (transitionEffect === "fade-red") {
        vfFilters += `,fade=t=in:st=0:d=${fadeDuration}:color=red,fade=t=out:st=${fadeOutStart}:d=${fadeDuration}:color=red`;
      } else if (transitionEffect === "fade-blue") {
        vfFilters += `,fade=t=in:st=0:d=${fadeDuration}:color=blue,fade=t=out:st=${fadeOutStart}:d=${fadeDuration}:color=blue`;
      } else if (transitionEffect === "fade-green") {
        vfFilters += `,fade=t=in:st=0:d=${fadeDuration}:color=green,fade=t=out:st=${fadeOutStart}:d=${fadeDuration}:color=green`;
      } else if (transitionEffect === "fade-purple") {
        vfFilters += `,fade=t=in:st=0:d=${fadeDuration}:color=purple,fade=t=out:st=${fadeOutStart}:d=${fadeDuration}:color=purple`;
      } else if (transitionEffect === "fade-yellow") {
        vfFilters += `,fade=t=in:st=0:d=${fadeDuration}:color=yellow,fade=t=out:st=${fadeOutStart}:d=${fadeDuration}:color=yellow`;
      }

      const cmd = `ffmpeg -y -threads 1 -loop 1 -t ${duration} -i "${localImages[i]}" -vf "${vfFilters}" -c:v libx264 -preset ultrafast -pix_fmt yuv420p -r 10 "${clipPath}"`;

      await runCmd(cmd);
      clips.push(clipPath);
    }

    // 3. Concatenate video clips
    console.log("[VideoRenderService] JS Fallback: Concatenating clips...");
    const listPath = path.join(tempDir, "list.txt");
    const listContent = clips.map((c) => `file '${path.basename(c)}'`).join("\n");
    fs.writeFileSync(listPath, listContent);

    const mergedPath = path.join(tempDir, "merged.mp4");
    const concatCmd = `ffmpeg -y -threads 1 -f concat -safe 0 -i "${listPath}" -c copy "${mergedPath}"`;
    await runCmd(concatCmd);

    // 4. Download/resolve audio files
    console.log("[VideoRenderService] JS Fallback: Preparing audio...");
    const localNarration = narration ? await downloadOrResolve(narration, tempDir, "narration") : null;
    const localMusic = music ? await downloadOrResolve(music, tempDir, "music") : null;

    // 5. Final mix (video + audio tracks)
    console.log("[VideoRenderService] JS Fallback: Mixing audio tracks and writing final video...");
    const finalVideoName = `video-${Date.now()}-${Math.random().toString(36).substring(7)}.mp4`;
    const finalVideoPath = path.join(PUBLIC_DIR, "uploads", finalVideoName);

    const totalDuration = images.length * duration;
    const nVol = narrationVolume / 100;
    const mVol = musicVolume / 100;

    let mixCmd = "";
    if (localNarration && localMusic) {
      mixCmd = `ffmpeg -y -threads 1 -i "${mergedPath}" -i "${localNarration}" -stream_loop -1 -i "${localMusic}" -filter_complex "[1:a]volume=${nVol}[a1];[2:a]volume=${mVol}[a2];[a1][a2]amix=inputs=2:duration=longest[aout]" -map 0:v -map "[aout]" -c:v copy -c:a aac -t ${totalDuration} "${finalVideoPath}"`;
    } else if (localNarration) {
      mixCmd = `ffmpeg -y -threads 1 -i "${mergedPath}" -i "${localNarration}" -filter_complex "[1:a]volume=${nVol}[a1]" -map 0:v -map "[a1]" -c:v copy -c:a aac -t ${totalDuration} "${finalVideoPath}"`;
    } else if (localMusic) {
      mixCmd = `ffmpeg -y -threads 1 -i "${mergedPath}" -stream_loop -1 -i "${localMusic}" -filter_complex "[1:a]volume=${mVol}[a1]" -map 0:v -map "[a1]" -c:v copy -c:a aac -t ${totalDuration} "${finalVideoPath}"`;
    } else {
      mixCmd = `ffmpeg -y -threads 1 -i "${mergedPath}" -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 -c:v copy -c:a aac -t ${totalDuration} "${finalVideoPath}"`;
    }

    await runCmd(mixCmd);

    // Clean up temporary workspace directory
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (cleanupErr) {
      console.warn("[VideoRenderService] Cleanup warning:", cleanupErr.message);
    }

    return `/uploads/${finalVideoName}`;
  } catch (error) {
    console.error("[VideoRenderService] JS Fallback rendering failed:", error);
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (cleanupErr) {
      // Ignore
    }
    throw error;
  }
}

