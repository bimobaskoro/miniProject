import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma, PostEvent } from "@prisma/client";
import { TSeat } from "../model/seat.model";

class EventService {
  async createEvent(req: Request) {
    const {
      title,
      adminId,
      desc,
      status,
      category,
      location,
      city,
      date: dateString,
      startTime: startTimeString,
      finishTime: finishTimeString,
      seatType,
      maxSeat,
      price,
      promo,
      promoPrice,
    } = req.body;

    const priceFloat = parseFloat(price);
    const promoFloat = parseFloat(promo);

    const date = new Date(dateString);
    const startTime = new Date(startTimeString);
    const finishTime = new Date(finishTimeString);

    await prisma.$transaction(async (prisma) => {
      const createdSeats: Prisma.SeatCreateInput = {
        seatType,
        maxSeat,
        price: priceFloat,
        promo: promoFloat,
        promoPrice: priceFloat - promoFloat,
      };

      const eventData: Prisma.PostEventCreateInput = {
        title,
        admin: { connect: { id: Number(adminId) } },
        desc,
        status,
        category,
        location,
        city,
        date,
        startTime,
        finishTime,
        seats: {
          create: createdSeats,
        },
      };
      const createdEvent = await prisma.postEvent.create({
        data: eventData,
      });

      return createdEvent;
    });
  }

  async getEventsByAdminId(adminId: number): Promise<PostEvent[]> {
    const events = await prisma.postEvent.findMany({
      where: {
        adminId: adminId,
      },
      include: {
        seats: true,
      },
    });
    return events;
  }

  async updateEventById(req: Request): Promise<PostEvent[]> {
    const eventId = parseInt(req.params.id);
    const eventData = req.body;

    try {
      const updatedEvent = await prisma.$transaction(async (prisma) => {
        const updatedEvent = await prisma.postEvent.update({
          where: { id: eventId },
          data: {
            title: eventData.title,
            status: eventData.status,
            category: eventData.category,
            location: eventData.location,
            imgEvent: eventData.imgEvent,
            date: eventData.date,
            startTime: eventData.startTime,
            finishTime: eventData.finishTime,
            city: eventData.city,
            desc: eventData.desc,
          },
          include: { seats: true },
        });

        console.log("Updated Event:", updatedEvent);

        if (eventData.seats && Array.isArray(eventData.seats)) {
          const seatUpdates = eventData.seats.map((seat: any) => {
            return prisma.seat.upsert({
              where: { id: seat.id },
              update: {
                imgSeat: seat.imgSeat,
                seatType: seat.seatType,
                maxSeat: seat.maxSeat,
                price: seat.price,
                promo: seat.promo,
              },
              create: {
                imgSeat: seat.imgSeat,
                seatType: seat.seatType,
                maxSeat: seat.maxSeat,
                price: seat.price,
                promo: seat.promo,
                promoPrice: seat.promoPrice,
                postEventId: eventId,
              },
            });
          });

          await Promise.all(seatUpdates);
          console.log("Updated Seats:", seatUpdates);
        }

        return updatedEvent;
      });

      return [updatedEvent];
    } catch (error) {
      console.error("Update Failed:", error);
      throw new Error("Update Failed");
    }
  }

  async deleteEvent(req: Request): Promise<PostEvent> {
    const { id } = req.params;
    return await prisma.postEvent.delete({
      where: { id: parseInt(id) },
    });
  }

  async deleteSeats(req: Request): Promise<PostEvent | null> {
    const { id } = req.params;

    try {
      const event = await prisma.postEvent.findUnique({
        where: { id: parseInt(id) },
        include: { seats: true },
      });

      if (!event) {
        throw new Error("Event not found");
      }

      const seatId = event.seats.map((seat) => seat.id);

      await prisma.seat.deleteMany({
        where: { id: { in: seatId } },
      });

      return event;
    } catch (error) {
      console.error("Seats not found", error);
      throw new Error("Delete Seats fail");
    }
  }
} 
export default new EventService();
