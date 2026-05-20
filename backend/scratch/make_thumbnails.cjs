const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const framesDir = path.join(__dirname, '../public/frames');
const outputDir = path.join(__dirname, '../public/generated');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function makeThumbnail(fileName) {
  const filePath = path.join(framesDir, fileName);
  const outPath = path.join(outputDir, `thumb_${fileName.replace('.png', '.jpg')}`);
  try {
    await sharp(filePath)
      .resize(400)
      .jpeg()
      .toFile(outPath);
    console.log(`Thumbnail created: ${outPath}`);
  } catch (e) {
    console.log(`Error creating thumbnail for ${fileName}: ${e.message}`);
  }
}

async function run() {
  await makeThumbnail('frame1.png');
  await makeThumbnail('frame2.png');
  await makeThumbnail('frame3.png');
  await makeThumbnail('frame4.png');
}

run().catch(console.error);
