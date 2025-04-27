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
  res.status(201).json({ user: { email, subscription } });
};

const loginController = async (req, res) => {
  const { token, user } = await authServices.loginUser(req.body);
  res.json({ token, user: { email: user.email, subscription: user.subscription } });
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
  if (!req.file) {
    throw HttpError(400, "No file uploaded");
  }

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

const verifyController = async (req, res) => {
  const { verificationToken } = req.params;
  await authServices.verifyUser(verificationToken);
  res.status(200).json({ message: "Verification successful" });
};

const resendVerifyController = async (req, res) => {
  const { email } = req.body;
  await authServices.resendVerificationEmail(email);
  res.status(200).json({ message: "Verification email sent" });
};

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  logoutController: ctrlWrapper(logoutController),
  getCurrentController: ctrlWrapper(getCurrentController),
  updateAvatarController: ctrlWrapper(updateAvatarController),
  verifyController: ctrlWrapper(verifyController),
  resendVerifyController: ctrlWrapper(resendVerifyController),
};
