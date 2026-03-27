import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./router.js";
import errorHandler from "./src/middlewares/errorHendler.js";


const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/v1", routes);
// root route
app.get("/", (req, res) =>
  res.send(`Server is running on port ${process.env.PORT}`),
);

// Global error handler (must be after routes)
app.use(errorHandler);

export default app;
