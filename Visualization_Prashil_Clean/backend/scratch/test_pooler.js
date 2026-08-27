import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const host = "aws-1-ap-southeast-1.pooler.supabase.com";
const port = 6543;
const user = "postgres.xedmnwhljuhbewqykggz";
const password = process.env.PG_PASSWORD;
const database = "postgres";

console.log("Connecting using Sequelize options to Singapore pooler...");
console.log("Host:", host);
console.log("Port:", port);
console.log("User:", user);

const sequelize = new Sequelize(database, user, password, {
  host: host,
  port: port,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: console.log,
});

(async () => {
  try {
    console.log("Connecting...");
    await sequelize.authenticate();
    console.log("✅ Success! Singapore pooler connected!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to connect:", err);
    process.exit(1);
  }
})();
