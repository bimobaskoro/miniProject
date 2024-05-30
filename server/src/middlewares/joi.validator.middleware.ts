import { NextFunction, Request, Response } from "express";
import {
  registerSchema,
  loginSchema,
  eventSchema,
  seatSchema,
} from "../lib/joi";
import { TAccountData } from "../model/user.model";

declare module "express-serve-static-core" {
  interface Request {
    accountData?: TAccountData;
  }
}

export async function registerValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.accountData = await registerSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
}

export async function loginValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.accountData = await loginSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
}

export async function eventValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.accountData = await eventSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
}

export async function seatValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.accountData = await seatSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
}
