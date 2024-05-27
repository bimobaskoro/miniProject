import { NextFunction, Request, Response } from "express";
import eventService from "../service/event.service";

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

  async postSeat(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventService.createSeat(req);
      res.status(201).send({
        message: "Seat has post",
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

  async updateGetById(req: Request, res: Response, next: NextFunction) {
    try {
      await eventService.updateEventById(req);
      return res.send({
        message: "event has been update",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteEventById(req: Request, res: Response, next: NextFunction) {
    try {
      await eventService.deleteEvent(req);
      return res.send({
        message: "Event deleted by ID",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteSeatsById(req: Request, res: Response, next: NextFunction) {
    try {
      await eventService.deleteSeats(req);
      return res.send({
        message: "Seats have been deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new EventController();
