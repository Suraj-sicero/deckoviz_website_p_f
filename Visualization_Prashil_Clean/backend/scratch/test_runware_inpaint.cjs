const dotenv = require("dotenv");
const crypto = require("crypto");
dotenv.config();

async function test() {
  const apiKey = process.env.RUNWARE_API_KEY;
  console.log("Using API key:", apiKey);

  // Tiny red dot 5x5
  const seedBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
  // Tiny white dot 5x5 (mask)
  const maskBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P8//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

  const uploadTaskUUID = crypto.randomUUID();
  const uploadMaskTaskUUID = crypto.randomUUID();
  const inferenceTaskUUID = crypto.randomUUID();

  try {
    console.log("Uploading seed and mask...");
    const res = await fetch("https://api.runware.ai/v1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        {
          "taskType": "authentication",
          "apiKey": apiKey
        },
        {
          "taskType": "imageUpload",
          "taskUUID": uploadTaskUUID,
          "image": seedBase64
        },
        {
          "taskType": "imageUpload",
          "taskUUID": uploadMaskTaskUUID,
          "image": maskBase64
        }
      ])
    });

    const uploadRes = await res.json();
    console.log("Upload response:", JSON.stringify(uploadRes, null, 2));

    const uploadData = uploadRes.data || [];
    const seedItem = uploadData.find(d => d.taskUUID === uploadTaskUUID);
    const maskItem = uploadData.find(d => d.taskUUID === uploadMaskTaskUUID);

    const imageUUID = seedItem?.imageUUID;
    const maskUUID = maskItem?.imageUUID;

    if (!imageUUID || !maskUUID) {
      console.error("Failed to get UUIDs.");
      return;
    }

    console.log("Uploading done. UUIDs:", { imageUUID, maskUUID });

    console.log("Calling imageInference...");
    const inferRes = await fetch("https://api.runware.ai/v1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        {
          "taskType": "authentication",
          "apiKey": apiKey
        },
        {
          "taskType": "imageInference",
          "taskUUID": inferenceTaskUUID,
          "model": "runware:102@1",
          "positivePrompt": "A picture frame on the wall",
          "negativePrompt": "blurry, low quality",
          "seedImage": imageUUID,
          "maskImage": maskUUID,
          "strength": 0.5,
          "cfgScale": 4.5,
          "width": 1024,
          "height": 1024,
          "numberResults": 1
        }
      ])
    });

    const inferData = await inferRes.json();
    console.log("Inference response:", JSON.stringify(inferData, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

test();
