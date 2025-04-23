import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import path from "path";
import fs from "fs/promises";

const avatarsDir = path.resolve("public", "avatars");

const registerController = async (req, res) => {
  const existingUser = await authServices.findUser({ email: req.body.email });

  if (existingUser) {
    throw HttpError(409, "Email in use");
  }

  const { email, subscription } = await authServices.registerUser(req.body);

  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

const loginController = async (req, res) => {
  const { token, user } = await authServices.loginUser(req.body);
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logoutController = async (req, res) => {
  const { id } = req.user;
  await authServices.logoutUser(id);
  res.status(204).send();
};

const getCurrentController = (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const updateAvatarController = async (req, res) => {
  const { path: tempPath, originalname } = req.file;
  const { id } = req.user;

  const filename = `${id}-${originalname}`;
  const newPath = path.join(avatarsDir, filename);

  await fs.rename(tempPath, newPath);

  const avatarURL = `/avatars/${filename}`;
  req.user.avatarURL = avatarURL;
  await req.user.save();

  res.status(200).json({ avatarURL });
};

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  logoutController: ctrlWrapper(logoutController),
  getCurrentController: ctrlWrapper(getCurrentController),
  updateAvatarController: ctrlWrapper(updateAvatarController),
};
