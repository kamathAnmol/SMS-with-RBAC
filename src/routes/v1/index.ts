import { Router } from "express";
import RolesRouter from "./roles.route";
import UserRouter from "./user.route";

const v1router = Router();

v1router.use("/roles", RolesRouter);
v1router.use("/user", UserRouter);

export default v1router;
