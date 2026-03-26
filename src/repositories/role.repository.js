// src/repositories/role.repository.js
import RoleModel from "../models/role.model.js";

export const findRoleByName = async (roleName) => {
  try {
    return await RoleModel.findOne({ role : roleName });
  } catch (error) {
    throw error;
  }
};

export const createRole = async (data) => {
  return await RoleModel.create(data);
};

export const getAllRoles = async () => {
  return await RoleModel.find({ isDeleted: false });
};