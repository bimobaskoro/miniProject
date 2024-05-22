import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma, UserDetail } from "@prisma/client";
import { comparePassword, hashPassword } from "../lib/bcrypt";
import generateReferalCode from "../lib/referalCode";
import { toLowerCase } from "../utils/toLowerCase";

class UserService {
  public model = prisma.accountData;
  async userRegister(req: Request) {
    const {
      fullName,
      email,
      noPhone,
      password,
      type,
      promoId,
      point,
      referalCode,
      expReferalCode,
    } = toLowerCase(req);

    toLowerCase(req);
    await prisma.$transaction(async (prisma) => {
      const expDate = new Date();
      expDate.setMonth(expDate.getMonth() + 3);

      const existingUser = await prisma.accountData.findMany({
        where: {
          OR: [{ email }],
        },
      });
      if (existingUser.length) throw new Error("username/email already used");
      const hashPass = await hashPassword(password);

      if (referalCode) {
        await prisma.userDetail.update({
          where: {
            yourReferalCode: referalCode,
          },
          data: {
            point: {
              increment: 10,
            },
            expReferalCode: expDate,
          },
        });
      }

      const userdata: Prisma.UserDetailCreateInput = {
        promoId,
        point,
        referalCode,
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
    });
    return await prisma.accountData.findUnique({
      where: {
        email: email,
      },
    });
  }
}
export default new UserService();
