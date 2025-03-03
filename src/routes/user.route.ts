import UserConrollers from "@controllers/users.controllers";
import { Router } from "express";

const UserRouter = Router();

UserRouter.get("/getAll", UserConrollers.getAll);
UserRouter.post("/create", UserConrollers.register);
UserRouter.post("/login", UserConrollers.login);

export default UserRouter;
