const mongoose = require("mongoose");
const Profile = require("./submodels/Profile");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: Profile.schema,
  },
});

module.exports = {
  model: mongoose.model("User", UserSchema),
  schema: UserSchema,
};
