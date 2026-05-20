const sharp = require('sharp');
const path = require('path');

const framesDir = path.join(__dirname, '../public/frames');

async function testAlphaLine(fileName) {
  const filePath = path.join(framesDir, fileName);
  const image = sharp(filePath);
  const metadata = await image.metadata();
  const { width, height } = metadata;
  
  const { data } = await image.raw().toBuffer({ resolveWithObject: true });
  
  const y = Math.floor(height / 2);
  const lineAlphas = [];
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    lineAlphas.push(data[idx + 3]);
  }
  
  // Find continuous segments of transparent (alpha < 5) and opaque (alpha >= 5) pixels
  const segments = [];
  let currentVal = lineAlphas[0] < 5 ? 0 : 255;
  let startX = 0;
  for (let x = 1; x < width; x++) {
    const val = lineAlphas[x] < 5 ? 0 : 255;
    if (val !== currentVal) {
      segments.push({ type: currentVal === 0 ? 'transparent' : 'opaque', startX, endX: x - 1, length: x - startX });
      currentVal = val;
      startX = x;
    }
  }
  segments.push({ type: currentVal === 0 ? 'transparent' : 'opaque', startX, endX: width - 1, length: width - startX });
  
  console.log(`Frame: ${fileName} (Middle Line y = ${y})`);
  console.log(`Segments:`, JSON.stringify(segments, null, 2));
  console.log('----------------------------------------');
}

async function run() {
  await testAlphaLine('frame1.png');
  await testAlphaLine('frame2.png');
  await testAlphaLine('frame3.png');
  await testAlphaLine('frame4.png');
}

run().catch(console.error);
