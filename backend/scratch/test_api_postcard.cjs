const fs = require('fs');
const path = require('path');

async function test() {
  const roomPath = path.join(__dirname, '../../deckoviz_web-main/public/images/office.png');
  const artPath = path.join(__dirname, '../../deckoviz_web-main/public/images/about3.png');

  if (!fs.existsSync(roomPath) || !fs.existsSync(artPath)) {
    console.error("Source images not found.");
    return;
  }

  const roomBlob = new Blob([fs.readFileSync(roomPath)], { type: 'image/png' });
  const artBlob = new Blob([fs.readFileSync(artPath)], { type: 'image/png' });

  // Test Mode 1 (Custom Artwork)
  console.log("Testing Mode 1 (Custom Artwork + Bezel 1)...");
  const formData1 = new FormData();
  formData1.append("image", roomBlob, "office.png");
  formData1.append("frameImage", artBlob, "about3.png");
  formData1.append("frameStyle", "frame1");
  formData1.append("businessName", "Gourmet Cafe");

  const res1 = await fetch("http://localhost:5000/api/postcard/generate", {
    method: "POST",
    body: formData1
  });

  if (!res1.ok) {
    const errText = await res1.text();
    console.error("Mode 1 failed:", errText);
  } else {
    const data1 = await res1.json();
    console.log("Mode 1 succeeded:", JSON.stringify(data1, null, 2));
  }

  // Test Mode 2 (Showcase Artwork)
  console.log("Testing Mode 2 (Showcase Auto)...");
  const formData2 = new FormData();
  formData2.append("image", roomBlob, "office.png");
  formData2.append("businessName", "Luxe Lounge");

  const res2 = await fetch("http://localhost:5000/api/postcard/generate", {
    method: "POST",
    body: formData2
  });

  if (!res2.ok) {
    const errText = await res2.text();
    console.error("Mode 2 failed:", errText);
  } else {
    const data2 = await res2.json();
    console.log("Mode 2 succeeded:", JSON.stringify(data2, null, 2));
  }
}

test().catch(console.error);
