import { Router } from "express";
import RolesRouter from "./roles.route";
import UserRouter from "./user.route";
import ModulesRouter from "./modules.route";
import PermissionsRouter from "./permissions.route";

const v1router = Router();

v1router.use("/roles", RolesRouter);
v1router.use("/user", UserRouter);
v1router.use("/modules", ModulesRouter);
v1router.use("/permissions", PermissionsRouter);

export default v1router;
