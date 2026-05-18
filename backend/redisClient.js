import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();

const redisUrl = process.env.REDIS_URL;
let client = null;

if (redisUrl) {
  client = createClient({
    url: redisUrl,
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

  client.on("error", (err) => {
    console.log("Redis Connection Error:", err.message || err);
  });

  (async () => {
    try {
      await client.connect();
      console.log("✅ Redis Connected");
    } catch (err) {
      console.error("❌ Redis connection failed. Some features may be disabled.");
    }
  })();
} else {
  console.log("ℹ️ Redis is not configured (REDIS_URL env var is missing). Skipping Redis initialization.");
  // Safe fallback mock object to satisfy server.js integration checks
  client = {
    isOpen: false,
    connect: async () => {},
    on: () => {},
    set: async () => {},
    get: async () => {}
  };
}

export default client;
