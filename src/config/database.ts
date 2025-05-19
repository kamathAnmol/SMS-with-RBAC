import Logs from "@utilities/log";
import { config } from "dotenv";
import { Sequelize } from "sequelize";
config();

const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  logging: (sql) => {
    Logs.db(sql);
  },
});

export default sequelize;
