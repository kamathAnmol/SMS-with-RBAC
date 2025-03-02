import Roles from "@models/roles.model";
import UserRoles from "@models/userRoles.model";
import User from "@models/users.model";

class UserService {
  // * Get all users
  static async getAllUsers() {
    return await User.findAll();
  }

  // * Get a single user by ID
  static async getUserById(id: number) {
    return await User.findByPk(id);
  }

  // * get user by email
  static async getUserByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

  // * Create a new user
  static async createUser(data: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }) {
    return await User.create(data);
  }

  // * Update user details
  static async updateUser(id: number, updateData: Partial<User>) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    await user.update(updateData);
    return user;
  }

  // * Delete a user
  static async deleteUser(id: number) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    await user.destroy();
    return { message: "User deleted successfully" };
  }

  // * get user roles

  static async getUserRoles(id: number): Promise<UserRoles[]> {
    return await UserRoles.findAll({
      where: {
        user: id,
      },
    });
  }
}

export default UserService;
