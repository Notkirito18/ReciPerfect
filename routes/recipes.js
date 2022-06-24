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
  deleteManyImages,
} = require("../controllers/Images");

const storage = require("../helpers/storage");

router.route("/").post(createRecipe);
router.route("/:id").patch(updateRecipe).delete(deleteRecipe);
router.route("/deleteMany").post(deleteManyRecipes);

//images storage
router.route("/saveImage").post(upload.array("image"), saveImages);
router.route("/saveImage/:id").delete(deleteImages);
router.route("/deleteManyImages").post(deleteManyImages);

module.exports = router;
