import { Router } from "express";
import userRoutes from "./src/routes/user.routes.js";
import clientRoutes from "./src/routes/client.routes.js";
import roleRoutes from "./src/routes/role.routes.js";


const router = Router();

router.use("/auth/customer", userRoutes);
router.use("/auth/client", clientRoutes);
router.use("/role", roleRoutes);

export default router;
