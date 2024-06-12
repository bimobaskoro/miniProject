import { Request } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

class TransactionService {
  async createTransaction(req: Request) {
    const { totalQty, totalPrice, eventId, eventPriceId, buyerDetailId } =
      req.body;

    console.log(req.body);

    try {
      const transaction = await prisma.transaction.create({
        data: {
          totalQty: Number(totalQty),
          totalPrice: Number(totalPrice),
          status: "Pending",
          buyer: { connect: { id: Number(req.accountData?.id) } },
          buyerDetail: {
            connect: { id: Number(buyerDetailId) },
          },
          event: { connect: { id: Number(eventId) } },
          eventPrice: { connect: { id: Number(eventPriceId) } },
        },
      });
      console.log("Transaction :", transaction);

      return transaction;
    } catch (error) {
      console.error("Error creating transaction: ", error);
      throw new Error("Could not create transaction");
    }
  }

  async getTransactionById(req: Request) {
    const { id } = req.params;
    console.log("====================================");
    console.log(req.params);
    console.log("====================================");
    try {
      const data = await prisma.transaction.findUnique({
        where: { id: Number(id) },
        include: {
          buyer: true,
          buyerDetail: true,
          event: true,
          eventPrice: true,
        },
      });
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      return data;
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  }

  async updateTransaction(req: Request) {
    const { eventId } = req.params;
    const { point, totalPrice } = req.body;
    console.log("====================================");
    console.log(req.params, req.body);
    console.log("====================================");

    return await prisma.$transaction(async (prisma) => {
      try {
        const transaction = await prisma.transaction.findUnique({
          where: { id: Number(eventId) },
          include: { buyer: true, buyerDetail: true },
        });

        console.log("Transcation :", transaction);

        if (!transaction) {
          return new Response("Transaction not found", { status: 404 });
        }

        const newPoints = transaction.buyerDetail.point - point;

        console.log("====================================");
        console.log("New Points", newPoints);
        console.log("====================================");

        if (newPoints < 0) {
          return new Response("Insufficient points", { status: 400 });
        }

        const dataTransaction: Prisma.TransactionUpdateInput = {
          totalPrice: totalPrice,
          status: "Paid",
        };

        const updatedUser = await prisma.userDetail.update({
          where: { id: transaction.buyerId },
          data: {
            point: newPoints,
          },
        });
        console.log("====================================");
        console.log("Update User", updatedUser);
        console.log("====================================");

        const updatedTransaction = await prisma.transaction.update({
          where: { id: Number(eventId) },
          data: dataTransaction,
        });

        console.log("====================================");
        console.log("Update transaction", updatedTransaction);
        console.log("====================================");

        const result = {
          updatedUser,
          updatedTransaction,
        };

        console.log("====================================");
        console.log("Result:", result);
        console.log("====================================");

        return result;
      } catch (error) {
        console.log("====================================");
        console.log("error", error);
        console.log("====================================");
      }
    });
  }
}

export default new TransactionService();
