const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const GEMINI_KEY = process.env.GOOGLE_API_KEY;

async function callVisionLLM(prompt, imageBuffer) {
  if (!GEMINI_KEY) throw new Error("Gemini API key is required for vision tasks.");
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;
    const body = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: imageBuffer.toString("base64"),
              },
            },
          ],
        },
      ],
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    }
    const errorText = await res.text();
    throw new Error(`Gemini Vision Error: ${errorText}`);
  } catch (err) {
    console.error("Vision Error:", err.message);
    throw err;
  }
}

async function describeFrame(fileName) {
  const filePath = path.join(__dirname, '../public/generated', `thumb_${fileName.replace('.png', '.jpg')}`);
  const buffer = fs.readFileSync(filePath);
  const prompt = "Describe this image in detail. What objects, frames, walls, or rooms are present? Is it a picture of a room with a frame on the wall, or is it a standalone frame with transparency/empty background?";
  
  console.log(`Asking Gemini about ${fileName}...`);
  const response = await callVisionLLM(prompt, buffer);
  console.log(`Gemini response for ${fileName}:`);
  console.log(response);
  console.log('========================================');
}

async function run() {
  await describeFrame('frame1.png');
  await describeFrame('frame2.png');
  await describeFrame('frame3.png');
  await describeFrame('frame4.png');
}

run().catch(console.error);
