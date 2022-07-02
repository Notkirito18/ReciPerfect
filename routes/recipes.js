const express = require("express");
const router = express.Router();
const upload = require("../helpers/multer");

const {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  deleteManyRecipes,
} = require("../controllers/Recipes");

const {
  saveImages,
  deleteImages,
  saveImagesEditingRecipe,
} = require("../controllers/Images");

router.route("/").post(createRecipe);
router.route("/:id").patch(updateRecipe).delete(deleteRecipe);
router.route("/deleteMany").post(deleteManyRecipes);

//images storage
router.route("/saveImage").post(upload.array("image"), saveImages);
router
  .route("/saveImage/:folderName")
  .post(upload.array("image"), saveImagesEditingRecipe);
router.route("/deleteImages").post(deleteImages);

module.exports = router;
