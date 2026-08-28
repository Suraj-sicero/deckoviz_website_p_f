import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function listModels() {
  if (!GOOGLE_API_KEY) {
    console.error("GOOGLE_API_KEY is not defined in the environment!");
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
  try {
    const response = await genAI.listModels();
    console.log("Available models:");
    for (const model of response.models) {
      console.log(`- Name: ${model.name}, DisplayName: ${model.displayName}, Methods: ${model.supportedGenerationMethods.join(", ")}`);
    }
  } catch (err) {
    console.error("Error listing models:", err.message);
  }
}

listModels();
