import Replicate from "replicate";
import dotenv from "dotenv";
dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function run() {
  const output = await replicate.run(
    "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
    {
      input: {
        prompt: "A brave knight",
        negative_prompt: "deformed, blurry, ugly, low quality",
      }
    }
  );
  console.log("Output type:", typeof output);
  console.log("Is array?", Array.isArray(output));
  console.log("Output content:", output);
  
  if (Array.isArray(output)) {
      console.log("Array item 0:", output[0]);
      console.log("Array item 0 type:", typeof output[0]);
      console.log("Array item 0 string:", String(output[0]));
      if (output[0].url) {
          console.log("Has .url property:", output[0].url());
      }
  }
}
run();
