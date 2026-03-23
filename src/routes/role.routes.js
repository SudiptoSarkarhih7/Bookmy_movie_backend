import { Router } from "express";
import { createRoleController, getAllRolesController } from "../controllers/role.controller.js";

const router = Router();


router.post('/create',createRoleController)
router.get('/all', getAllRolesController);

export default router;