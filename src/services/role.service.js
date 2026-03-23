import { get } from "mongoose";
import { createRole, findRoleByName, getAllRoles } from "../repositories/role.repository.js";

export const createRoleService = async (role, permissions) => {
  try {
    const isRoleExist = await findRoleByName(role);
    if (isRoleExist) {
      throw new Error("Role already exists");
    }

    return await createRole({ role, permissions });
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getAllRolesService = async () => {
  try {
    const roles = await getAllRoles();
    return roles;
  } catch (error) {
    throw new Error(error.message);
  }
};