import ModuleControllers from "@controllers/module.controllers";
import express from "express";

const ModulesRouter = express.Router();

ModulesRouter.get("/getAll", ModuleControllers.getAllModules);
ModulesRouter.post("/add", ModuleControllers.add);

export default ModulesRouter;
