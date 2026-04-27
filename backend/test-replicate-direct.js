import dotenv from 'dotenv';
dotenv.config();

async function testReplicate() {
  const token = process.env.REPLICATE_API_TOKEN;
  const res = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      // Try to use a known good version of SDXL
      version: "7762fd0e0f370ed7a503f309e2a2eaf731a02257dd0cba994064cde1b905fccc", 
      input: { prompt: "a cat" }
    })
  });
  
  if (res.ok) {
    console.log("Replicate API check: OK (Created prediction)");
  } else {
    console.log("Replicate API check: FAILED", res.status, await res.text());
  }
}

testReplicate();
