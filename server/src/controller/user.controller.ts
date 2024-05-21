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
}
export default new UserController();
