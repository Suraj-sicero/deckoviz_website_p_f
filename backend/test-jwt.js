import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key_here";
try {
  const token = jwt.sign({ id: "123", email: "test@example.com" }, JWT_SECRET, { expiresIn: "7d" });
  console.log("Token generated successfully");
} catch (e) {
  console.error("JWT Error:", e.message);
}
process.exit();
