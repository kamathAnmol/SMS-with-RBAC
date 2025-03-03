import RolesServices from "@services/roles.services";
import { Request, Response } from "express";

class RolesConroller {
  static async getAll(req: Request, res: Response) {
    try {
      const roles = await RolesServices.getAllRoles();
      res.status(201).json({
        status: true,
        message: "Fetched all the roles",
        data: roles,
      });
    } catch (error) {
      console.log(
        " SMS-with-RBAC :: routes/roles.route.ts :: roles :: 14 :: error:",
        error
      );
      res.status(401).json({
        status: false,
        message: "Error while getting all the roles",
        data: error,
      });
    }
  }

  static async createNew(req: Request, res: Response) {
    try {
      if (!req.body.name) {
        return {
          status: false,
          message: "Name is required in th request body",
          data: null,
        };
      }
      const newRole = await RolesServices.createRole(
        req.body.name,
        req.body.description
      );
      res.status(201).json({
        status: true,
        message: "Successfully added the new role",
        data: newRole,
      });
    } catch (error) {
      console.log(
        "SMS-with-RBAC :: routes/roles.route.ts :: roles :: 31 :: error:",
        error
      );

      res.status(401).json({
        status: false,
        message: "Error while Adding the new role",
        data: error,
      });
    }
  }
}

export default RolesConroller;
