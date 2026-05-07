import { User } from "./models/User.js";
import { sequelize } from "./config/db.js";

async function checkUsers() {
  try {
    await sequelize.authenticate();
    const users = await User.findAll({ attributes: ['email'] });
    console.log("Registered users:");
    users.forEach(u => console.log(`- ${u.email}`));
  } catch (err) {
    console.error("Error:", err);
  } finally {
    process.exit();
  }
}

checkUsers();
