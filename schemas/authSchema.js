import Joi from "joi";
import { emailRegExp } from "../constants/authConstants.js";

export const authSignupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  subscription: Joi.string().default("starter"),
  token: Joi.string().default(null),
});

export const authSignInSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  token: Joi.string().default(null),
});
