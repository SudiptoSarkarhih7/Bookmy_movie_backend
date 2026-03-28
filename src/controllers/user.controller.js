// src/controllers/user.controller.js
import createError from "../helper/createError.js";
import {
  loginUserService,
  refreshAccessTokenService,
  registerUser,
} from "../services/user.service.js";
import { successResponse } from "../utils/response.js";

export const customerRegisterController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(req.body, "CUSTOMER");

    return successResponse(res, 201, "Registration successful", {
      id: user._id,
      name: user.name,
      email: user.email,
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
    res.cookie("authorization", result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return successResponse(res, 200, "Login successful", result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const logoutUserController = async (req, res, next) => {
  try {
    res.cookie("authorization", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return successResponse(res, 200, "Logout successful", {});
  } catch (error) {
    next(error);
  }
};

export const refreshTokenController = async (req, res, next) => {
  try {
    const refreshToken = req.body?.refreshToken || req.cookies?.refreshToken;
    const tokens = await refreshAccessTokenService(refreshToken);

    res.cookie("authorization", tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return successResponse(res, 200, "Token refreshed successfully", tokens);
  } catch (error) {
    next(error);
  }
};
