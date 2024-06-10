import nodemailer from "nodemailer";
import { user, pass } from "../config/config";
import path from "path";
import fs from "fs";
import { TAccountData } from "../model/user.model";
import Handlebars from "handlebars";
import { createToken } from "./jwt";

// posisi email dan password ada di .env. Harus diganti" karena pake temporary email dulu
export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user,
    pass,
  },
});

export const handleVerification = (user: TAccountData) => {
  const templatePath = path.join(
    __dirname,
    "../templates/",
    "verification.template.hbs"
  );

  const templateSource = fs.readFileSync(templatePath, "utf-8");

  const compiledTemplate = Handlebars.compile(templateSource);

  const token = createToken({ id: user?.id }, "5m");

  // const newUser = verify(token, SECRET_KEY) as TAccountData;

  const url = `http://localhost:8001/user/verify/${token}`;
  const html = compiledTemplate({ nama: user?.fullName, url });

  transporter
    .sendMail({
      to: user?.email,
      subject: "email verification",
      html,
    })
    .catch((err) => {});
};
