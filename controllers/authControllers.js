import * as authServices from "../services/authServices.js"
import ctrlWrapper from "../helpers/ctrlWrapper.js";


const registerController = async (req, res)=>{
    const { email, subscription } = await authServices.registerUser(req.body);

    res.status(201).json({
        user: {
            email,
            subscription,
          },
    });
};

const loginController = async (req, res)=>{
    const {token, user} = await authServices.loginUser(req.body);
    const { email, subscription } = user;

    res.json({
        token, user: {
            email, subscription
        },
    });
};

const logoutController = async (req, res)=>{
    const { id } = req.user;
    await authServices.logoutUser(id);
  
    res.status(204).send();

  };
  
  const getCurrentController = (req, res) => {
    const { email, subscription } = req.user;
  
    res.status(200).json({
      email,
      subscription,
    });
  };
  


export default {
    registerController: ctrlWrapper(registerController), 
    loginController: ctrlWrapper(loginController),
    logoutController: ctrlWrapper(logoutController),
    getCurrentController: ctrlWrapper(getCurrentController)
};