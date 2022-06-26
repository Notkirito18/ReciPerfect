const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
  {
    ratorId: {
      type: String,
    },
    ratingScore: {
      type: Number,
    },
  },
  { _id: false }
);

module.exports = {
  model: mongoose.model("Rating", RatingSchema),
  schema: RatingSchema,
};
