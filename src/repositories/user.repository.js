// src/repositories/user.repository.js
import User from "../models/user.model.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email }).populate("role");
};

export const createUser = async (data) => {
  return User.create(data);
};

export const findUserById = async (id) => {
  const user = await User.findById(id)
    .populate("role")
    .select("-password -isVarified -isDeleted")
    .lean();
  if (user && user.role) {
    user.role = user.role.role;
  }
  return user;
};
