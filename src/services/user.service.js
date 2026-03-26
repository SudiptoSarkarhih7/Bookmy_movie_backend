import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userRepo from "../repositories/user.repository.js";
import * as roleRepo from "../repositories/role.repository.js";
import { passwordCheck } from "../helper/passwordHelper.js";
import { generateToken } from "../helper/authHelper.js";
import createError from "../helper/createError.js";

export const registerUser = async (body, rolename) => {
 try {
   const { name, email, password , ...rest  } = body;
  const existingUser = await userRepo.findUserByEmail(email);
  if (existingUser) {
    throw createError(400, "User already exists");
  }

// Find customer role 
  const role = await roleRepo.findRoleByName(rolename);
  if (!role) {
    throw createError(404, "Role not found");
  }

  let isVarified = false;
  if (role.role === "CUSTOMER") {
    isVarified = true;
  }

  
  return userRepo.createUser({
    name,
    email,
    password,
    role: role._id,
    isVarified,
    ...rest
  });
 } catch (error) {
  throw error;
 }
};

export const loginUserService = async ({ email, password }) => {
  try {
    // console.log('inside login client')
    const user = await userRepo.findUserByEmail(email);
    // console.log('inside login client' + user)

    if (!user) {
      throw createError(404, "User not found");
    }


    if(user.isVarified === false){
      throw createError(401, "User not varified");
    }
    const ifMatch = await passwordCheck(password, user.password);

    if (!ifMatch) {
      throw createError(401, "Invalid credentials");
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
    throw error;
  }
};

export const getProfileService = async (id) => {
  try {
    const user = await userRepo.findUserById(id);
    if (!user) {
      throw createError(404, "User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};