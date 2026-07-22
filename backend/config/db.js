import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

let dbUrl = process.env.DATABASE_URL;

if (!dbUrl && process.env.PG_HOST) {
  const host = process.env.PG_HOST;
  const user = process.env.PG_USER || "postgres";
  dbUrl = `postgresql://${user}:${process.env.PG_PASSWORD || ""}@${host}:${process.env.PG_PORT || 5432}/${process.env.PG_DATABASE || "postgres"}`;
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
