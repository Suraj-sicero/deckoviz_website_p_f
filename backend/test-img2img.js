import Replicate from "replicate";
import dotenv from 'dotenv';
dotenv.config();

async function testImg2Img() {
  const token = process.env.REPLICATE_API_TOKEN;
  const replicate = new Replicate({ auth: token });
  
  try {
    console.log("Testing Img2Img...");
    // Just a small 1x1 black pixel as base64 for testing
    const dataUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    
    const output = await replicate.run(
      "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
      {
        input: {
          image: dataUri,
          prompt: "a cat",
          prompt_strength: 0.5
        }
      }
    );
    console.log("Success:", output);
  } catch (err) {
    console.log("Failed:", err.message);
  }
}

testImg2Img();
