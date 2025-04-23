import express from "express";

import authenticate from "../middlewares/authenticate.js"

import authControllers from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js"

import upload from "../middlewares/upload.js";

import { authLoginSchema, authRegisterSchema} from "../schemas/authSchemas.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(authRegisterSchema), authControllers.registerController);
authRouter.post("/login", validateBody(authLoginSchema), authControllers.loginController);
authRouter.post("/logout", authenticate, authControllers.logoutController);
authRouter.get("/current", authenticate, authControllers.getCurrentController);
authRouter.patch("/avatars", authenticate, upload.single("avatar"), authControllers.updateAvatarController);

export default authRouter;