import { Router } from "express";
import RolesRouter from "./roles.route";
import UserRouter from "./user.route";

const router = Router();

router.use("/roles", RolesRouter);
router.use("/user", UserRouter);

export default router;
