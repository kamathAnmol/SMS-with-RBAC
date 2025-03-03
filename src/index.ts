import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";
import sequelize from "@config/database";
import router from "@routes/index";

config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", router);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    console.log("DB connected ");
  } catch (error) {
    console.error("Error while connecteing to DB, ", error);
  }
});
