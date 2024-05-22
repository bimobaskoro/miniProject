import { Request } from "express";
export function toLowerCase(req: Request) {
  let lowerCase;
  if (req.body.email) {
    lowerCase = req.body.email.toLowerCase();
  }
  return { ...req.body, email: lowerCase };
}
