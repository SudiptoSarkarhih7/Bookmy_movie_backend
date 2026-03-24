import Joi from "joi";

export const clientRegisterValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name cannot be empty",
    "any.required": "Name is required",
  }),

  email: Joi.string().trim().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
  }),

  password: Joi.string().trim().min(6).required().messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),

  // 🎭 Theatre Admin Fields
  theatreCount: Joi.number().min(1).default(1).messages({
    "number.base": "Theatre count must be a number",
    "number.min": "Theatre count must be at least 1",
  }),

  licenseNumber: Joi.string().trim().required().messages({
    "string.empty": "License number cannot be empty",
    "any.required": "License number is required",
  }),

  contactNumber: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Contact number cannot be empty",
      "any.required": "Contact number is required",
      "string.pattern.base": "Contact number must be 10 digits",
    }),

  // 🏢 Business Details
  businessRegistrationType: Joi.string().trim().optional(),

  gstNumber: Joi.string()
    .trim()
    .pattern(/^[0-9A-Z]{15}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid GST number format",
      "string.empty": "GST number cannot be empty",
      "any.required": "GST number is required",
    }),

  panNumber: Joi.string()
    .trim()
    .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid PAN number format",
      "string.empty": "PAN number cannot be empty",
      "any.required": "PAN number is required",
    }),

  officeAddress: Joi.string().trim().required().messages({
    "string.empty": "Office address cannot be empty",
    "any.required": "Office address is required",
  }),
});

export const clientLoginValidation = Joi.object({
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
