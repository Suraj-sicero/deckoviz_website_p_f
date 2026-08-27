import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

async function testRunwareImg2Img() {
  const apiKey = process.env.RUNWARE_API_KEY;
  console.log("Testing Runware with key:", apiKey);

  // Generate a tiny red dot image in base64 to test upload
  const base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

  const uploadTaskUUID = crypto.randomUUID();
  const inferenceTaskUUID = crypto.randomUUID();

  try {
    console.log("Sending upload task...");
    const rwRes = await fetch("https://api.runware.ai/v1", {
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
          "image": base64Image
        }
      ]),
    });

    const rwData = await rwRes.json();
    console.log("Upload Response:", JSON.stringify(rwData, null, 2));

    const imageUUID = rwData.data?.[0]?.imageUUID;
    if (!imageUUID) {
      console.error("Failed to upload image, no imageUUID returned.");
      return;
    }

    console.log("Image uploaded. UUID:", imageUUID);

    console.log("Sending imageInference task using seedImage...");
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
          "model": "runware:100@1",
          "positivePrompt": "sunset",
          "seedImage": imageUUID,
          "strength": 0.5,
          "width": 512,
          "height": 512,
          "numberResults": 1
        }
      ])
    });

    const inferData = await inferRes.json();
    console.log("Inference Response:", JSON.stringify(inferData, null, 2));
  } catch (err) {
    console.error("Error during Runware img2img test:", err);
  }
}

testRunwareImg2Img();
