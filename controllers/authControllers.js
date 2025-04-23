import * as authServices from "../services/authServices.js"; 
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { generateToken } from "../helpers/jwt.js";


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
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });


    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }

    const isValidPassword = await authServices.comparePassword(password, user.password);

    if (!isValidPassword) {
        throw HttpError(401, "Email or password is wrong");
    }

    const token = generateToken({ id: user.id });


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

export default {
    registerController: ctrlWrapper(registerController),
    loginController: ctrlWrapper(loginController),
    logoutController: ctrlWrapper(logoutController),
    getCurrentController: ctrlWrapper(getCurrentController),
};
