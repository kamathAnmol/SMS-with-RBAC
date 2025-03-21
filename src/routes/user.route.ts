import UserControllers from "@controllers/users.controllers";
import { Router } from "express";

const UserRouter = Router();

UserRouter.get("/getAll", UserControllers.getAll);
UserRouter.post("/create", UserControllers.register);
UserRouter.post("/login", UserControllers.login);

export default UserRouter;
