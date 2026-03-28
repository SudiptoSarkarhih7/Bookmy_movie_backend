import { Router } from "express";
import { validate } from "../middlewares/validator.js";
import {
  clientLoginValidation,
  clientRegisterValidation,
} from "../validators/clientValidator.js";
import {
  clientLoginController,
  clientProfileController,
  clientRegisterController,
  logoutClientController,
  refreshClientTokenController,
} from "../controllers/client.controller.js";
import authCheck from "../middlewares/auth.middleware.js";
import { successResponse } from "../utils/response.js";

const router = Router();

router.post(
  "/register",
  validate(clientRegisterValidation),
  clientRegisterController,
);

router.post("/login", validate(clientLoginValidation), clientLoginController);
router.post("/access-token", refreshClientTokenController);

router.get("/profile", authCheck, clientProfileController);

router.delete("/logout", authCheck, logoutClientController);

router.get("/dummy", authCheck, (req, res) =>
  successResponse(res, 200, "You are authenticated", {}),
);

export default router;
