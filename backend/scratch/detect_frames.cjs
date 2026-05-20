const sharp = require('sharp');
const path = require('path');

const framesDir = path.join(__dirname, '../public/frames');

async function analyzeFrame(fileName) {
  const filePath = path.join(framesDir, fileName);
  const image = sharp(filePath);
  const metadata = await image.metadata();
  const { width, height } = metadata;
  
  // Get raw RGBA pixels
  const { data } = await image.raw().toBuffer({ resolveWithObject: true });
  
  let minX = width;
  let maxX = 0;
  let minY = height;
  let maxY = 0;
  
  // Loop through pixels and find the bounding box of fully transparent pixels (alpha = 0)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const alpha = data[idx + 3];
      if (alpha === 0) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  
  console.log(`Frame: ${fileName}`);
  console.log(`Dimensions: ${width}x${height}`);
  if (maxX >= minX && maxY >= minY) {
    console.log(`Transparent Bounding Box:`);
    console.log(`  Left: ${minX} (${((minX/width)*100).toFixed(2)}%)`);
    console.log(`  Top: ${minY} (${((minY/height)*100).toFixed(2)}%)`);
    console.log(`  Width: ${maxX - minX} (${(((maxX - minX)/width)*100).toFixed(2)}%)`);
    console.log(`  Height: ${maxY - minY} (${(((maxY - minY)/height)*100).toFixed(2)}%)`);
    console.log(`  Aspect Ratio: ${((maxX - minX)/(maxY - minY)).toFixed(4)}`);
  } else {
    console.log(`No transparent pixels found!`);
  }
  console.log('----------------------------------------');
}

async function run() {
  await analyzeFrame('frame1.png');
  await analyzeFrame('frame2.png');
  await analyzeFrame('frame3.png');
  await analyzeFrame('frame4.png');
}

run().catch(console.error);
