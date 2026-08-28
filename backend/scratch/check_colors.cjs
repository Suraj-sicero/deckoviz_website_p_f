const sharp = require('sharp');
const path = require('path');

const framesDir = path.join(__dirname, '../public/frames');

async function checkColors(fileName) {
  const filePath = path.join(framesDir, fileName);
  const image = sharp(filePath);
  const metadata = await image.metadata();
  const { width, height } = metadata;
  
  const { data } = await image.raw().toBuffer({ resolveWithObject: true });
  
  console.log(`Frame: ${fileName} (${width}x${height})`);
  
  // Check the center pixel
  const cx = Math.floor(width / 2);
  const cy = Math.floor(height / 2);
  const centerIdx = (cy * width + cx) * 4;
  console.log(`Center pixel at (${cx}, ${cy}): RGBA(${data[centerIdx]}, ${data[centerIdx+1]}, ${data[centerIdx+2]}, ${data[centerIdx+3]})`);
  
  // Check four corners
  const corners = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1]
  ];
  corners.forEach(([x, y]) => {
    const idx = (y * width + x) * 4;
    console.log(`Corner pixel at (${x}, ${y}): RGBA(${data[idx]}, ${data[idx+1]}, ${data[idx+2]}, ${data[idx+3]})`);
  });
  
  // Find where the alpha is 0
  let transparentCount = 0;
  for (let idx = 3; idx < data.length; idx += 4) {
    if (data[idx] === 0) transparentCount++;
  }
  const pct = ((transparentCount / (width * height)) * 100).toFixed(2);
  console.log(`Total transparent pixels (alpha=0): ${transparentCount} (${pct}%)`);
  console.log('----------------------------------------');
}

async function run() {
  await checkColors('frame1.png');
  await checkColors('frame2.png');
  await checkColors('frame3.png');
  await checkColors('frame4.png');
}

run().catch(console.error);
