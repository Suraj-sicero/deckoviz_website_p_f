const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const GEMINI_KEY = process.env.GOOGLE_API_KEY;

async function callVisionLLM(prompt, imageBuffer) {
  if (!GEMINI_KEY) throw new Error("Gemini API key is required.");
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
      generationConfig: { responseMimeType: "application/json" }
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
    throw new Error(`Gemini Error: ${errorText}`);
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
}

async function getCoords(fileName) {
  const filePath = path.join(__dirname, '../public/generated', `thumb_${fileName.replace('.png', '.jpg')}`);
  const buffer = fs.readFileSync(filePath);
  
  const prompt = `
    Analyze this image of a digital art frame mounted on a wall.
    Detect the pixel coordinates for:
    1. The outer boundary of the frame (the four corners of the outer bezel).
    2. The inner boundary of the frame (the four corners of the screen where the artwork is displayed).

    Since this is a thumbnail of the original image, please return the coordinates in normalized coordinates (0 to 1000 scale, where x is 0 to 1000 and y is 0 to 1000 relative to the image width and height).

    Return JSON:
    {
      "outer_bezel": {
        "top_left": [x, y],
        "top_right": [x, y],
        "bottom_right": [x, y],
        "bottom_left": [x, y]
      },
      "inner_screen": {
        "top_left": [x, y],
        "top_right": [x, y],
        "bottom_right": [x, y],
        "bottom_left": [x, y]
      }
    }
  `;
  
  console.log(`Getting coordinates for ${fileName}...`);
  const response = await callVisionLLM(prompt, buffer);
  console.log(`Coordinates for ${fileName}:`);
  console.log(response);
  console.log('========================================');
}

async function run() {
  await getCoords('frame1.png');
  await getCoords('frame2.png');
  await getCoords('frame3.png');
  await getCoords('frame4.png');
}

run().catch(console.error);
