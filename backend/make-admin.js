// make-admin.js — promote (or demote) a user to Daily Curator admin by email.
// Usage:
//   node make-admin.js user@example.com          -> grant admin
//   node make-admin.js user@example.com false    -> revoke admin
import dotenv from "dotenv";
dotenv.config();
import { sequelize } from "./config/db.js";
import { User } from "./models/User.js";

const email = process.argv[2];
const makeAdmin = process.argv[3] !== "false"; // default true

if (!email) {
  console.error("Usage: node make-admin.js <email> [true|false]");
  process.exit(1);
}

try {
  await sequelize.authenticate();
  const user = await User.findOne({ where: { email } });
  if (!user) {
    console.error(`❌ No user found with email: ${email}`);
    process.exit(1);
  }
  user.isAdmin = makeAdmin;
  await user.save();
  console.log(`✅ ${email} isAdmin = ${makeAdmin} (id: ${user.id})`);
  process.exit(0);
} catch (err) {
  console.error("❌ Error:", err.message);
  process.exit(1);
}
