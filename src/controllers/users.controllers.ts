import UserService from "@services/user.services";
import TokenServices from "@services/token.services";
import User from "@models/users.model";
import UserRoles from "@models/userRoles.model";
import Tokens from "@models/tokens.model";
import { Request, Response } from "express";
import UserRoleServices from "@services/userRole.services";
import generateHash from "@utilities/generateHash";
import generateToken from "@utilities/generateToken";

class UserConrollers {
  static async login(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;
      if (!email || !password || !role) {
        res.status(400).json({
          message: "Email, Password and Role is required in request body",
          status: false,
          data: null,
        });
      }
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        res.status(400).json({
          message: "User not found (User with given email is not found)",
          status: false,
          data: null,
        });
      } else {
        const hashedPassword = generateHash(password);
        if (user.password !== hashedPassword) {
          res.status(400).json({
            message: "Incorrect Password",
            status: false,
            data: null,
          });
          return;
        }
        const userRole = await UserRoleServices.getUserRole(user.id, role);
        if (!userRole) {
          res.status(400).json({
            message: `User dont have access to ${role}`,
            status: false,
            data: null,
          });
        } else {
          const token = await TokenServices.createToken(userRole.id);
          res.cookie("accessToken", token.token, { expires: token.expiresOn });
          res.status(201).json({
            status: true,
            message: "User logged in successfully",
            data: {
              user: user,
              userRole: userRole,
              token: token,
            },
          });
        }
      }
    } catch (error) {
      console.log(
        "SMS-with-RBAC :: controllers/users.controllers.ts :: UserConrollers :: 29 :: error:",
        error
      );

      res.status(400).json({
        status: false,
        message: "Error while logging in user",
        data: error,
      });
    }
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
      const hashedPassword = generateHash(password);
      const isUserAvailable = await UserService.getUserByEmail(email);
      if (isUserAvailable) {
        const isUserRoleAvailable = await UserRoleServices.getUserRole(
          isUserAvailable.id,
          role
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
          password: hashedPassword,
          status: "active",
        });
        // todo : add entry to student,faculty table based on the role
        const newUserRole = await UserRoleServices.addUserRole(
          newUser.id,
          role,
          1234 // todo : pass the id from the role table(student,faculty)
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
