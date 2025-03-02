import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";
import sequelize from "./config/database";
import User from "./models/users.model";

config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get("/test", async (req, res) => {
  console.log(
    "👾 SMS-with-RBAC :: src/index.ts :: port :: 20 ::  await User.findAll():",
    (await User.findAll()).map((i) => i.toJSON())
  );
});
app.get("/create", async (req, res) => {
  console.log(
    "👾 SMS-with-RBAC :: src/index.ts :: port :: 20 ::  await User.findAll():",
    await User.create({
      name: "test",
      password: "1234",
      email: "test@gmail.com",
      phone: "1111111111",
    })
  );
});

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
