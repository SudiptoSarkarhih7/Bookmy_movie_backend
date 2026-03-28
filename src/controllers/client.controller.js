// src/controllers/client.controller.js
import {
  getProfileService,
  loginUserService,
  refreshAccessTokenService,
  registerUser,
} from "../services/user.service.js";
import { successResponse } from "../utils/response.js";

export const clientRegisterController = async (req, res, next) => {
  try {
    const registerClient = await registerUser(req.body, "CLIENT");

    return successResponse(res, 201, "Registration successful", {
      id: registerClient._id,
      name: registerClient.name,
      email: registerClient.email,
    });
  } catch (error) {
    next(error);
  }
};

export const clientLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

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
    next(error);
  }
};

export const clientProfileController = async (req, res, next) => {
  try {
    const { _id: id, email } = req.user;

    const profile = await getProfileService(id);
    return successResponse(res, 200, "Profile fetched successfully", profile);
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

export const refreshClientTokenController = async (req, res, next) => {
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
