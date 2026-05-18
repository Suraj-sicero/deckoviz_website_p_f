import { sequelize } from "../config/db.js";

(async () => {
  try {
    console.log("Attempting database authentication using db.js configurations...");
    await sequelize.authenticate();
    console.log("✅ db.js connected successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ db.js connection failed:", err.message);
    process.exit(1);
  }
})();
