import dotenv from 'dotenv';
dotenv.config();

async function listModels() {
  const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!GEMINI_KEY) {
    console.error("No API key found");
    return;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error fetching models:", err.message);
  }
}

listModels();
