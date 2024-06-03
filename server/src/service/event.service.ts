import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma, PostEvent, SeatDetail } from "@prisma/client";

class EventService {
  async createEvent(req: Request) {
    const adminId = req.accountData?.id;
    const {
      title,
      desc,
      status,
      seatName,
      imgEvent,
      category,
      location,
      city,
      date: dateString,
      startTime: startTimeString,
      finishTime: finishTimeString,
    } = req.body;

    const file = req.file;
    const date = new Date(dateString);
    const startTime = new Date(startTimeString);
    const finishTime = new Date(finishTimeString);

    await prisma.$transaction(async (prisma) => {
      const eventData: Prisma.PostEventCreateInput = {
        title,
        admin: { connect: { id: Number(adminId) } },
        desc,
        status,
        Seat: seatName ? { connect: { nameSeat: seatName } } : undefined,
        imgEvent: file?.filename,
        category,
        location,
        city,
        date,
        startTime,
        finishTime,
      };
      const createdEvent = await prisma.postEvent.create({
        data: eventData,
      });

      console.log("====================================");
      console.log(createdEvent);
      console.log("====================================");
      return createdEvent;
    });
  }

  async createSeat(req: Request) {
    const adminId = req.accountData?.id;
    if (adminId == undefined) {
      throw new Error("admin id not found");
    }
    const { nameSeat, imgSeat, SeatDetail } = req.body;
    const file = req.file;

    try {
      const seat = await prisma.seat.create({
        data: {
          nameSeat,
          imgSeat: file?.filename,
          adminId,
          SeatDetail: {
            createMany: {
              data: SeatDetail.map((e: any) => {
                return {
                  ...e,
                  promoPrice: parseFloat(e.price) - parseFloat(e.promo),
                };
              }),
            },
          },
        },
        include: {
          SeatDetail: true,
        },
      });

      console.log("====================================");
      console.log(seat);
      console.log("====================================");
      return seat;
    } catch (error) {
      console.log("====================================");
      console.log("Seat Error", error);
      console.log("====================================");
    }
  }

  async getSeatByAdminId(req: Request) {
    const { adminId } = req.params;
    const seat = await prisma.seat.findMany({
      select: {
        nameSeat: true,
      },
      where: {
        adminId: parseInt(adminId),
      },
    });
    return seat;
  }

  async getSeatByEventId(req: Request) {
    const { eventId } = req.params;
    const whereSeats = await prisma.postEvent.findUnique({
      select: {
        Seat: true,
      },
      where: {
        id: parseInt(eventId),
      },
    });

    return whereSeats;
  }
}

// async getEventsByAdminId(adminId: number): Promise<PostEvent[]> {
//   const events = await prisma.postEvent.findMany({
//     where: {
//       adminId: adminId,
//     },
//     include: {
//       seats: true,
//     },
//   });
//   return events;
// }

// async updateEventById(req: Request): Promise<PostEvent[]> {
//   const eventId = parseInt(req.params.id);
//   const eventData = req.body;

//   try {
//     const updatedEvent = await prisma.$transaction(async (prisma) => {
//       const updatedEvent = await prisma.postEvent.update({
//         where: { id: eventId },
//         data: {
//           title: eventData.title,
//           status: eventData.status,
//           category: eventData.category,
//           location: eventData.location,
//           imgEvent: eventData.imgEvent,
//           date: eventData.date,
//           startTime: eventData.startTime,
//           finishTime: eventData.finishTime,
//           city: eventData.city,
//           desc: eventData.desc,
//         },
//         include: { seats: true },
//       });

//       if (eventData.seats && Array.isArray(eventData.seats)) {
//         const seatUpdates = eventData.seats.map((seat: any) => {
//           return prisma.seat.upsert({
//             where: { id: seat.id },
//             update: {
//               id: seat.id,
//               imgSeat: seat.imgSeat,
//               seatType: seat.seatType,
//               maxSeat: seat.maxSeat,
//               price: seat.price,
//               promo: seat.promo,
//             },
//             create: {
//               imgSeat: seat.imgSeat,
//               seatType: seat.seatType,
//               maxSeat: seat.maxSeat,
//               price: seat.price,
//               promo: seat.promo,
//               promoPrice: seat.promoPrice,
//               postEventId: eventId,
//             },
//           });
//         });

//         await Promise.all(seatUpdates);
//         console.log("Updated Seats:", seatUpdates);
//       }

//       return updatedEvent;
//     });

//     return [updatedEvent];
//   } catch (error) {
//     console.error("Update Failed:", error);
//     throw new Error("Update Failed");
//   }
// }

// async deleteEvent(req: Request) {
//   const { id } = req.params;
//   return await prisma.postEvent.delete({
//     where: { id: parseInt(id) },
//   });
// }

//   async deleteSeats(req: Request) {
//     const { id } = req.params;

//     try {
//       const event = await prisma.seat.delete({
//         where: { id: parseInt(id) },
//       });

//       console.log(event);
//       return event;
//     } catch (error) {
//       console.error("Seats not found", error);
//       throw new Error("Delete Seats fail");
//     }
//   }
// }

export default new EventService();
