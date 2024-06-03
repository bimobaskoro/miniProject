// import nodemailer from "nodemailer";
// import { user, pass } from "../config/config";
// import { Request } from "express";
// import path from "path";
// import fs from "fs";
// import { TAccountData } from "../model/user.model";

// // posisi email dan password ada di .env. Harus diganti" karena pake temporary email dulu
// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user,
//     pass,
//   },
// });

// // export const sendVerification = (user: TAccountData) => {
// //   const templatePath = path.join(__dirname, "../templates", `template.hbs`);

// //   const templateSource = fs.readFile(templatePath, "utf-8", (error) => {
// //     throw error;
// //   });

// //   const compiledTemplate = Handlebars.compile(templateSource);

// //   const html = compiledTemplate({ name: user?.fullName });

// //   transporter.sendMail({
// //     to: user?.email,
// //     subject: "email verification",
// //     html,
// //   });
// // };
