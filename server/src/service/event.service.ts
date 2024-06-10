import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";
import sharp from "sharp";

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
      date,
      startTime,
      finishTime,
    } = req.body;

    return await prisma.$transaction(async (prisma) => {
      try {
        // const fileEvent = req.files;
        // const fileSeat = req.file;
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };

        const imgEvent = files["imgEvent"][0];
        const imgSeat = files["imgSeat"][0];
        console.log(req.files, "ini files");

        const eventData: Prisma.EventCreateInput = {
          title,
          admin: { connect: { id: Number(adminId) } },
          desc,
          status: "Publish",
          promo: Number(promo),
          date,
          location,
          city,
          startTime,
          finishTime,
          category,
        };

        if (req.files) {
          if (imgEvent) {
            const buffer = await sharp(imgEvent?.buffer).png().toBuffer();
            eventData.imgEvent = buffer;
          }

          if (imgSeat) {
            const buffer2 = await sharp(imgSeat?.buffer).png().toBuffer();
            eventData.imgEvent = buffer2;
          }
        }
        const newEvent = await prisma.event.create({
          data: eventData,
        });

        const priceEventList: Prisma.EventPriceCreateManyInput =
          req.body.eventDetail.map((detail: any) => ({
            categoryEvent: detail.categoryEvent,
            qty: Number(detail.qty),
            price: Number(detail.price),
            eventId: newEvent.id,
          }));

        const eventss = await prisma.eventPrice.createMany({
          data: priceEventList,
        });

        // console.log("====================================");
        // console.log(eventss);
        // console.log("====================================");
        return eventss;
        // return;
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        throw error;
      }
    });
  }

  async getEventById(req: Request) {
    const id = parseInt(req.params.id);
    console.log("====================================");
    console.log(id);
    console.log("====================================");
    const events = await prisma.event.findUnique({
      where: {
        id: id,
      },
      include: {
        EventPrice: true,
      },
    });

    console.log("====================================");
    console.log(events);
    console.log("====================================");
    return events;
  }

  async getEventsByAdminId(adminId: number) {
    const events = await prisma.event.findMany({
      where: {
        adminId: adminId,
      },
      include: {
        EventPrice: true,
      },
    });
    return events;
  }

  async getEventAll() {
    const events = await prisma.event.findMany({
      include: {
        EventPrice: true,
      },
    });
    return events;
  }

  async getImgEvent(req: Request) {
    const eventId = parseInt(req.params.eventId);

    const data = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });
    return data?.imgEvent;
  }

  async getEventPriceByIdEvent() {
    const allEventPrices = await prisma.eventPrice.findMany();
    return allEventPrices;
  }
  async updateEventById(req: Request) {
    const adminId = req.accountData?.id;
    const { id } = req.params; // Event ID from request parameters

    const {
      title,
      desc,
      status,
      category,
      promo,
      location,
      city,
      date,
      startTime,
      finishTime,
    } = req.body;

    return await prisma.$transaction(async (prisma) => {
      try {
        const fileEvent = req.file;

        const existingEvent = await prisma.event.findUnique({
          where: { id: Number(id) },
        });

        if (!existingEvent) {
          throw new Error("Event not found");
        }

        const buffer = fileEvent
          ? await sharp(fileEvent.buffer).png().toBuffer()
          : undefined;

        const eventData: Prisma.EventUpdateInput = {
          title,
          admin: { connect: { id: Number(adminId) } },
          desc,
          status,
          imgEvent: buffer ? buffer : existingEvent.imgEvent, // Update image only if a new one is provided
          promo: Number(promo),
          date,
          location,
          city,
          startTime,
          finishTime,
          category,
        };

        const updatedEvent = await prisma.event.update({
          where: { id: Number(id) },
          data: eventData,
        });

        if (req.body.eventDetail && req.body.eventDetail.length > 0) {
          const priceEventList: Prisma.EventPriceCreateManyInput[] =
            req.body.eventDetail.map((detail: any) => ({
              categoryEvent: detail.categoryEvent,
              qty: Number(detail.qty),
              price: Number(detail.price),
              eventId: updatedEvent.id,
            }));

          // Delete old prices and create new ones
          await prisma.eventPrice.deleteMany({
            where: { eventId: updatedEvent.id },
          });

          await prisma.eventPrice.createMany({
            data: priceEventList,
          });
        }

        return updatedEvent;
      } catch (error) {
        throw error;
      }
    });
  }

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
}
export default new EventService();
