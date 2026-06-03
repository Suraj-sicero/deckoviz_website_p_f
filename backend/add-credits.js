// add-credits.js — add credits to a user by email
// Usage: node add-credits.js <email> <amount>
import dotenv from "dotenv";
dotenv.config();
import { sequelize } from "./config/db.js";
import { User } from "./models/User.js";

const email = process.argv[2] || "vedmanirn15@gmail.com";
const amount = parseInt(process.argv[3] || "100", 10);

if (!email || isNaN(amount)) {
  console.error("Usage: node add-credits.js <email> [amount]");
  process.exit(1);
}

try {
  await sequelize.authenticate();
  const user = await User.findOne({ where: { email } });
  if (!user) {
    console.error(`❌ No user found with email: ${email}`);
    process.exit(1);
  }
  
  const oldCredits = user.credits || 0;
  user.credits = oldCredits + amount;
  await user.save();
  
  console.log(`✅ Successfully added ${amount} credits to ${email}.`);
  console.log(`Previous balance: ${oldCredits}`);
  console.log(`New balance: ${user.credits}`);
  process.exit(0);
} catch (err) {
  console.error("❌ Error:", err.message);
  process.exit(1);
}
