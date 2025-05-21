import UserService from "@services/user.services";
import { Request, Response } from "express";
import generateHash from "@utilities/generateHash";
import Logs from "@utilities/log";
import { StatusCodes } from "http-status-codes";
import UserRoleServices from "@services/userRole.services";
import SessionServices from "@services/sessions.services";

class AuthControllers {
  static async signin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email) {
        Logs.error("Email is not provided in the request body");
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Email is Required",
          data: {
            error: "Email is Not provided in the request body",
          },
          status: false,
        });
        return;
      }
      if (!password) {
        Logs.error("Password is not provided in the request body");
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Password is Required",
          data: {
            error: "Password is Not provided in the request body",
          },
          status: false,
        });
        return;
      }
      const user = (await UserService.getUserByEmail(email))?.toJSON();
      if (!user) {
        Logs.error(`No User found with ${email} email`);
        res.status(StatusCodes.NOT_FOUND).json({
          message: "You are not registered, Please sign up first",
          data: {
            error: `No User found with ${email} email`,
          },
          status: false,
        });
        return;
      }
      const hashedPassword = generateHash(password);
      if (user.password !== hashedPassword) {
        Logs.error(`Password mismatch`);
        res.status(StatusCodes.NOT_FOUND).json({
          message: "Incorrect password, Please try again",
          data: {
            error: `No User found with ${email} email`,
          },
          status: false,
        });
        return;
      }
      delete (user as any).password;

      /*
       * create new session, if existing session is found delete it
       */

      await SessionServices.removeUserSession(user.id);
      const tokens = await SessionServices.createSession(user.id);
      const userRoles = await UserRoleServices.getUserRolesByUser(user.id);
      res.cookie("accessToken", tokens.accessToken);
      res.cookie("refreshToken", tokens.refreshToken);
      res.cookie("userData", {
        ...user,
        userRoles: userRoles,
      });
      res.status(StatusCodes.OK).json({
        message: "Logged in Successfully",
        data: {
          ...user,
          userRoles: userRoles,
        },
        status: true,
      });
      return;
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

  static async signup(req: Request, res: Response) {
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

  // static async getAll(req: Request, res: Response) {
  //   const result = await UserService.getAllUsers();
  //   res.status(StatusCodes.OK).json({
  //     status: true,
  //     message: "Success",
  //     data: result,
  //   });
  // }
}

export default AuthControllers;
