import express from "express";
import dotenv from "dotenv";
import routes from "./router.js";
import errorHandler from "./src/middlewares/errorHendler.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/v1", routes);

// root route
app.get("/", (req, res) => res.send("Server is running..."));

// Global error handler (must be after routes)
app.use(errorHandler);

export default app;
