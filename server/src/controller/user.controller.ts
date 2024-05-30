import userService from "../service/user.service";
import UserService from "../service/user.service";
import { type NextFunction, type Response, type Request } from "express";

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
      const access_token = await userService.validateUser(req);
      res.send({
        message: "success",
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default new UserController();
