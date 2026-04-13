import dotenv from "dotenv";
dotenv.config();

async function testRunware() {
  const imageApiKey = process.env.RUNWARE_API_KEY;
  console.log("Testing Runware with key:", imageApiKey);

  const tasks = [
    {
      "taskType": "imageInference",
      "taskUUID": `test-${Date.now()}`,
      "positivePrompt": "a beautiful sunset over the mountains, watercolor style",
      "width": 768,
      "height": 512,
      "model": "runware:100@1",
      "numberResults": 1,
    }
  ];

  try {
    // Attempt 1: apiKey in query param or header?
    console.log("Attempt 1: apiKey in body root");
    const rwRes = await fetch("https://api.runware.ai/v1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: imageApiKey,
        tasks: tasks
      }),
    });
    const rwData = await rwRes.json();
    console.log("Response 1:", JSON.stringify(rwData, null, 2));

    // Attempt 2: Authorization header
    console.log("Attempt 2: Authorization Bearer");
    const rwRes2 = await fetch("https://api.runware.ai/v1", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${imageApiKey}`
      },
      body: JSON.stringify(tasks),
    });
    console.log("Response 2 Status:", rwRes2.status);

  } catch (err) {
    console.error("Runware Error:", err);
  }
}
testRunware();
