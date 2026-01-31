const Joi = require("joi");

const todoValidator = Joi.object({
    title: Joi.string().required().min(10).max(500).trim().messages({
        "string.base": "Please enter the title",
        "string.empty": "Title must not be empty "
    }),
    description: Joi.string().trim().allow(""),
    status: Joi.string().valid("pending", "in-progress", "done").trim(),

})
module.exports = todoValidator