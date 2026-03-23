import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userRepo from "../repositories/user.repository.js";
import * as roleRepo from "../repositories/role.repository.js";
import { passwordCheck } from "../helper/passwordHelper.js";
import { generateToken } from "../helper/authHelper.js";
import createError from "../helper/createError.js";

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await userRepo.findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

// Find customer role 
  const role = await roleRepo.findRoleByName("customer");
  if (!role) {
    throw new Error("Customer role not found");
  }

  return userRepo.createUser({
    name,
    email,
    password,
    role: role._id,
  });
};

export const loginUserService = async ({ email, password }) => {
  try {
    const user = await userRepo.findUserByEmail(email);
    if (!user) {
      throw new Error("User does not exist");
    }
    // console.log(user);
    const ifMatch = await passwordCheck(password, user.password);
    console.log("ifMatch : ", ifMatch);
    
    if (!ifMatch) {
      throw new Error("Password does not match");
    }

    const token = generateToken(user._id, user.role);

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role.role,
      token,
    };
  } catch (error) {
    throw createError(400, error.message);
  }
};
