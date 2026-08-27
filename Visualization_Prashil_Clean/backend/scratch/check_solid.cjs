const sharp = require('sharp');
const path = require('path');

const framesDir = path.join(__dirname, '../public/frames');

async function checkSolidBackground(fileName) {
  const filePath = path.join(framesDir, fileName);
  const image = sharp(filePath);
  const metadata = await image.metadata();
  const { width, height } = metadata;
  
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const channels = info.channels;
  
  // Let's collect colors of the top 20 rows of pixels
  const colorMap = new Map();
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      const key = `${r},${g},${b}`;
      colorMap.set(key, (colorMap.get(key) || 0) + 1);
    }
  }
  
  console.log(`Frame: ${fileName}`);
  console.log(`Top 20 rows total pixels: ${20 * width}`);
  console.log(`Unique colors found in top 20 rows: ${colorMap.size}`);
  
  // Sort colors by frequency
  const sortedColors = [...colorMap.entries()].sort((a, b) => b[1] - a[1]);
  console.log('Most frequent colors:');
  sortedColors.slice(0, 5).forEach(([color, count]) => {
    console.log(`  Color: RGB(${color}) -> count: ${count} (${((count / (20 * width)) * 100).toFixed(2)}%)`);
  });
  console.log('----------------------------------------');
}

async function run() {
  await checkSolidBackground('frame1.png');
  await checkSolidBackground('frame2.png');
  await checkSolidBackground('frame3.png');
  await checkSolidBackground('frame4.png');
}

run().catch(console.error);
