const mongoose = require("mongoose");
const Ingredient = require("./submodels/Ingredient");
const Rating = require("./submodels/Rating");

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  ingredients: {
    type: [Ingredient.schema],
  },
  instructions: {
    type: [String],
  },
  imagesFiles: {
    type: [String],
  },
  imagesSrcs: {
    type: [String],
  },
  share: {
    type: Boolean,
    default: false,
  },
  creatorId: {
    type: String,
  },
  ratings: {
    type: [Rating.schema],
  },
  likes: {
    type: [String],
  },
  prepTime: {
    type: Number,
  },
  cookTime: {
    type: Number,
  },
  servingsYield: {
    type: Number,
  },
  serving: {
    type: Number,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = {
  model: mongoose.model("Recipe", RecipeSchema),
  schema: RecipeSchema,
};
