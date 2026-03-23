// src/controllers/user.controller.js
import createError from "../helper/createError.js";
import { loginUserService, registerUser } from "../services/user.service.js";

export const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password ) {
      throw createError(400, "All    fields required");
    }

    const user = await registerUser({ name, email, password });

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw createError(400, "All fields required");
    }

    const result = await loginUserService({ email, password });
    res.cookie("authorization", result.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
