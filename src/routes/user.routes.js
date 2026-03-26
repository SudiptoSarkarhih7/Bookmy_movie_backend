import { Router } from "express";
import { validate } from "../middlewares/validator.js";

import {
  customerRegisterController,
  loginUserController,
  logoutUserController,
} from "../controllers/user.controller.js";
import {
  customerLoginValidation,
  customerRegisterValidation,
} from "../validators/customerValidator.js";

const router = Router();

router.post(
  "/register",
  validate(customerRegisterValidation),
  customerRegisterController,
);
router.post(
  "/login", 
  validate(customerLoginValidation), 
  loginUserController);
  
router.delete("/logout", logoutUserController);

export default router;
