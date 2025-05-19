import ModulesServices from "@services/modules.services";
import PermissionsServices from "@services/permissions.services";
import RolesServices from "@services/roles.services";
import Logs from "@utilities/log";
import { Request, Response } from "express";

export default class PermissionsControllers {
  static async createPermissions(req: Request, res: Response) {
    try {
      const { role, module, permissions } = req.body;
      if (!role || !module || !permissions) {
        res.status(404).json({
          message:
            "Role, Module and Permission fields are required in request body",
          data: req.body,
          status: false,
        });
        return;
      }
      const isRoleAvailable = await RolesServices.getRoleById(role);
      if (!isRoleAvailable) {
        res.status(400).json({
          message: "Invalid Role",
          data: role,
          status: false,
        });
        return;
      }
      const isModuleAvailable = await ModulesServices.getById(module);
      if (!isModuleAvailable) {
        res.status(400).json({
          message: "Invalid Module",
          data: module,
          status: false,
        });
        return;
      }
      const isPermissionAvailable = await PermissionsServices.getPermissions(
        role,
        module
      );
      if (isPermissionAvailable) {
        res.status(400).json({
          message: "Permission already available for selected Role and module",
          data: { role, module },
          status: false,
        });
        return;
      }
      const newPermission = await PermissionsServices.createPermission(
        role,
        module,
        permissions
      );
      res.status(201).json({
        message: "Permission Created Successfully",
        data: newPermission,
        status: true,
      });
    } catch (error) {
      Logs.error(
        "SMS-with-RBAC :: controllers/permissions.controllers.ts :: PermissionsControllers :: 7 :: error:",
        error
      );
      res.status(400).json({
        message: "Error while creating permission",
        data: error,
        status: false,
      });
    }
  }
  static async getPermission(req: Request, res: Response) {
    try {
    } catch (error) {}
  }
}
