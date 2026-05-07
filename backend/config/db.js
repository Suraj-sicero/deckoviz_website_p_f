// ===== config/db.js =====
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Use DATABASE_URL if available (for production/PostgreSQL), otherwise fallback to local SQLite
export const sequelize = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false,
    })
  : new Sequelize({
      dialect: "sqlite",
      storage: "./database.sqlite",
      logging: false,
    });
