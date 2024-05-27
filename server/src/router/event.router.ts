import { Router } from "express";
import eventController from "../controller/event.controller";
import { verifyUser } from "../middlewares/auth.middleware";

class PostEvent {
  private router: Router;
  constructor() {
    this.router = Router();
    this.intializedRoutes();
  }

  intializedRoutes() {
    this.router.post("/", verifyUser, eventController.postEvent);
    this.router.get("/:adminId", eventController.eventGetByID);
    this.router.patch("/:id", eventController.updateGetById);
  }
  getRouter() {
    return this.router;
  }
}

export default new PostEvent();
