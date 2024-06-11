import { Router } from "express";
import transactionController from "../controller/transaction.controller";
import { verifyUser } from "../middlewares/auth.middleware";

class TransactionRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.intializedRoutes();
  }

  intializedRoutes() {
    this.router.post("/", verifyUser, transactionController.createTransaction);
  }

  getRouter() {
    return this.router;
  }
}

export default new TransactionRouter();
