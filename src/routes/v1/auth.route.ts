import AuthControllers from "@controllers/auth.controllers";
import { Router } from "express";

const AuthRouter = Router();

// AuthRouter.get("/getAll", AuthControllers.getAll);
AuthRouter.post("/signup", AuthControllers.signup);
AuthRouter.post("/signin", AuthControllers.signin);

export default AuthRouter;
