const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

//* user validation to used when registering
const userValidation = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().required().email({ minDomainSegments: 2 }),
    password: Joi.string()
      .required()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*s)(?=.{8,})"))
      .error((errors) => {
        errors.forEach((err) => {
          if (err.code == "string.pattern.base") {
            err.message =
              "password must be at least 8 characters, and a mix of lowercase, uppercase and numbers";
          }
        });
        return errors;
      }),
  }).unknown();

  return schema.validate(user).error;
};

//* login validation

const userLoginValidation = (loginData) => {
  const schema = Joi.object({
    email: Joi.string().required().email({ minDomainSegments: 2 }),
    password: Joi.string()
      .required()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*s)(?=.{8,})"))
      .error((errors) => {
        errors.forEach((err) => {
          if (err.code == "string.pattern.base") {
            err.message =
              "password must be at least 8 characters, and a mix of lowercase, uppercase and numbers";
          }
        });
        return errors;
      }),
  });

  return schema.validate(loginData).error;
};

//* recipe validation
const recipeValidation = (recipe) => {
  const ingredientSchema = Joi.object({
    name: Joi.string().required(),
    unit: Joi.string().required(),
    amount: Joi.number().required(),
  }).unknown();

  const recipeSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    ingredients: Joi.array().items(ingredientSchema).required(),
    instructions: Joi.string().required(),
    public: Joi.boolean().required(),
    creatorId: Joi.objectId().required(),
    date: Joi.date().required(),
  }).unknown();

  return recipeSchema.validate(recipe).error;
};

module.exports = {
  userValidation,
  userLoginValidation,
  recipeValidation,
};
