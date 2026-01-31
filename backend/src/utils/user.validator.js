const Joi = require("joi");

const registerValidator = Joi.object({
  firstname: Joi.string().trim().required().messages({
    "string.base": "Firstname must be a text value",
    "string.empty": "Firstname cannot be empty",
    "any.required": "Firstname is required",
  }),

  lastname: Joi.string().trim().required().messages({
    "string.base": "Lastname must be a text value",
    "string.empty": "Lastname cannot be empty",
    "any.required": "Lastname is required",
  }),

  age: Joi.number().integer().min(18).required().messages({
    "number.base": "Age must be a number",
    "number.min": "Age must be greater than 18",
    "any.required": "Age is required",
  }),

  gender: Joi.string().valid("male", "female").required().messages({
    "any.only": "Gender must be either 'male' or 'female'",
    "string.empty": "Gender cannot be empty",
    "any.required": "Gender is required",
  }),

  phone_num: Joi.string()
    .regex(/^9989[012345789][0-9]{7}$/)
    .required()
    .messages({
      "string.base":
        "Phone number must be a valid Uzbekistan number (9989XXXXXXXX)",
      "string.empty": "Phone number cannot be empty",
      "any.required": "Phone number is required",
    }),

  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
  }),

  password: Joi.string().required().messages({
    "string.base": "Password must be a text value",
    "string.min": "Password must be at least 6 characters long",
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
  }),
});

const loginValidator = Joi.object({
    email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
  }),

  password: Joi.string().required().messages({
    "string.base": "Password must be a text value",
    "string.min": "Password must be at least 6 characters long",
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
  }),
})

module.exports = { registerValidator, loginValidator};
