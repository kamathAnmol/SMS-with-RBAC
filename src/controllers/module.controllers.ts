import ModulesServices from "@services/modules.services";
import { Request, Response } from "express";
import Logs from "@utilities/log";

class ModuleControllers {
  static async getAllModules(req: Request, res: Response) {
    try {
      const result = await ModulesServices.getAllModules();
      res.status(201).json({
        message: "Fetched All the modules",
        data: result,
        status: true,
      });
    } catch (error) {
      Logs.error(
        "SMS-with-RBAC :: controllers/module.controllers.ts :: ModuleControllers :: 8 :: error:",
        error
      );
      res.status(400).json({
        message: "Error while getting all the Modules",
        data: error,
        status: false,
      });
    }
  }
  static async add(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const result = await ModulesServices.addModule(name, description);
      res.status(201).json({
        message: "Module added successfully",
        data: result,
        status: true,
      });
    } catch (error) {
      Logs.error(
        "SMS-with-RBAC :: controllers/module.controllers.ts :: ModuleControllers :: 8 :: error:",
        error
      );
      res.status(400).json({
        message: "Error while getting all the Modules",
        data: error,
        status: false,
      });
    }
  }
}

export default ModuleControllers;
