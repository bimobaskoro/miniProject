import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

class UserService {
  public model = prisma.accountData;

  async userRegister(req: Request) {
    await prisma.$transaction(async (prisma) => {
      try {
        const {
          fullName,
          email,
          noPhone,
          password,
          type,
          promoId,
          point,
          referalCode,
          yourReferalCode,
          expReferalCode,
        } = req.body;

        const existingUser = await prisma.accountData.findMany({
          where: {
            OR: [{ email }],
          },
        });
        if (existingUser.length) throw new Error("username/email already used");

        const userdata: Prisma.UserDetailCreateInput = {
          promoId,
          point,
          referalCode,
          yourReferalCode,
          expReferalCode,
        };

        const accdata: Prisma.AccountDataCreateInput = {
          fullName,
          email,
          password,
          noPhone,
          type,
          userData: {
            create: userdata,
          },
        };

        await prisma.accountData.create({
          data: accdata,
        });
      } catch (error) {}
    });
  }
}
export default new UserService();
