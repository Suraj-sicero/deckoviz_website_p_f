import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function run() {
  const models = [
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro-latest",
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-pro-latest"
  ];
  for (const m of models) {
    try {
      console.log(`Testing model: ${m}`);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("hello");
      console.log(`Success with ${m}:`, result.response.text());
      break; 
    } catch (error) {
      console.error(`Error with ${m}:`, error.message);
    }
  }
}
run();
