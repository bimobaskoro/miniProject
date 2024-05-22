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
        .cookie("access token", accessToken)
        .cookie("refresh token", refreshToken)
        .send({
          message: "user login",
        });
    } catch (error) {
      next(error);
    }
  }

  async validateUser(req: Request, res: Response, next: NextFunction) {
    try {
      res.send({
        message:"success"
      })
    } catch (error) {
      next(error);
    }
  }
}
export default new UserController();
