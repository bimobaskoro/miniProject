import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma, PostEvent } from "@prisma/client";

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
      // seatType,
      // maxSeat,
      // price,
      // promo,
      // promoPrice,
    } = req.body;

    // const priceFloat = parseFloat(price);
    // const promoFloat = parseFloat(promo);

    const date = new Date(dateString);
    const startTime = new Date(startTimeString);
    const finishTime = new Date(finishTimeString);

    await prisma.$transaction(async (prisma) => {
      // const createdSeats: Prisma.SeatCreateInput = {
      //   seatType,
      //   maxSeat,
      //   price: priceFloat,
      //   promo: promoFloat,
      //   promoPrice: priceFloat - promoFloat,
      // };

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
        // seats: {
        //   create: createdSeats,
        // },
      };
      const createdEvent = await prisma.postEvent.create({
        data: eventData,
      });

      return createdEvent;
    });
  }

  async createSeat(req: Request) {
    const eventId = parseInt(req.params.eventId);
    const { seats }: { seats: any[] } = req.body;
    console.log("====================================");
    console.log(seats);
    console.log("====================================");
    if (!Array.isArray(seats)) throw new Error("Invalid Input");

    const createdSeats = seats.map((seat: any) => {
      const priceFloat = parseFloat(seat.price);
      const promoFloat = seat.promo ? parseFloat(seat.promo) : 0;

      return {
        ...seat,
        promoPrice: priceFloat - promoFloat,
        postEventId: eventId,
      };
    });

    const seat = await prisma.seat.createMany({
      data: createdSeats,
    });

    return seat;
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

        if (eventData.seats && Array.isArray(eventData.seats)) {
          const seatUpdates = eventData.seats.map((seat: any) => {
            // Jika seat memiliki id, lakukan upsert
            return prisma.seat.upsert({
              where: { id: seat.id },
              update: {
                id: seat.id,
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

  async deleteEvent(req: Request) {
    const { id } = req.params;
    return await prisma.postEvent.delete({
      where: { id: parseInt(id) },
    });
  }

  async deleteSeats(req: Request) {
    const { id } = req.params;

    try {
      const event = await prisma.postEvent.findUnique({
        where: { id: parseInt(id) },
        include: { seats: true },
      });

      if (!event) {
        throw new Error("Event not found");
      }

      const seatId = event.seats.map((e) => e.id);
      console.log(seatId);

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
