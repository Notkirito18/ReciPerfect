const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

//* user validation to used when registering
const userValidation = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(15).required(),
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
  //*submodels schemas
  const ingredientSchema = Joi.object({
    name: Joi.string().required(),
    unit: Joi.string().required(),
    amount: Joi.number().required(),
  }).unknown();
  const ratingSchema = Joi.object({
    ratorId: Joi.string().required(),
    ratingScore: Joi.number().required(),
  }).unknown();
  //*main recipe schema
  const recipeSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    ingredients: Joi.array().items(ingredientSchema).required(),
    instructions: Joi.array().items(Joi.string()).required(),
    imagesFiles: Joi.array(),
    imagesSrcs: Joi.array(),
    share: Joi.boolean().required(),
    creatorId: Joi.objectId().required(),
    ratings: Joi.array().items(ratingSchema).default([]),
    likes: Joi.array().items(Joi.string()).default([]),
    prepTime: Joi.number().required(),
    cookTime: Joi.number().required(),
    servingsYield: Joi.number().required(),
    serving: Joi.number().required(),
    date: Joi.date().required(),
    tags: Joi.array().items(Joi.string()).default([]),
  }).unknown();

  return recipeSchema.validate(recipe).error;
};

module.exports = {
  userValidation,
  userLoginValidation,
  recipeValidation,
};
