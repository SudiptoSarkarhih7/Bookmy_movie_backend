import { createRoleService , getAllRolesService } from "../services/role.service.js";
import { successResponse } from "../utils/response.js";

export const createRoleController = async (req, res) => {
  try {
    const { role, permissions  } = req.body;
    if (!role || !permissions) {
      throw new Error("All fields required");
    }
    const createRole = await createRoleService(role, permissions);
    return successResponse(res, 201, "Role created successfully", createRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 

export const getAllRolesController = async (req, res) => {
  try {
    // console.log(process.env.NODE_ENV);
    // throw new Error("TokenExpiredError");
    const getAllRoles = await getAllRolesService();
    return successResponse(res, 200, "Roles fetched successfully", {
      roles: getAllRoles,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};