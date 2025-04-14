import Permissions from "@models/permissions.model";

export default class PermissionsServices {
  static async getPermissions(role: number, module: number) {
    const permissions = await Permissions.findOne({
      where: {
        role,
        module,
      },
    });
    return permissions;
  }
  static async getPermissionsByRole(role: number) {
    const permissions = await Permissions.findAll({
      where: {
        role,
      },
    });
    return permissions;
  }
  static async getPermissionsByModule(module: number) {
    const permissions = await Permissions.findAll({
      where: {
        module,
      },
    });
    return permissions;
  }

  static async createPermission(
    role: number,
    module: number,
    permissions: string
  ) {
    const permission = await Permissions.create({
      role,
      module,
      permissions,
    });
    return permission;
  }
}
