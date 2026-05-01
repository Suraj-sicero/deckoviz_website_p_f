import bcrypt from "bcrypt";
import { User } from "./models/User.js";
import { sequelize } from "./config/db.js";

async function resetPassword() {
  try {
    await sequelize.authenticate();
    const email = 'vedmanirn15@gmail.com';
    const newPassword = 'password123';
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const [updated] = await User.update(
      { password: hashedPassword },
      { where: { email } }
    );
    
    if (updated) {
      console.log(`Password for ${email} has been reset to: ${newPassword}`);
    } else {
      console.log(`User ${email} not found.`);
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    process.exit();
  }
}

resetPassword();
