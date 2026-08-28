import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function listModels() {
  if (!GOOGLE_API_KEY) {
    console.error("GOOGLE_API_KEY is not defined in the environment!");
    process.exit(1);
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${GOOGLE_API_KEY}`;
  try {
    const response = await axios.get(url);
    console.log("REST Available models:");
    for (const model of response.data.models) {
      console.log(`- ${model.name} (${model.displayName})`);
    }
  } catch (err) {
    console.error("Error listing models:", err.message);
  }
}

listModels();
