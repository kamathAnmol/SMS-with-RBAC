import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";
import sequelize from "@config/database";
import router from "@routes/index";
import cookieParser from "cookie-parser";
import Logs from "@utilities/log";
import "@models/associations";
config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", router);

app.listen(port, async () => {
  Logs.info(`Server is running on port ${port}`);
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    Logs.info("DB connected ");
  } catch (error) {
    Logs.error("Error while connecting to DB, ", error);
  }
});
