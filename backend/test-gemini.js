import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });

async function run() {
  try {
    const result = await model.generateContent("hello");
    console.log("Success:", result.response.text());
  } catch (error) {
    console.error("Error:", error);
  }
}
run();
