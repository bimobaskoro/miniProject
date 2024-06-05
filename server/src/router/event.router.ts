import { Router } from "express";
import eventController from "../controller/event.controller";
import { verifyUser } from "../middlewares/auth.middleware";
import {
  eventValidator,
  seatValidator,
} from "../middlewares/joi.validator.middleware";
import { uploader, uploaderSeat } from "../lib/multer";

class PostEvent {
  private router: Router;
  constructor() {
    this.router = Router();
    this.intializedRoutes();
  }

  intializedRoutes() {
    this.router.post(
      "/event",
      // eventValidator,
      verifyUser,
      uploader("POST", "post").single("imgEvent"),
      uploaderSeat("POST", "post").single("imgSeat"),
      eventController.postEvent
    );
    // this.router.get("/:adminId", eventController.eventGetByID);
    // this.router.patch("/:id", eventController.updateGetById);
    // this.router.delete(
    //   "/event/:id",
    //   verifyUser,
    //   eventController.deleteEventById
    // );
    // this.router.delete(
    //   "/:eventId/seats/:id",
    //   verifyUser,
    //   eventController.deleteSeatsById
    // );
  }
  getRouter() {
    return this.router;
  }
}

export default new PostEvent();
