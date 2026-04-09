import dotenv from "dotenv";
dotenv.config();

async function callLLM(prompt) {
  const GROQ_KEY = process.env.GROQ_API_KEY;

  if (GROQ_KEY) {
    try {
      console.log("Testing Groq fallback...");
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return data.choices[0].message.content;
      }
      console.warn("Groq failing...", await res.text());
    } catch (err) {
      console.error("Groq Error:", err.message);
    }
  }
}

async function run() {
  const result = await callLLM("Write a short story about a cat in JSON format: { \"title\": \"...\", \"story\": \"...\" }");
  console.log("Result:", result);
}
run();
