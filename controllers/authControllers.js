import * as authService from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import compareHash from "../helpers/compareHash.js";

export const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await authService.findUser({ email });
    if (user) {
      throw HttpError(409, "Email already use");
    }

    const newUser = await authService.saveUser(req.body);

    res.status(201).json({
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.findUser({ email });
    if (!user) {
      throw HttpError(401, "Email or password invalid");
    }
    const comparePassword = await compareHash(password, user.password);
    if (!comparePassword) {
      throw HttpError(401, "Email or password invalid");
    }

    const { _id: id } = user;
    const payload = {
      id,
    };

    const token = createToken(payload);

    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
};
