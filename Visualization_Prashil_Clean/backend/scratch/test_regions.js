import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const regions = [
  "ap-southeast-1", // Singapore
  "ap-south-1",     // Mumbai
  "us-east-1",      // N. Virginia
  "us-west-1",      // N. California
  "eu-central-1",   // Frankfurt
  "eu-west-1",      // Ireland
  "ap-northeast-1", // Tokyo
  "ap-northeast-2", // Seoul
  "ca-central-1",   // Canada Central
  "eu-west-2",      // London
  "eu-west-3",      // Paris
  "sa-east-1",      // São Paulo
  "ap-southeast-2"  // Sydney
];

const user = "postgres.xedmnwhljuhbewqykggz";
const password = process.env.PG_PASSWORD;
const database = "postgres";

(async () => {
  console.log("Testing connection across all regional pooler hosts...");
  for (const region of regions) {
    const host = `aws-0-${region}.pooler.supabase.com`;
    console.log(`\n-----------------------------------`);
    console.log(`Testing region: ${region} (${host})...`);
    
    const sequelize = new Sequelize(database, user, password, {
      host: host,
      port: 6543,
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false,
    });

    try {
      await sequelize.authenticate();
      console.log(`✅ SUCCESS! Connected successfully to ${region} pooler!`);
      await sequelize.close();
      process.exit(0);
    } catch (err) {
      console.log(`❌ Failed for ${region}: ${err.message}`);
    }
  }
  console.log("\nAll regions tested. Connection failed on all pooler regions.");
  process.exit(1);
})();
