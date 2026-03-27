import jwt from "jsonwebtoken";

const getAccessTokenSecret = () => {
  const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("ACCESS_TOKEN_SECRET or JWT_SECRET is missing");
  }
  return secret;
};

const getRefreshTokenSecret = () => {
  const secret = process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("REFRESH_TOKEN_SECRET or JWT_SECRET is missing");
  }
  return secret;
};

export const generateAccessToken = (_id, role, ...rest) => {
  return jwt.sign({ _id, role, ...rest }, getAccessTokenSecret(), {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
  });
};

export const generateRefreshToken = (_id, role, ...rest) => {
  return jwt.sign({ _id, role, ...rest }, getRefreshTokenSecret(), {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  });
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, getRefreshTokenSecret());
};