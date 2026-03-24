// src/repositories/user.repository.js
import User from "../models/user.model.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email }).populate("role");
};

export const createUser = async (data) => {
  return User.create(data);
};
