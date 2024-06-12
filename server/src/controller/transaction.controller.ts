import { NextFunction, Request, Response } from "express";
import transactionService from "../service/transaction.service";

export class TransactionController {
  async createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await transactionService.createTransaction(req);
      res.send({
        message: "Success create transaction",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTransactionById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await transactionService.getTransactionById(req);
      res.send({
        message: "Fetch Transaction By Id",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTransactionById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await transactionService.updateTransaction(req);
      res.send({
        message: "Update success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TransactionController();
