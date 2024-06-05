import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

class EventService {
  async createEvent(req: Request) {
    const adminId = req.accountData?.id;
    const {
      title,
      desc,
      status,
      category,
      promo,
      location,
      city,
      date: dateString,
      startTime: startTimeString,
      finishTime: finishTimeString,
    } = req.body;

    return await prisma.$transaction(async (prisma) => {
      try {
        const file = req.file;
        const date = new Date(dateString);
        const startTime = new Date(startTimeString);
        const finishTime = new Date(finishTimeString);

        const eventData: Prisma.EventCreateInput = {
          title,
          admin: { connect: { id: Number(adminId) } },
          desc,
          status,
          imgSeat: file?.filename,
          imgEvent: file?.filename,
          promo,
          date,
          location,
          city,
          startTime,
          finishTime,
          category,
        };
        const newEvent = await prisma.event.create({
          data: eventData,
        });

        const priceEventList: Prisma.EventPriceCreateManyInput =
          req.body.eventDetail.map((detail: any) => ({
            categoryEvent: detail.categoryEvent,
            qty: detail.qty,
            price: detail.price,
            eventId: newEvent.id,
          }));

        await prisma.eventPrice.createMany({
          data: priceEventList,
        });
      } catch (error) {
        throw error;
      }
    });
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
