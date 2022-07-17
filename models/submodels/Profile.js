const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    profilePic: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    pinterest: {
      type: String,
    },
    personalWebsite: {
      type: String,
    },
  },
  { _id: false }
);

module.exports = {
  model: mongoose.model("Profile", ProfileSchema),
  schema: ProfileSchema,
};
