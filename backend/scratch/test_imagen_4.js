import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function testImagen4() {
  if (!GOOGLE_API_KEY) {
    console.error("GOOGLE_API_KEY is not defined in the environment!");
    process.exit(1);
  }

  const model = "imagen-4.0-generate-001";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:predict?key=${GOOGLE_API_KEY}`;

  console.log("Calling Imagen 4 REST API...");
  try {
    const response = await axios.post(url, {
      instances: [
        {
          prompt: "A beautiful watercolor painting of a golden sunrise breaking the night, ultra quality."
        }
      ],
      parameters: {
        sampleCount: 1,
        aspectRatio: "1:1",
        outputOptions: {
          mimeType: "image/jpeg"
        }
      }
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 30000
    });

    if (response.data && response.data.predictions && response.data.predictions.length > 0) {
      const base64Data = response.data.predictions[0].bytesBase64Encoded;
      console.log("Imagen 4 success! Received base64 string of length:", base64Data.length);
      const imgBuffer = Buffer.from(base64Data, "base64");
      const outputPath = path.join(__dirname, "../public/uploads/test_imagen_4_out.jpg");
      fs.writeFileSync(outputPath, imgBuffer);
      console.log("Image saved to:", outputPath);
    } else {
      console.error("Unexpected response data:", response.data);
    }
  } catch (err) {
    if (err.response) {
      console.error("Imagen API Error:", err.response.status, JSON.stringify(err.response.data));
    } else {
      console.error("Request Error:", err.message);
    }
  }
}

testImagen4();
