import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma, UserDetail } from "@prisma/client";
import { comparePassword, hashPassword } from "../lib/bcrypt";
import generateReferalCode from "../lib/referalCode";
import { toLowerCase } from "../utils/toLowerCase";
import { TAccountData } from "../model/user.model";
import { createToken } from "../lib/jwt";

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

      if (existingUser.length) throw new Error("email already used");
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
      console.log("====================================");
      console.log(req.body);
      console.log("====================================");

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

  async userLogin(req: Request) {
    const { email, password } = req.body;

    const data = (await prisma.accountData.findFirst({
      where: {
        email: email,
      },
    })) as TAccountData;

    if (!data) throw new Error("wrong email");
    const checkUser = await comparePassword(String(data.password), password);
    console.log("====================================");
    console.log(data);
    console.log(req.body, checkUser);
    console.log("====================================");
    if (!checkUser) throw new Error("incorrect password");

    delete data.password;

    const accessToken = createToken(data, "4hr");
    const refreshToken = createToken({ id: data.id }, "20 hr");

    return { accessToken, refreshToken };
  }
}
export default new UserService();
