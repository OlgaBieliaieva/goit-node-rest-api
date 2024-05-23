import Joi from "joi";
import {
  emailRegExp,
  passwordRegExp,
  subscriptionPlanList,
} from "../constants/authConstants.js";

export const authSchema = Joi.object({
  password: Joi.string()
    .pattern(passwordRegExp)
    .message(
      "Password must have at least 8 characters, one capital letter and one number"
    )
    .required(),
  email: Joi.string()
    .pattern(emailRegExp)
    .message("Email failed format")
    .required(),
});

export const userSubscriptionUpdateSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegExp)
    .message("Email failed format")
    .required(),
  subscription: Joi.string()
    .valid(...subscriptionPlanList)
    .default("starter"),
});
