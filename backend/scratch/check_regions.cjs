const sharp = require('sharp');
const path = require('path');

const framesDir = path.join(__dirname, '../public/frames');

async function checkRegions(fileName) {
  const filePath = path.join(framesDir, fileName);
  const image = sharp(filePath);
  const metadata = await image.metadata();
  const { width, height } = metadata;
  
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const channels = info.channels;
  
  if (channels < 4) {
    console.log(`Frame: ${fileName} has only ${channels} channels (no alpha).`);
    return;
  }
  
  // Find bounding box of low alpha pixels (screen/transparent inset)
  let lowMinX = width, lowMaxX = 0, lowMinY = height, lowMaxY = 0;
  let lowCount = 0;
  
  // Find bounding box of high alpha pixels (bezel/opaque part)
  let highMinX = width, highMaxX = 0, highMinY = height, highMaxY = 0;
  let highCount = 0;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const alpha = data[idx + 3];
      
      if (alpha < 50) {
        lowCount++;
        if (x < lowMinX) lowMinX = x;
        if (x > lowMaxX) lowMaxX = x;
        if (y < lowMinY) lowMinY = y;
        if (y > lowMaxY) lowMaxY = y;
      }
      
      if (alpha > 200) {
        highCount++;
        if (x < highMinX) highMinX = x;
        if (x > highMaxX) highMaxX = x;
        if (y < highMinY) highMinY = y;
        if (y > highMaxY) highMaxY = y;
      }
    }
  }
  
  console.log(`Frame: ${fileName} (${width}x${height})`);
  console.log(`  Low Alpha (<50) pixels: ${lowCount} (${((lowCount/(width*height))*100).toFixed(1)}%)`);
  if (lowCount > 0) {
    console.log(`    Bounding Box: Left=${lowMinX}, Top=${lowMinY}, Width=${lowMaxX-lowMinX}, Height=${lowMaxY-lowMinY}`);
    console.log(`    Aspect Ratio: ${((lowMaxX-lowMinX)/(lowMaxY-lowMinY)).toFixed(4)}`);
  }
  console.log(`  High Alpha (>200) pixels: ${highCount} (${((highCount/(width*height))*100).toFixed(1)}%)`);
  if (highCount > 0) {
    console.log(`    Bounding Box: Left=${highMinX}, Top=${highMinY}, Width=${highMaxX-highMinX}, Height=${highMaxY-highMinY}`);
  }
  console.log('----------------------------------------');
}

async function run() {
  await checkRegions('frame1.png');
  await checkRegions('frame2.png');
  await checkRegions('frame3.png');
  await checkRegions('frame4.png');
}

run().catch(console.error);
