// ===== config/db.js =====
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Use DATABASE_URL if available (for production/PostgreSQL), otherwise fallback to local SQLite
let dbUrl = process.env.DATABASE_URL;

// If DATABASE_URL is not set but individual PG_* variables are set, construct it
if (!dbUrl && process.env.PG_HOST) {
  let user = process.env.PG_USER || "postgres";
  // Proactively auto-append project ref if using Supabase pooler but missing tenant ID
  if (process.env.PG_HOST.includes("pooler.supabase.com") && !user.includes("xedmnwhljuhbewqykggz")) {
    user = `${user}.xedmnwhljuhbewqykggz`;
  }
  dbUrl = `postgresql://${user}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
}

// Proactively patch DATABASE_URL if user provided the pooler URL directly but forgot the tenant ID in username
if (dbUrl && dbUrl.includes("pooler.supabase.com") && !dbUrl.includes("xedmnwhljuhbewqykggz")) {
  dbUrl = dbUrl.replace("postgresql://postgres:", "postgresql://postgres.xedmnwhljuhbewqykggz:");
}

export const sequelize = dbUrl 
  ? new Sequelize(dbUrl, {
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
