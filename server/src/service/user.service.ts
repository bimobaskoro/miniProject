import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma, UserDetail } from "@prisma/client";
import { comparePassword, hashPassword } from "../lib/bcrypt";
import generateReferalCode from "../lib/referalCode";
import { toLowerCase } from "../utils/toLowerCase";
import { TAccountData } from "../model/user.model";
import { createToken } from "../lib/jwt";
import { handleVerification } from "../lib/nodemailer";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config/config";

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

      const newUser = (await prisma.accountData.create({
        data: accdata,
      })) as TAccountData;
      handleVerification(newUser);
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
      include: {
        userData: true,
      },
      where: {
        email: email,
      },
    })) as TAccountData;

    if (!data) throw new Error("wrong email");
    const checkUser = await comparePassword(String(data.password), password);

    if (!checkUser) throw new Error("incorrect password");

    delete data.password;

    const accessToken = createToken(data);
    const refreshToken = createToken({ id: data.id }, "20 hr");

    return { accessToken, refreshToken };
  }

  async validateUser(req: Request) {
    console.log("masuk", req.accountData);

    const user = await prisma.accountData.findUnique({
      select: {
        id: true,
        email: true,
        fullName: true,
        type: true,
        is_verified: true,
        userData: true,
      },
      where: {
        id: req.accountData?.id,
      },
    });

    const access_token = createToken(user, "1hr");
    return { access_token, is_verified: user?.is_verified };
  }

  async userGetById(req: Request) {
    const { id } = req.params;
    const idNum = parseInt(id);
    const data: TAccountData = await prisma.accountData.findUnique({
      select: {
        id: true,
        fullName: true,
        email: true,
        password: true,
        noPhone: true,
        type: true,
      },
      where: {
        id: idNum,
      },
    });
    if (!data) throw new Error("user not found");
    return data as TAccountData;
  }

  async registerVerify(req: Request) {
    const { token } = req.params;

    const newUser = verify(token, SECRET_KEY) as TAccountData;

    await prisma.accountData.update({
      data: {
        is_verified: true,
      },
      where: {
        id: newUser?.id,
      },
    });
    handleVerification(newUser as TAccountData);
  }
}
export default new UserService();
