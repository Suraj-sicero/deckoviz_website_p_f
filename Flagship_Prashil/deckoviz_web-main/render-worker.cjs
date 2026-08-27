const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

async function recordMode(modeId, durationMinutes) {
  // Always capture 1 minute max to save time, then let FFmpeg loop it
  const captureDurationMinutes = Math.min(1, durationMinutes);
  const captureDurationMs = captureDurationMinutes * 60 * 1000;
  const targetDurationSeconds = durationMinutes * 60;
  
  const url = `http://localhost:5173/${modeId}.html?mode=tv`;
  const tempWebm = path.join(__dirname, `${modeId}_temp.webm`);
  const tempMp4 = path.join(__dirname, `${modeId}_temp.mp4`);
  const finalMp4 = path.join(__dirname, `${modeId}_${durationMinutes}min.mp4`);

  console.log(`Starting render job for ${modeId} (Capturing 1 min, Looping to ${durationMinutes} min)...`);
  
  const browser = await puppeteer.launch({
    headless: false, // Must be false to reliably use hardware GPU WebGL
    protocolTimeout: 120000,
    defaultViewport: { width: 1920, height: 1080 }, // Target portal TV resolution
    args: [
      '--ignore-gpu-blocklist', 
      '--enable-webgl', 
      '--autoplay-policy=no-user-gesture-required'
    ]
  });

  const page = await browser.newPage();
  page.setDefaultTimeout(120000);
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  // Create a write stream for the incoming WebM chunks
  const writeStream = fs.createWriteStream(tempWebm);
  
  // We will resolve this promise when the final chunk is received
  let resolveStreamEnd;
  const streamEndedPromise = new Promise(r => resolveStreamEnd = r);
  
  await page.exposeFunction('onChunk', (base64Chunk, isFinal) => {
    if (isFinal) {
      writeStream.end(() => resolveStreamEnd());
      return;
    }
    // Convert base64 back to buffer and write directly to disk
    const buffer = Buffer.from(base64Chunk, 'base64');
    writeStream.write(buffer);
  });

  console.log(`Navigating to ${url}...`);
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  } catch (e) {
    console.error('Navigation error, trying fallback', e);
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  }

  // Wait a moment for any initial shaders to compile
  await new Promise(r => setTimeout(r, 2000));

  // Wait for canvas to be present
  await page.waitForSelector('canvas');

  console.log('Injecting MediaRecorder to capture WebGL canvas...');
  await page.evaluate((captureDurationMs) => {
    return new Promise((resolve) => {
      const canvas = document.querySelector('canvas');
      
      // Capture at 30fps for smooth playback
      const stream = canvas.captureStream(30);
      
      // H264 isn't strictly guaranteed across all Chrome instances for MediaRecorder,
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm', videoBitsPerSecond: 8000000 });
      
      const chunks = [];
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      
      recorder.onstop = async () => {
        // Send chunks sequentially over IPC to guarantee perfect order and avoid massive payload crashes
        for (let i = 0; i < chunks.length; i++) {
          const reader = new FileReader();
          const base64data = await new Promise(res => {
            reader.readAsDataURL(chunks[i]);
            reader.onloadend = () => res(reader.result.split(',')[1]);
          });
          await window.onChunk(base64data, false);
        }
        await window.onChunk('', true);
        resolve();
      };
      
      recorder.start(1000); // 1-second chunks to keep payload sizes small
      
      setTimeout(() => {
        recorder.stop();
      }, captureDurationMs);
    });
  }, captureDurationMs);

  console.log('Finished capturing WebM stream. Waiting for IPC stream to close...');
  
  await streamEndedPromise;
  await browser.close();

  // Wait a moment for file handle to release
  await new Promise(r => setTimeout(r, 1000));

  console.log(`Transcoding WebM to MP4 to build video index/duration...`);
  
  const ffmpegTranscodeArgs = [
    '-y',
    '-i', tempWebm,
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    tempMp4
  ];

  await new Promise((resolve, reject) => {
    const process = spawn(ffmpegPath, ffmpegTranscodeArgs);
    let log = '';
    process.stderr.on('data', d => log += d.toString());
    process.on('close', code => code === 0 ? resolve() : reject(new Error(`Transcode failed: ${log}`)));
  });

  console.log(`\nLooping the 1-minute MP4 into a ${durationMinutes}-minute final file...`);
  
  const ffmpegLoopArgs = [
    '-y',
    '-stream_loop', '-1', // Infinite loop
    '-i', tempMp4,
    '-c', 'copy', // Copy codec without re-encoding (instant!)
    '-t', targetDurationSeconds.toString(),
    finalMp4
  ];

  await new Promise((resolve, reject) => {
    const process = spawn(ffmpegPath, ffmpegLoopArgs);
    let log = '';
    process.stderr.on('data', d => log += d.toString());
    process.on('close', code => code === 0 ? resolve() : reject(new Error(`Loop failed: ${log}`)));
  });

  console.log(`\nRender complete! Saved successfully to ${finalMp4}`);
  
  // Cleanup temp file disabled for debugging
  // if (fs.existsSync(tempWebm)) {
  //  fs.unlinkSync(tempWebm);
  // }
}

module.exports = { recordMode };

// If run directly via CLI
if (require.main === module) {
  const mode = process.argv[2] || 'ink-tide';
  const minutes = parseFloat(process.argv[3]) || 0.5;
  recordMode(mode, minutes).then(() => {
    console.log('CLI Render finished.');
    process.exit(0);
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
