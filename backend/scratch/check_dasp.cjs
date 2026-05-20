const sharp = require('sharp');
const path = require('path');

const imagesDir = '/home/shashank/Documents/work2/deckoviz-demo/deckoviz_web-main/public/images';

async function checkDaspFrame(fileName) {
  const filePath = path.join(imagesDir, fileName);
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    console.log(`DASP Frame: ${fileName}`);
    console.log(`  Width: ${metadata.width}, Height: ${metadata.height}, Format: ${metadata.format}, Channels: ${metadata.channels}, Has Alpha: ${metadata.hasAlpha}`);
  } catch (e) {
    console.log(`DASP Frame: ${fileName} - Error: ${e.message}`);
  }
}

async function run() {
  await checkDaspFrame('75-inch-dasp.png');
  await checkDaspFrame('85-inch-dasp.png');
  await checkDaspFrame('55-inch-dasp.png');
  await checkDaspFrame('45-inch-dasp.png');
  await checkDaspFrame('deckoviz background removed.png');
}

run().catch(console.error);
