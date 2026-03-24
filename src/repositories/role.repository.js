// src/repositories/role.repository.js
import RoleModel from "../models/role.model.js";

export const findRoleByName = async (roleName) => {
  try {
    return await RoleModel.findOne({ role : roleName });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createRole = async (data) => {
  return await RoleModel.create(data);
};

export const getAllRoles = async () => {
  return await RoleModel.find({ isDeleted: false });
};