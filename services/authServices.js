import bcrypt from "bcrypt";
import User from "../db/models/user.js";
import HttpError from "../helpers/HttpError.js";
import { generateToken } from "../helpers/jwt.js";
import gravatar from "gravatar";
import { nanoid } from "nanoid";
import { sendVerifyEmail } from "./emailService.js";

export const findUser = (query) => User.findOne({ where: query });

export const registerUser = async (data) => {
  const { email, password } = data;
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...data,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  await sendVerifyEmail(email, verificationToken);

  return {
    email: newUser.email,
    subscription: newUser.subscription,
  };
};

export const loginUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }

  const token = generateToken({ id: user.id });
  await user.update({ token });

  return { token, user };
};

export const logoutUser = async (id) => {
  const user = await findUser({ id });
  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  await user.update({ token: null });
};

export const comparePassword = (password, hash) => bcrypt.compare(password, hash);

export const verifyUser = async (verificationToken) => {
  const user = await findUser({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  user.verify = true;
  user.verificationToken = null;
  await user.save();
};

export const resendVerificationEmail = async (email) => {
  const user = await findUser({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendVerifyEmail(email, user.verificationToken);
};
