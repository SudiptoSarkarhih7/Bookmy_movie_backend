import jwt from "jsonwebtoken";
import createError from "../helper/createError.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const   authCheck = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(createError(401, "You are not authenticated!"));
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // console.log(error);
    if (error.name === "TokenExpiredError") {
      return next(createError(401, "Token has expired"));
    }
    if (error.name === "JsonWebTokenError") {
      return next(createError(401, "Invalid token"));
    }

    // Fallback for any other error
    return next(createError(500, "Authentication failed"));
  }
};

export default authCheck;
