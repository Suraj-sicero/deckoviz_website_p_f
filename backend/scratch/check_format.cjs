const sharp = require('sharp');
const path = require('path');

const framesDir = path.join(__dirname, '../public/frames');

async function checkMetadata(fileName) {
  const filePath = path.join(framesDir, fileName);
  const image = sharp(filePath);
  const metadata = await image.metadata();
  console.log(`Frame: ${fileName}`);
  console.log(JSON.stringify(metadata, null, 2));
  console.log('----------------------------------------');
}

async function run() {
  await checkMetadata('frame1.png');
  await checkMetadata('frame2.png');
  await checkMetadata('frame3.png');
  await checkMetadata('frame4.png');
}

run().catch(console.error);
