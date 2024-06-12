import express, { Application, NextFunction, Request, Response } from "express";
import { PORT, corsOptions } from "./config/config";
import UserRouter from "./router/user.router";
import eventRouter from "./router/event.router";
import cors from "cors";
import transactionRouter from "./router/transaction.router";
import searchRouter from "./router/search.router";
export class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.errorHandler();
  }

  private routes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("welcome to api with prisma API");
    });
    this.app.use("/user", UserRouter.getRouter());
    this.app.use("/posts", eventRouter.getRouter());
    this.app.use("/search", searchRouter.getRouter());
    this.app.use("/transaction", transactionRouter.getRouter());

    this.app.use(
      "/public/imagesEventpost",
      express.static(`${__dirname}/public/imagesEventpost`)
    );
  }
  private errorHandler() {
    this.app.use(
      (error: unknown, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof Error)
          res.status(500).send({
            message: error.message,
          });
      }
    );
  }
  private configure() {
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.app.use(cors(corsOptions));
  }

  public start() {
    this.app.listen(PORT, () => {
      console.log("api is running on port", PORT);
    });
  }
}
