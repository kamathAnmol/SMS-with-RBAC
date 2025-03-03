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
}

export default UserRoleServices;
