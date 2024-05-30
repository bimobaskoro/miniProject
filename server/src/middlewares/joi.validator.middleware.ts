import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { schema } from "../lib/joi";
import { TAccountData } from "../model/user.model";

declare module "express-serve-static-core" {
  interface Request {
    accountData?: TAccountData;
  }
}

export async function user_validator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.accountData = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
}
