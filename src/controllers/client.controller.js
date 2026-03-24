// src/controllers/user.controller.js
import createError from "../helper/createError.js";
import { loginUserService, registerUser } from "../services/user.service.js";

export const clientRegisterController = async (req, res) => {
  try {
    const registerClient = await registerUser(req.body, "CLIENT");

    res.status(201).json({
      success: true,
      data: {
        id: registerClient._id,
        name: registerClient.name,
        email: registerClient.email,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const clientLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await loginUserService({ email, password });
    res.cookie("authorization", result.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json(result);
  } catch (error) {
    console.log("first")
    next(error);
  }
};
