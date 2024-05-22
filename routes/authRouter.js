import express from "express";
import { signup, signIn } from "../controllers/authControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../helpers/validateBody.js";

import { authSignupSchema, authSignInSchema } from "../schemas/authSchema.js";

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, validateBody(authSignupSchema), signup);

authRouter.post("/signin", isEmptyBody, validateBody(authSignInSchema), signIn);

export default authRouter;
