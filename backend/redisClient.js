import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();

const client = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});

client.on("error", (err) => console.log("Redis Error:", err));

(async () => {
  try {
    await client.connect();
    console.log("✅ Redis Connected");
  } catch (err) {
    console.error("❌ Redis connection failed. Some features may be disabled.");
  }
})();

export default client;
