import { NextFunction, Request, Response } from "express";
import eventService from "../service/event.service";
import path from "path";
import userService from "../service/user.service";

export class EventController {
  async postEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventService.createEvent(req);
      res.status(201).send({
        message: "Event has been post",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async eventGetByID(req: Request, res: Response, next: NextFunction) {
    const adminId = parseInt(req.params.adminId);
    try {
      const events = await eventService.getEventsByAdminId(adminId);
      return res.send({
        message: "fetch event by ID",
        events,
      });
    } catch (error) {
      next(error);
    }
  }

  async eventGetAll(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await eventService.getEventAll();
      return res.send({
        message: "fetch event by ID",
        events,
      });
    } catch (error) {
      next(error);
    }
  }

  async renderImageEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const blob = await eventService.getImgEvent(req);
      res.set("Content-type", "image/png");
      res.send(blob);
    } catch (err) {
      next(err);
    }
  }

  async eventPriceGetByEventId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await eventService.getEventPriceByIdEvent();
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      return res.send({
        message: "fetch event pricfe by event id",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async eventGetById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventService.getEventById(req);
      return res.send({
        message: "fetch event by id",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = eventService.updateEventById(req);
      return res.send({
        message: "Event has been updated",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventService.deleteEventById(req);
      return res.send({
        message: "Event has been deleted",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  // async updateGetById(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     await eventService.updateEventById(req);
  //     return res.send({
  //       message: "event has been update",
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async deleteEventById(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     await eventService.deleteEvent(req);
  //     return res.send({
  //       message: "Event deleted by ID",
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async deleteSeatsById(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     await eventService.deleteSeats(req);
  //     return res.send({
  //       message: "Seats have been deleted",
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

export default new EventController();
