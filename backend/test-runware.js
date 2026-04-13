import dotenv from "dotenv";
dotenv.config();

async function testRunware() {
  const imageApiKey = process.env.RUNWARE_API_KEY;
  console.log("Testing Runware with key:", imageApiKey);

  try {
    const rwRes = await fetch("https://api.runware.ai/v1", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          "taskType": "imageInference",
          "taskUUID": `test-${Date.now()}`,
          "positivePrompt": "a beautiful sunset over the mountains, watercolor style",
          "width": 768,
          "height": 512,
          "model": "runware:100@1",
          "numberResults": 1,
          "apiKey": imageApiKey
        }
      ]),
    });

    const rwData = await rwRes.json();
    console.log("Runware Response:", JSON.stringify(rwData, null, 2));
  } catch (err) {
    console.error("Runware Error:", err);
  }
}
testRunware();
