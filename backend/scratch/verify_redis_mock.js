import client from "../redisClient.js";

console.log("Checking imported Redis client object...");
console.log("client exists:", !!client);
console.log("client.isOpen:", client.isOpen);

if (client && !client.isOpen) {
  console.log("✅ Successfully verified Redis mock client exports correctly when REDIS_URL is absent!");
  process.exit(0);
} else {
  console.error("❌ Redis mock verification failed.");
  process.exit(1);
}
