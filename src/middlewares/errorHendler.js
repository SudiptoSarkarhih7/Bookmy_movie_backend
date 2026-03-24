const errorHandler = (err, req, res, next) => {
  // console.log("Inside errorHandler");
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";

  /**
   * Centralized handling for all known error cases
   */

  // Invalid ObjectId / Cast errors from Mongoose
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors || {})
      .map((e) => e.message)
      .join(", ");
  }

  // Mongo duplicate key error (e.g. unique email, role, etc.)
  if (err.code && err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0];
    message = field ? `${field} already exists` : "Duplicate field value";
  }

  // JWT related errors (in case they bubble up here)
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired";
  }

  // Fallback for any unhandled / programming errors
  if (!statusCode || statusCode < 400 || statusCode > 599) {
    statusCode = 500;
  }

  if (process.env.NODE_ENV === "development") {
    console.error(statusCode, err.message.red.bold);
    console.error(err.stack);
  }
  // console.log(process.env.NODE_ENV)

  const payload = {
    success: false,
    message,
    // Only expose stack trace in development
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  return res.status(statusCode).json(payload);
};

export default errorHandler;
