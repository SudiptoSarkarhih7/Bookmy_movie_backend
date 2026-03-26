// src/controllers/user.controller.js
import createError from "../helper/createError.js";
import { getProfileService, loginUserService, registerUser } from "../services/user.service.js";

export const clientRegisterController = async (req, res, next) => {
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
    next(error);
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
    console.log("first");
    next(error);
  }
};

export const clientProfileController = async (req, res, next) => {
  try {

    const { _id: id, email } = req.user;

    const profile = await getProfileService(id);
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutClientController = async (req, res, next) => {
  try {
    res.cookie("authorization", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
