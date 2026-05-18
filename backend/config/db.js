// ===== config/db.js =====
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Use DATABASE_URL if available (for production/PostgreSQL), otherwise fallback to local SQLite
let dbUrl = process.env.DATABASE_URL;

// If DATABASE_URL is not set but individual PG_* variables are set, construct it
if (!dbUrl && process.env.PG_HOST) {
  let host = process.env.PG_HOST;
  // Dynamic self-healing: Force correct Singapore region pooler host for project xedmnwhljuhbewqykggz
  if (host.includes("pooler.supabase.com")) {
    host = "aws-0-ap-southeast-1.pooler.supabase.com";
  }
  let user = process.env.PG_USER || "postgres";
  // Dynamic self-healing: Auto-append project ref if using Supabase pooler but missing tenant ID
  if (host.includes("pooler.supabase.com") && !user.includes("xedmnwhljuhbewqykggz")) {
    user = `${user}.xedmnwhljuhbewqykggz`;
  }
  dbUrl = `postgresql://${user}:${process.env.PG_PASSWORD}@${host}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
}

// Proactively patch DATABASE_URL if user provided the pooler URL directly but forgot/mispelled the tenant ID or host region
if (dbUrl && dbUrl.includes("pooler.supabase.com")) {
  // Force the correct Singapore region host
  dbUrl = dbUrl.replace(/@[^:]+pooler\.supabase\.com/, "@aws-0-ap-southeast-1.pooler.supabase.com");
  // Force correct username suffix
  if (!dbUrl.includes("xedmnwhljuhbewqykggz")) {
    dbUrl = dbUrl.replace("postgresql://postgres:", "postgresql://postgres.xedmnwhljuhbewqykggz:");
  }
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
