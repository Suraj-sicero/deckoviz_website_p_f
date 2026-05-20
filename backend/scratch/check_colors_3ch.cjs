const sharp = require('sharp');
const path = require('path');

const framesDir = path.join(__dirname, '../public/frames');

async function checkColors3ch(fileName) {
  const filePath = path.join(framesDir, fileName);
  const image = sharp(filePath);
  const metadata = await image.metadata();
  const { width, height } = metadata;
  
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const channels = info.channels;
  
  console.log(`Frame: ${fileName} (${width}x${height}, channels=${channels})`);
  
  const getRGB = (x, y) => {
    const idx = (y * width + x) * channels;
    return `RGB(${data[idx]}, ${data[idx+1]}, ${data[idx+2]})`;
  };
  
  console.log(`  Center pixel at (${Math.floor(width/2)}, ${Math.floor(height/2)}): ${getRGB(Math.floor(width/2), Math.floor(height/2))}`);
  console.log(`  Corner top-left (0,0): ${getRGB(0, 0)}`);
  console.log(`  Corner top-right (w-1,0): ${getRGB(width - 1, 0)}`);
  console.log(`  Corner bottom-left (0,h-1): ${getRGB(0, height - 1)}`);
  console.log(`  Corner bottom-right (w-1,h-1): ${getRGB(width - 1, height - 1)}`);
  
  // Let's sample a few points in a diagonal to see color transitions
  console.log('  Diagonal samples:');
  for (let i = 1; i <= 5; i++) {
    const px = Math.floor(width * i / 6);
    const py = Math.floor(height * i / 6);
    console.log(`    Point at (${px}, ${py}): ${getRGB(px, py)}`);
  }
  console.log('----------------------------------------');
}

async function run() {
  await checkColors3ch('frame1.png');
  await checkColors3ch('frame2.png');
  await checkColors3ch('frame3.png');
  await checkColors3ch('frame4.png');
}

run().catch(console.error);
