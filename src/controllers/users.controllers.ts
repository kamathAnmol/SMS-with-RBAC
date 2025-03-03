import UserService from "@services/user.services";
import TokenServices from "@services/token.services";
import User from "@models/users.model";
import UserRoles from "@models/userRoles.model";
import Tokens from "@models/tokens.model";
import { Request, Response } from "express";
import UserRoleServices from "@services/userRole.services";

interface UserData {
  user?: User;
  userRole?: UserRoles;
  token?: Tokens;
  status?: boolean;
  message?: string;
}

class UserConrollers {
  static async login(req: Request, res: Response): Promise<UserData> {
    const { email, password, role } = req.body;
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

  static async register(req: Request, res: Response) {
    try {
      const {
        name,
        email,
        phone,
        password,
        role,
      }: {
        name: string;
        email: string;
        phone: string;
        role: number;
        password: string;
      } = req.body;

      if (!name || !email || !phone || !password || !role) {
        res.status(401).json({
          status: false,
          message:
            "Name, Email, Phone and Password is required in Request Body",
          data: null,
        });
        return;
      }
      const isUserAvailable = await UserService.getUserByEmail(email);
      if (isUserAvailable) {
        const isUserRoleAvailable = await UserRoleServices.getUserRole(
          isUserAvailable.id,
          role
        );
        console.log(
          "👾 SMS-with-RBAC :: controllers/users.controllers.ts :: isUserRoleAvailable :: 77 :: isUserRoleAvailable:",
          isUserRoleAvailable
        );
        if (isUserRoleAvailable) {
          res.status(400).json({
            status: false,
            message: "Email Already used for the role",
            data: null,
          });
          return;
        }
        // todo : add entry to student,faculty table based on the role
        const newUserRole = await UserRoleServices.addUserRole(
          isUserAvailable.id,
          role,
          1234 // todo : pass the id from the role table(student,faculty)
        );
        res.status(201).json({
          status: true,
          message: "User was already created, Created a User Role",
          data: { user: isUserAvailable, userRole: newUserRole },
        });
        return;
      } else {
        const newUser = await UserService.createUser({
          name: name,
          email: email,
          phone: phone,
          password: password,
          status: "active",
        });
        console.log(
          "👾 SMS-with-RBAC :: controllers/users.controllers.ts :: newUser :: 102 :: newUser:",
          newUser
        );
        // todo : add entry to student,faculty table based on the role
        const newUserRole = await UserRoleServices.addUserRole(
          newUser.id,
          role,
          1234 // todo : pass the id from the role table(student,faculty)
        );
        console.log(
          "👾 SMS-with-RBAC :: controllers/users.controllers.ts :: newUserRole :: 111 :: newUserRole:",
          newUserRole
        );

        res.status(201).json({
          status: true,
          message: "User is Created with user role",
          data: { user: newUser, userRole: newUserRole },
        });
        return;
      }
    } catch (error) {
      console.log(
        "SMS-with-RBAC :: controllers/users.controllers.ts :: emailAvailable :: 62 :: error:",
        error
      );
      res.status(400).json({
        status: false,
        message: "Error while creating new user",
        data: error,
      });
    }
  }

  static async getAll(req: Request, res: Response) {
    const result = await UserService.getAllUsers();
    res.status(200).json({
      status: true,
      message: "Success",
      data: result,
    });
  }
}

export default UserConrollers;
