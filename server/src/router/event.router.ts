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
    this.router.post("/event", verifyUser, eventController.postEvent);
    this.router.post("/seat/:eventId", eventController.postSeat);
    this.router.get("/:adminId", eventController.eventGetByID);
    this.router.patch("/:id", eventController.updateGetById);
    this.router.delete(
      "/event/:id",
      verifyUser,
      eventController.deleteEventById
    );
    this.router.delete(
      "/:eventId/seats/:id",
      verifyUser,
      eventController.deleteSeatsById
    );
  }
  getRouter() {
    return this.router;
  }
}

export default new PostEvent();
