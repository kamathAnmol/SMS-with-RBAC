import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";
import pool from "./config/database";

config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get("/test", async (req, res) => {
  const result = await pool.query("select * from test");
  console.log(
    "👾 SMS-with-RBAC :: src/index.ts :: result :: 19 :: result:",
    result
  );

  res.send("Server running successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
