import userService from "../service/user.service";
import UserService from "../service/user.service";
import { type NextFunction, type Response, type Request } from "express";
import { TAccountData } from "../model/user.model";
// import { AccountData } from "@prisma/client";
// import { handleVerification } from "../lib/nodemailer";

declare module "express" {
  interface Request {
    accountData?: TAccountData;
  }
}

export class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.userRegister(req);
      res.status(201).send({
        message: "User registered",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken, refreshToken } = await UserService.userLogin(req);

      res
        .cookie("access_token", accessToken)
        .cookie("refresh_token", refreshToken)
        .send({
          message: "user login",
        });
    } catch (error) {
      next(error);
    }
  }

  async userGetById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userService.userGetById(req);
      res.send({
        message: "user has been find",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async validateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { access_token, is_verified } = await userService.validateUser(req);
      console.log("====================================");
      console.log(access_token, "ini access token");
      console.log("====================================");
      res.send({
        message: "success",
        is_verified,
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  async sendVerification(req: Request, res: Response, next: NextFunction) {
    try {
      UserService.registerVerify(req);

      res
        .status(200)
        // .send("verify email success")
        .redirect("http://localhost:3000/login");
    } catch (error) {
      next(error);
    }
  }
}
export default new UserController();
