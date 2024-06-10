import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config/config";
import { TAccountData } from "../model/user.model";

declare module "express-serve-static-core" {
  interface Request {
    accountData?: TAccountData;
  }
}

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "") || "";
    console.log("====================================");
    console.log(token, "ini token");
    console.log("====================================");

    req.accountData = verify(token, SECRET_KEY) as TAccountData;

    next();
  } catch (error) {
    next(error);
  }
};
