// ===== config/db.js =====
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Use DATABASE_URL if available (for production/PostgreSQL), otherwise fallback to local SQLite
let dbUrl = process.env.DATABASE_URL;

// If DATABASE_URL is not set but individual PG_* variables are set, construct it
if (!dbUrl && process.env.PG_HOST) {
  const host = process.env.PG_HOST;
  const user = process.env.PG_USER || "postgres";
  dbUrl = `postgresql://${user}:${process.env.PG_PASSWORD || ""}@${host}:${process.env.PG_PORT || 5432}/${process.env.PG_DATABASE || "postgres"}`;
}

// Dynamic self-healing for Supabase Connection Pooler:
// Automatically detects and parses pooler endpoints, forcing correct Singapore region cluster (aws-1)
// and appending the project reference (xedmnwhljuhbewqykggz) to the username to resolve authentication routing failures.
if (dbUrl) {
  try {
    const parsedUrl = new URL(dbUrl);
    if (parsedUrl.hostname.includes("pooler.supabase.com")) {
      // Force correct Singapore regional pooler (aws-1 cluster is assigned to this project)
      parsedUrl.hostname = "aws-1-ap-southeast-1.pooler.supabase.com";
      
      // Auto-append project ref if missing from the user credentials
      const username = parsedUrl.username;
      if (username && !username.includes("xedmnwhljuhbewqykggz")) {
        parsedUrl.username = `${username}.xedmnwhljuhbewqykggz`;
      }
      dbUrl = parsedUrl.toString();
    }
  } catch (urlErr) {
    // Fallback to regex patch in case of non-standard connection format
    if (dbUrl.includes("pooler.supabase.com")) {
      dbUrl = dbUrl.replace(/@[^:]+pooler\.supabase\.com/, "@aws-1-ap-southeast-1.pooler.supabase.com");
      if (!dbUrl.includes("xedmnwhljuhbewqykggz")) {
        dbUrl = dbUrl.replace(/:\/\/(postgres):/, "://$1.xedmnwhljuhbewqykggz:");
      }
    }
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

export { dbUrl };

