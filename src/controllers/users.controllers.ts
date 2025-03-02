import UserService from "@services/User.services";
import TokenServices from "@services/Token.services";
import User from "@models/users.model";
import UserRoles from "@models/userRoles.model";
import Tokens from "@models/tokens.model";

interface UserData {
  user?: User;
  userRole?: UserRoles;
  token?: Tokens;
  status?: boolean;
  message?: string;
}

class UserConrollers {
  static async login(
    email: string,
    password: string,
    role: number
  ): Promise<UserData> {
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      return {
        status: false,
        message: "User with given email was not Found",
      };
    }
    if (user.password !== password) {
      return { status: false, message: "Incorrect Password" };
    }
    const userRoles = await UserService.getUserRoles(user.id);
    const userRole = userRoles.find((ur) => ur.role === role);
    if (!userRole) {
      return { status: false, message: "User role does not exist" };
    }
    const newToken = await TokenServices.createToken(userRole.id);
    return {
      user: user,
      userRole: userRole,
      token: newToken,
    };
  }
}

export default UserConrollers;
