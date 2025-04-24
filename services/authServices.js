import bcrypt from "bcrypt";
import User from "../db/models/user.js";
import HttpError from "../helpers/HttpError.js";
import { generateToken } from "../helpers/jwt.js";
import gravatar from "gravatar";

export const findUser = (query) => User.findOne({ where: query });

export const registerUser = async (data) => {
  const { email, password } = data;
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }, true);
  return User.create({ ...data, password: hashPassword });
};

export const loginUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw HttpError(401, "Email or password is wrong");
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
