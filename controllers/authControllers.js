import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import Jimp from "jimp";
import { nanoid } from "nanoid";
import * as authService from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import compareHash from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";
import sendEmail from "../helpers/sendEmail.js";

const avatarPath = path.resolve("public", "avatars");

export const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await authService.findUser({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const verificationToken = nanoid();
    const avatarURL = gravatar.url(email);
    const newUser = await authService.saveUser({
      ...req.body,
      avatarURL,
      verificationToken,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await authService.findUser({ verificationToken });

    if (!user) {
      throw HttpError(404, "User not found");
    }

    await authService.updateUser(
      { _id: user._id },
      { verify: true, verificationToken: null }
    );

    res.status(200).json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

export const resendVerify = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await authService.findUser({ email });

    if (!user) {
      throw HttpError(404, "Email not found");
    }
    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.findUser({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    if (!user.verify) {
      throw HttpError(401, "Email not verify");
    }
    const comparePassword = await compareHash(password, user.password);
    if (!comparePassword) {
      throw HttpError(401, "Email or password is wrong");
    }

    const { _id: id } = user;
    const payload = {
      id,
    };

    const token = createToken(payload);
    await authService.updateUser({ _id: id }, { token });

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await authService.updateUser({ _id }, { token: null });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

export const subscriptionUpdate = async (req, res, next) => {
  try {
    const { email, subscription } = req.body;
    const { _id } = req.user;
    await authService.updateUser({ _id }, { subscription });
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const avatarUpdate = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarPath, filename);

    const formattedImg = await Jimp.read(oldPath);
    formattedImg.resize(250, 250);
    await formattedImg.writeAsync(oldPath);

    await fs.rename(oldPath, newPath);

    const avatarURL = path.join("avatars", filename);
    await authService.updateUser({ _id }, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};
