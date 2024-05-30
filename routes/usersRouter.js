import express from "express";
import {
  register,
  verifyEmail,
  resendVerify,
  login,
  getCurrent,
  logout,
  subscriptionUpdate,
  avatarUpdate,
} from "../controllers/authControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

import {
  authSchema,
  userSubscriptionUpdateSchema,
  emailVerifySchema,
} from "../schemas/authSchema.js";

const usersRouter = express.Router();

usersRouter.post("/register", isEmptyBody, validateBody(authSchema), register);

usersRouter.get("/verify/:verificationToken", verifyEmail);

usersRouter.post(
  "/verify",
  isEmptyBody,
  validateBody(emailVerifySchema),
  resendVerify
);

usersRouter.post("/login", isEmptyBody, validateBody(authSchema), login);

usersRouter.get("/current", authenticate, getCurrent);

usersRouter.post("/logout", authenticate, logout);

usersRouter.patch(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(userSubscriptionUpdateSchema),
  subscriptionUpdate
);

usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  avatarUpdate
);

export default usersRouter;
