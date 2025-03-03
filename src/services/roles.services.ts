import Roles from "@models/roles.model";

class RolesServices {
  static async getAllRoles() {
    return await Roles.findAll();
  }

  static async createRole(name: string, description?: string) {
    const newRole = await Roles.create({
      name: name,
      description: description ? description : null,
    });
    return newRole;
  }
  static async getRoleById(id: number) {
    return await Roles.findByPk(id);
  }
}

export default RolesServices;
