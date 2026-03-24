import { Router } from "express";
import { validate } from "../middlewares/validator.js";
import { clientLoginValidation, clientRegisterValidation } from "../validators/clientValidator.js";
import { clientLoginController, clientRegisterController } from "../controllers/client.controller.js";

const router = Router();

router.post('/register',
    validate(clientRegisterValidation),
    clientRegisterController
)
router.post('/login',
    validate(clientLoginValidation),
    clientLoginController);

export default router;
