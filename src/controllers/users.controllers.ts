import UserService from "@services/user.services";
import TokenServices from "@services/token.services";
import { Request, Response } from "express";
import UserRoleServices from "@services/userRole.services";
import generateHash from "@utilities/generateHash";
import checkExpiry from "@utilities/checkExpiry";
import Logs from "@utilities/log";
import { StatusCodes } from "http-status-codes";

class UserControllers {
  static async login(req: Request, res: Response) {
    try {
      // * validate
      const { email, password, role } = req.body;
      if (!email || !password || !role) {
        res.status(400).json({
          message: "Email, Password and Role is required in request body",
          status: false,
          data: null,
        });
      }
      // * Find user by given Email
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        res.status(400).json({
          message: "User not found (User with given email is not found)",
          status: false,
          data: null,
        });
      } else {
        // * check password
        const hashedPassword = generateHash(password);
        if (user.password !== hashedPassword) {
          res.status(400).json({
            message: "Incorrect Password",
            status: false,
            data: null,
          });
          return;
        }
        // * get user role
        const userRole = await UserRoleServices.getUserRole(user.id, role);
        if (!userRole) {
          res.status(400).json({
            message: `User dont have access to ${role}`,
            status: false,
            data: null,
          });
        } else {
          // * check if token is available and is not expired, if expired create new token
          let token;

          const userRoleToken = await TokenServices.getTokenByUserRole(
            userRole.id
          );
          if (userRoleToken) {
            const isExpired = checkExpiry(userRoleToken);
            if (isExpired) {
              const deleteToken = await TokenServices.deleteToken(
                userRoleToken
              );
              const newToken = await TokenServices.createToken(userRole.id);
              token = newToken;
            } else {
              token = userRoleToken;
            }
          } else {
            const newToken = await TokenServices.createToken(userRole.id);
            token = newToken;
          }
          if (token)
            res.cookie("accessToken", token.token, {
              expires: token.expiresOn,
            });
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
      Logs.error(
        "SMS-with-RBAC :: controllers/users.controllers.ts :: UserControllers :: 29 :: error:",
        error
      );

      res.status(400).json({
        status: false,
        message: "Error while logging in user",
        data: error,
      });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const {
        name,
        email,
        phone,
        password,
      }: {
        name: string;
        email: string;
        phone: string;
        password: string;
      } = req.body;

      if (!name || !email || !phone || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({
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
        res.send(StatusCodes.CONFLICT).json({
          message: "User already registered, Please Login",
          data: null,
          status: false,
        });
      } else {
        const newUser = await UserService.createUser({
          name: name,
          email: email,
          phone: phone,
          password: hashedPassword,
          status: "active",
        });
        res.status(StatusCodes.CREATED).json({
          status: true,
          message: "User created successfully",
          data: newUser,
        });
        return;
      }
    } catch (error) {
      Logs.error(
        "SMS-with-RBAC :: controllers/users.controllers.ts :: emailAvailable :: 62 :: error:",
        error
      );
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: "Error while creating new user",
        data: error,
      });
    }
  }

  static async getAll(req: Request, res: Response) {
    const result = await UserService.getAllUsers();
    res.status(StatusCodes.OK).json({
      status: true,
      message: "Success",
      data: result,
    });
  }
}

export default UserControllers;
