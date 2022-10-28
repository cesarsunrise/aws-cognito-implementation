const Joi = require("@hapi/joi");

const schemaSignup = Joi.object({
  phone_number: Joi.string()
    .trim()
    .regex(/^[0-9]{10,11}$/)
    .optional()
    .empty("")
    .messages({
      "string.pattern.base": "Phone must be a number with 10 digits",
    }),
  email: Joi.string().min(6).max(300).optional().email().empty(""),
  first_name: Joi.string().min(3).max(300).optional().empty(""),
  last_name: Joi.string().min(3).max(300).optional().empty(""),
});

const signupValidator = (body) => {
  const { error } = schemaSignup.validate(body);
  if (error) {
    throw Error(error.details[0]?.message);
  }
  return true;
};

module.exports = signupValidator;
