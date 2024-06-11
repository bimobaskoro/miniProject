import { Request } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

class TransactionService {
  async createTransaction(req: Request) {
    const { totalQty, totalPrice, buyerId, eventId, eventPriceId } = req.body;

    try {
      const transaction = await prisma.transaction.create({
        data: {
          totalQty: Number(totalQty),
          totalPrice: Number(totalPrice),
          status: "Pending",
          buyer: { connect: { id: Number(buyerId) } },
          event: { connect: { id: Number(eventId) } },
          eventPrice: { connect: { id: Number(eventPriceId) } },
        },
      });
      return transaction;
    } catch (error) {
      console.error("Error creating transaction: ", error);
      throw new Error("Could not create transaction");
    }
  }
}

export default new TransactionService();
