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
      seatType,
      maxSeat,
      price,
      promo,
      promoPrice,
    } = req.body;

    const priceFloat = parseFloat(price);
    const promoFloat = parseFloat(promo);
    const promoPriceFloat = parseFloat(promoPrice);

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
}

export default new EventService();
