const express = require("express");
const router = express.Router();
const upload = require("../helpers/multer");

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/Users");

const {
  saveUserImage,
  saveImagesEditingUser,
} = require("../controllers/Images");
router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
//images storage
router.route("/saveProfileImage").post(upload.array("image"), saveUserImage);
router
  .route("/editProfileImage/:folderName")
  .post(upload.array("image"), saveImagesEditingUser);

module.exports = router;
