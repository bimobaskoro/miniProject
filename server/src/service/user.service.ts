import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma, UserDetail } from "@prisma/client";
import { comparePassword, hashPassword } from "../lib/bcrypt";
import generateReferalCode from "../lib/referalCode";

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
          referalCode: inputReferalCode,
          expReferalCode,
        } = req.body;

        const existingUser = await prisma.accountData.findMany({
          where: {
            OR: [{ email }],
          },
        });
        if (existingUser.length) throw new Error("username/email already used");
        const hashPass = await hashPassword(password);

        if (inputReferalCode) {
          const existingReferalCode = await prisma.userDetail.findFirst({
            where: {
              referalCode: inputReferalCode,
            },
          });

          if (existingReferalCode) {
            throw new Error("Referral code not found");
          }
        }

        const userdata: Prisma.UserDetailCreateInput = {
          promoId,
          point,
          referalCode: inputReferalCode,
          yourReferalCode: generateReferalCode.generate(),
          expReferalCode,
        };

        const accdata: Prisma.AccountDataCreateInput = {
          fullName,
          email,
          password: hashPass,
          noPhone,
          type,
          userData: {
            create: userdata,
          },
        };

        await prisma.accountData.create({
          data: accdata,
        });
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
      }
    });
  }
}
export default new UserService();
