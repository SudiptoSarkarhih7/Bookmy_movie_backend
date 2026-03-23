import createError from "../helper/createError.js";
import { createRoleService , getAllRolesService } from "../services/role.service.js";

export const createRoleController = async (req, res) => {
  try {
    const { role, permissions  } = req.body;
    if (!role || !permissions) {
      throw createError(400, "All fields required");
    }
    const createRole = await createRoleService(role, permissions);
    res.status(201).json(createRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 

export const getAllRolesController = async (req, res) => {
  try {
    // console.log(process.env.NODE_ENV);
    // throw new Error("TokenExpiredError");
    const getAllRoles = await getAllRolesService();
    res.status(200).json(getAllRoles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};