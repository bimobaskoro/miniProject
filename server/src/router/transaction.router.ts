import { Router } from "express";
import transactionController from "../controller/transaction.controller";

class TransactionRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.intializedRoutes();
  }

  intializedRoutes() {
    this.router.post("/", transactionController.createTransaction);
  }

  getRouter() {
    return this.router;
  }
}

export default new TransactionRouter();
