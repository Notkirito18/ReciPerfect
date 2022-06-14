const mongoose = require("mongoose");
const Ingredient = require("./submodels/Ingredient");

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
    type: String,
  },
  public: {
    type: Boolean,
    default: false,
  },
  creatorId: {
    type: String,
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
