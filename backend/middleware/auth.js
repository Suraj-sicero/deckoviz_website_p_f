import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key_here";

export const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded; // Contains id and email
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Admin-only guard for the Daily Curator management endpoints.
// Verifies the JWT, then confirms the user is flagged isAdmin in the DB
// (the token itself is not trusted for the admin flag).
export const requireAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    if (!user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }

    req.user = decoded;
    req.adminUser = user;
    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
