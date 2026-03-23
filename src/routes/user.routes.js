import { Router } from "express";
import { loginUserController, registerUserController } from "../controllers/user.controller.js";

const router = Router();

router.post('/register',registerUserController)
router.get('/login', loginUserController);

export default router;
