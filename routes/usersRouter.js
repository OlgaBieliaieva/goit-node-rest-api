import express from "express";
import {
  register,
  login,
  getCurrent,
  logout,
  subscriptionUpdate,
} from "../controllers/authControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";

import {
  authSchema,
  userSubscriptionUpdateSchema,
} from "../schemas/authSchema.js";

const usersRouter = express.Router();

usersRouter.post("/register", isEmptyBody, validateBody(authSchema), register);

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

export default usersRouter;
