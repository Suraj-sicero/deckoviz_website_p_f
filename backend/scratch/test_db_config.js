import { sequelize } from "../config/db.js";

console.log("Testing Sequelize connection from config/db.js...");
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Success! Connected successfully via config/db.js!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to connect:", err);
    process.exit(1);
  }
})();
