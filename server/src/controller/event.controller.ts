import { NextFunction, Request, Response } from "express";
import eventService from "../service/event.service";

export class EventController {
  async postEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventService.createEvent(req);
      res.status(201).send({
        message: "Even has been post",
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
}

export default new EventController();