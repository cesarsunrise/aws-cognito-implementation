const Joi = require("@hapi/joi");

const schemaSignup = Joi.object({
  phone: Joi.string()
    .trim()
    .regex(/^[0-9]{10,11}$/)
    .messages({
      "string.pattern.base": "Phone must be a number with 10 digits",
    }),
  email: Joi.string().min(6).max(300).email(),
  first_name: Joi.string().min(3).max(300),
  last_name: Joi.string().min(3).max(300),
});

const signupValidator = (body) => {
  const { error } = schemaSignup.validate(body);
  if (error) {
    throw Error(error.details[0]?.message);
  }
  return true;
};

module.exports = signupValidator;
