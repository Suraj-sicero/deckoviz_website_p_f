import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function run() {
  try {
    // There isn't a direct listModels in the simple genAI object in all versions, 
    // but we can try to hit an endpoint.
    // For now, let's just try gemini-pro which is the most stable name.
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("hello");
    console.log("Success with gemini-pro:", result.response.text());
  } catch (error) {
    console.error("Error:", error.message);
  }
}
run();
