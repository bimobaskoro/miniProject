import { Router } from "express";
import userController from "../controller/user.controller";
import { verifyUser } from "../middlewares/auth.middleware";
import {
  registerValidator,
  loginValidator,
} from "../middlewares/joi.validator.middleware";

class UserRouter {
  private router: Router;
  constructor() {
    this.router = Router();
    this.initializedRoutes();
  }
  initializedRoutes() {
    this.router.post("/v1", loginValidator, userController.login);
    this.router.post("/v2", registerValidator, userController.register);
    this.router.get("/validate", verifyUser, userController.validateUser);
    this.router.get("/forgotPassword", userController.forgotPassword);
    this.router.get("/:id", userController.userGetById);
    this.router.get("/verify/:token", userController.sendVerification);
    this.router.post("/sendEmail", userController.requestEmailResetPass);
  }
  getRouter() {
    return this.router;
  }
}

export default new UserRouter();
