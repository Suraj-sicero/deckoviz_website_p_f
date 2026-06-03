import { User } from "../models/User.js";
import { sequelize } from "../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key_here";

async function generateToken() {
  try {
    await sequelize.authenticate();
    let user = await User.findOne({ where: { email: "test@example.com" } });
    if (!user) {
      user = await User.create({
        email: "test@example.com",
        password: "testpassword", // hashed or plain depending on auth implementation
        credits: 1000
      });
      console.log("Created user test@example.com");
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    console.log("JWT_TOKEN:", token);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    process.exit();
  }
}

generateToken();
