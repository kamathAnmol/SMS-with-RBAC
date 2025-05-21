import Roles from "@models/roles.model";
import UserRoles from "@models/userRoles.model";

class UserRoleServices {
  static async getUserRole(user: number, role: number) {
    return await UserRoles.findOne({
      where: {
        user: user,
        role: role,
      },
    });
  }
  static async addUserRole(user: number, role: number, ref: number) {
    return UserRoles.create({ user: user, role: role, student: ref });
  }
  static async getUserRolesByUser(user: number) {
    // Find all roles for the user and include role names
    return await UserRoles.findAll({
      where: { user: user },
      include: [
        {
          model: Roles,
          attributes: ["name"],
        },
      ],
    });
  }
}

export default UserRoleServices;
