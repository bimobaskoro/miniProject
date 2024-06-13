import { Router } from "express";
import eventController from "../controller/event.controller";
import { verifyUser } from "../middlewares/auth.middleware";
import {
  eventValidator,
  eventPriceValidator,
} from "../middlewares/joi.validator.middleware";
import { blobUploader, uploader, uploaderSeat } from "../lib/multer";

class PostEvent {
  private router: Router;
  constructor() {
    this.router = Router();
    this.intializedRoutes();
  }

  intializedRoutes() {
    this.router.post(
      "/eventPost",
      // eventValidator,
      verifyUser,
      blobUploader().fields([
        { name: "imgEvent", maxCount: 1 },
        { name: "imgSeat", maxCount: 1 },
      ]),
      // blobUploader().single("imgEvent"),
      // blobUploader().single("imgSeat"),
      // uploaderSeat("POST", "post").single("imgSeat"),
      eventController.postEvent
    );
    this.router.get("/image/:eventId", eventController.renderImageEvent);
    this.router.get("/eventPrice", eventController.eventPriceGetByEventId);
    this.router.get("/:adminId", eventController.eventGetByID);
    this.router.get("/event/:id", eventController.eventGetById);
    this.router.get("/", eventController.eventGetAll);
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
    this.router.delete("/event/:id", eventController.deleteEventById);
    this.router.patch("/event/:id", eventController.updateEventById);
=======
>>>>>>> Branch-buat-merge
    this.router.delete("/:eventId", eventController.deleteEventById);
    this.router.patch(
      "/event/:eventId",
      verifyUser,
<<<<<<< HEAD
      eventController.updateEventById
    );
=======
      blobUploader().fields([
        { name: "imgEvent", maxCount: 1 },
        { name: "imgSeat", maxCount: 1 },
      ]),
      eventController.updateEventById
    );
>>>>>>> Stashed changes
>>>>>>> Branch-buat-merge
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
