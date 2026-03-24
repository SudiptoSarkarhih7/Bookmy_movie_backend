import Joi from "joi";

export const customerRegisterValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name cannot be empty",
    "any.required": "Name is required",
  }),

  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),

  password: Joi.string().trim().min(6).required().messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

export const customerLoginValidation = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),

  password: Joi.string().trim().min(6).required().messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});
