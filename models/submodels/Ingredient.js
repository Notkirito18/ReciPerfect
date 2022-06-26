const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    unit: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },
  { _id: false }
);

module.exports = {
  model: mongoose.model("Ingredient", IngredientSchema),
  schema: IngredientSchema,
};
