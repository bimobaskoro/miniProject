import Joi from "joi";

export const schema = Joi.object({
  email: Joi.string().required().email().lowercase(),
  fullname: Joi.string().required().lowercase(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{12,30}$")),
  noPhone: Joi.string()
    .required()
    .pattern(
      new RegExp(
        "(+62 ((d{3}([ -]d{3,})([- ]d{4,})?)|(d+)))|((d+) d+)|d{3}( d+)+|(d+[ -]d+)|d+"
      )
    ),
  type: Joi.string().required().valid("admin", "user"),
});
