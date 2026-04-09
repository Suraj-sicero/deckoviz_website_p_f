import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function run() {
  const models = ["gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-1.0-pro"];
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
