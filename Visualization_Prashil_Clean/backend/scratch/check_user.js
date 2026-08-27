import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

import { sequelize } from "../config/db.js";
import { User } from "../models/User.js";

(async () => {
  try {
    await sequelize.authenticate();
    const user = await User.findOne({ where: { email: "diagnostic_local_may18_test@example.com" } });
    if (user) {
      console.log("✅ User found in Supabase database!");
      console.log("ID:", user.id);
      console.log("Email:", user.email);
      console.log("Username:", user.username);
      console.log("Credits:", user.credits);
    } else {
      console.log("❌ User NOT found in database.");
    }
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
})();
