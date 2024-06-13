import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().required().email().lowercase(),
  fullName: Joi.string().required().lowercase(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{8,150}$")),
  noPhone: Joi.string()
    .required()
    .regex(/^(?:\+62|62|0)[2-9]\d{7,11}$/),
  type: Joi.string().required().valid("admin", "user"),
});

export const loginSchema = Joi.object({
  email: Joi.string().required().email().lowercase(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{8,150}$")),
});

export const eventSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string()
    .required()
    .valid("Concert", "Expo", "Play", "Work", "shop", "Sport"),
  location: Joi.string().required(),
  city: Joi.string()
    .required()
    .valid("Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi"),
  date: Joi.string().required(),
  startTime: Joi.string().required(),
  finishTime: Joi.string().required(),
  desc: Joi.string().required(),
  promo: Joi.number(),
});

export const eventPriceSchema = Joi.object({
  categoryEvent: Joi.string(),
  qty: Joi.number(),
  price: Joi.number(),
});
