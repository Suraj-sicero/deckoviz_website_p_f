import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();

const client = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 3) {
        // Stop reconnecting to prevent log flooding when Redis is not available
        return false;
      }
      return Math.min(retries * 200, 2000);
    }
  }
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
