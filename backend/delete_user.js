import { User } from "./models/User.js";
import { sequelize } from "./config/db.js";

async function deleteUser() {
  try {
    await sequelize.authenticate();
    const result = await User.destroy({ where: { email: "vedmanirn15@gmail.com" } });
    console.log(`Deleted ${result} users`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    process.exit();
  }
}

deleteUser();
