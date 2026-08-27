const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Hardcode the detected coordinates (normalized to 0-1000 scale)
const FRAME_CONFIGS = {
  frame1: {
    file: 'frame1.png',
    width: 1024,
    height: 1024,
    outer_bezel: {
      top_left: [210, 170],
      top_right: [830, 160],
      bottom_right: [810, 840],
      bottom_left: [200, 850]
    },
    inner_screen: {
      top_left: [280, 250],
      top_right: [760, 240],
      bottom_right: [750, 780],
      bottom_left: [270, 790]
    },
    backlight_color: '#3b6390'
  },
  frame2: {
    file: 'frame2.png',
    width: 1536,
    height: 1024,
    outer_bezel: {
      top_left: [180, 294],
      top_right: [823, 278],
      bottom_right: [823, 723],
      bottom_left: [180, 739]
    },
    inner_screen: {
      top_left: [207, 326],
      top_right: [797, 310],
      bottom_right: [797, 692],
      bottom_left: [207, 707]
    },
    backlight_color: '#ec8567'
  },
  frame3: {
    file: 'frame3.png',
    width: 1672,
    height: 941,
    outer_bezel: {
      top_left: [105, 133],
      top_right: [895, 133],
      bottom_right: [895, 870],
      bottom_left: [105, 870]
    },
    inner_screen: {
      top_left: [120, 151],
      top_right: [880, 151],
      bottom_right: [880, 844],
      bottom_left: [120, 844]
    },
    backlight_color: '#ceaf8e'
  },
  frame4: {
    file: 'frame4.png',
    width: 1672,
    height: 941,
    outer_bezel: {
      top_left: [169, 200],
      top_right: [910, 173],
      bottom_right: [915, 829],
      bottom_left: [164, 856]
    },
    inner_screen: {
      top_left: [184, 228],
      top_right: [895, 200],
      bottom_right: [900, 801],
      bottom_left: [179, 829]
    },
    backlight_color: '#8c7765'
  }
};

function solveSystem(A, B) {
  const n = 8;
  const M = A.map((row, i) => [...row, B[i]]);
  for (let i = 0; i < n; i++) {
    let maxEl = Math.abs(M[i][i]);
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(M[k][i]) > maxEl) {
        maxEl = Math.abs(M[k][i]);
        maxRow = k;
      }
    }
    if (maxRow !== i) {
      const temp = M[maxRow];
      M[maxRow] = M[i];
      M[i] = temp;
    }
    if (Math.abs(M[i][i]) < 1e-9) return null;
    for (let k = i + 1; k < n; k++) {
      const c = -M[k][i] / M[i][i];
      for (let j = i; j <= n; j++) {
        if (i === j) M[k][j] = 0;
        else M[k][j] += c * M[i][j];
      }
    }
  }
  const X = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    X[i] = M[i][n] / M[i][i];
    for (let k = i - 1; k >= 0; k--) {
      M[k][n] -= M[k][i] * X[i];
    }
  }
  return X;
}

function getInverseHomography(src, dst) {
  const A = [];
  const B = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = dst[i];
    const [u, v] = src[i];
    A.push([x, y, 1, 0, 0, 0, -x * u, -y * u]);
    B.push(u);
    A.push([0, 0, 0, x, y, 1, -x * v, -y * v]);
    B.push(v);
  }
  return solveSystem(A, B);
}

function bilinearSample(buffer, width, height, channels, u, v) {
  if (u < 0 || u >= width - 1 || v < 0 || v >= height - 1) return [0, 0, 0, 0];
  const u0 = Math.floor(u);
  const u1 = u0 + 1;
  const v0 = Math.floor(v);
  const v1 = v0 + 1;
  const wu1 = u - u0;
  const wu0 = 1 - wu1;
  const wv1 = v - v0;
  const wv0 = 1 - wv1;
  const idx00 = (v0 * width + u0) * channels;
  const idx10 = (v0 * width + u1) * channels;
  const idx01 = (v1 * width + u0) * channels;
  const idx11 = (v1 * width + u1) * channels;
  const res = [];
  for (let c = 0; c < channels; c++) {
    const val = wu0 * wv0 * buffer[idx00 + c] +
                wu1 * wv0 * buffer[idx10 + c] +
                wu0 * wv1 * buffer[idx01 + c] +
                wu1 * wv1 * buffer[idx11 + c];
    res.push(Math.round(val));
  }
  return res;
}

async function warpImage(srcBuffer, srcWidth, srcHeight, dstWidth, dstHeight, dstCorners, srcCorners) {
  const coeffs = getInverseHomography(srcCorners, dstCorners);
  if (!coeffs) return null;
  const [a, b, c, d, e, f, g, h] = coeffs;

  let minX = Math.floor(Math.min(...dstCorners.map(p => p[0])));
  let maxX = Math.ceil(Math.max(...dstCorners.map(p => p[0])));
  let minY = Math.floor(Math.min(...dstCorners.map(p => p[1])));
  let maxY = Math.ceil(Math.max(...dstCorners.map(p => p[1])));

  const margin = Math.ceil(Math.max(maxX - minX, maxY - minY) * 0.35);
  minX = Math.max(0, minX - margin);
  maxX = Math.min(dstWidth - 1, maxX + margin);
  minY = Math.max(0, minY - margin);
  maxY = Math.min(dstHeight - 1, maxY + margin);

  const dstBuffer = Buffer.alloc(dstWidth * dstHeight * 4);
  const fadeMargin = 40;

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const den = g * x + h * y + 1;
      if (Math.abs(den) < 1e-6) continue;
      const u = (a * x + b * y + c) / den;
      const v = (d * x + e * y + f) / den;

      if (u >= 0 && u < srcWidth - 1 && v >= 0 && v < srcHeight - 1) {
        const color = bilinearSample(srcBuffer, srcWidth, srcHeight, 4, u, v);
        let fade = 1.0;
        if (u < fadeMargin) fade *= (u / fadeMargin);
        else if (srcWidth - 1 - u < fadeMargin) fade *= ((srcWidth - 1 - u) / fadeMargin);
        if (v < fadeMargin) fade *= (v / fadeMargin);
        else if (srcHeight - 1 - v < fadeMargin) fade *= ((srcHeight - 1 - v) / fadeMargin);

        const dstIdx = (y * dstWidth + x) * 4;
        dstBuffer[dstIdx] = color[0];
        dstBuffer[dstIdx + 1] = color[1];
        dstBuffer[dstIdx + 2] = color[2];
        dstBuffer[dstIdx + 3] = Math.round(color[3] * fade);
      }
    }
  }
  return dstBuffer;
}

async function test() {
  const frameKey = 'frame1';
  const cfg = FRAME_CONFIGS[frameKey];
  const framePath = path.join(__dirname, '../public/frames', cfg.file);
  const artPath = path.join(__dirname, '../../deckoviz_web-main/public/images/about3.png'); // dummy image
  const roomPath = path.join(__dirname, '../../deckoviz_web-main/public/images/office.png'); // dummy room
  
  if (!fs.existsSync(framePath)) {
    console.error("Missing frame path:", framePath);
    return;
  }
  if (!fs.existsSync(artPath)) {
    console.error("Missing art path:", artPath);
    return;
  }
  if (!fs.existsSync(roomPath)) {
    console.error("Missing room path:", roomPath);
    return;
  }

  // 1. Process custom artwork (warp to inner screen coordinates)
  console.log("Processing custom artwork...");
  const artMeta = await sharp(artPath).metadata();
  const artCorners = [
    [0, 0],
    [artMeta.width, 0],
    [artMeta.width, artMeta.height],
    [0, artMeta.height]
  ];
  
  const innerCorners = [
    [ (cfg.inner_screen.top_left[0] / 1000) * cfg.width, (cfg.inner_screen.top_left[1] / 1000) * cfg.height ],
    [ (cfg.inner_screen.top_right[0] / 1000) * cfg.width, (cfg.inner_screen.top_right[1] / 1000) * cfg.height ],
    [ (cfg.inner_screen.bottom_right[0] / 1000) * cfg.width, (cfg.inner_screen.bottom_right[1] / 1000) * cfg.height ],
    [ (cfg.inner_screen.bottom_left[0] / 1000) * cfg.width, (cfg.inner_screen.bottom_left[1] / 1000) * cfg.height ]
  ];

  const artRaw = await sharp(artPath).ensureAlpha().raw().toBuffer();
  const warpedArtRaw = await warpImage(artRaw, artMeta.width, artMeta.height, cfg.width, cfg.height, innerCorners, artCorners);
  
  // 2. Composite warped artwork onto frame image
  console.log("Compositing artwork inside frame screen...");
  const frameRawWithArt = await sharp(framePath)
    .composite([
      {
        input: warpedArtRaw,
        raw: { width: cfg.width, height: cfg.height, channels: 4 },
        top: 0,
        left: 0
      }
    ])
    .raw()
    .toBuffer();

  // 3. Mask out the showcase wall background
  console.log("Masking frame outer bezel...");
  const p = [
    [ (cfg.outer_bezel.top_left[0] / 1000) * cfg.width, (cfg.outer_bezel.top_left[1] / 1000) * cfg.height ],
    [ (cfg.outer_bezel.top_right[0] / 1000) * cfg.width, (cfg.outer_bezel.top_right[1] / 1000) * cfg.height ],
    [ (cfg.outer_bezel.bottom_right[0] / 1000) * cfg.width, (cfg.outer_bezel.bottom_right[1] / 1000) * cfg.height ],
    [ (cfg.outer_bezel.bottom_left[0] / 1000) * cfg.width, (cfg.outer_bezel.bottom_left[1] / 1000) * cfg.height ]
  ];
  const polyPoints = `${p[0][0]},${p[0][1]} ${p[1][0]},${p[1][1]} ${p[2][0]},${p[2][1]} ${p[3][0]},${p[3][1]}`;
  
  const maskSvg = `
    <svg width="${cfg.width}" height="${cfg.height}">
      <polygon points="${polyPoints}" fill="white" />
    </svg>
  `;
  
  const maskedFrame = await sharp(frameRawWithArt, { raw: { width: cfg.width, height: cfg.height, channels: 4 } })
    .composite([
      { input: Buffer.from(maskSvg), blend: 'dest-in' }
    ])
    .raw()
    .toBuffer();

  // 4. Generate Backlight Glow and Shadow
  console.log("Generating custom backlight and shadow...");
  const glowSvg = `
    <svg width="${cfg.width}" height="${cfg.height}">
      <filter id="glow">
        <feGaussianBlur stdDeviation="35" />
      </filter>
      <polygon points="${polyPoints}" fill="${cfg.backlight_color}" filter="url(#glow)" opacity="0.6" />
    </svg>
  `;

  const shadowSvg = `
    <svg width="${cfg.width}" height="${cfg.height}">
      <filter id="shadow">
        <feGaussianBlur stdDeviation="15" />
      </filter>
      <polygon points="${polyPoints}" fill="rgba(0,0,0,0.65)" filter="url(#shadow)" />
    </svg>
  `;

  const flatFrameComposite = await sharp({
    create: {
      width: cfg.width,
      height: cfg.height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([
    { input: Buffer.from(glowSvg), top: 0, left: 0 },
    { input: Buffer.from(shadowSvg), top: 0, left: 0 },
    { input: maskedFrame, raw: { width: cfg.width, height: cfg.height, channels: 4 }, top: 0, left: 0 }
  ])
  .png()
  .toBuffer();

  // Save the flat frame composition for check
  await sharp(flatFrameComposite).toFile(path.join(__dirname, '../public/generated/test_flat_frame.png'));
  console.log("Saved test flat frame composition to public/generated/test_flat_frame.png");
}

test().catch(console.error);
