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
    this.router.get("/:id", transactionController.getTransactionById);
    this.router.patch(
      "/update/:eventId",
      transactionController.updateTransactionById
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new TransactionRouter();
