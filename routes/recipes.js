const express = require("express");
const router = express.Router();

const {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  deleteManyRecipes,
} = require("../controllers/Recipes");

router.route("/").post(createRecipe);
router.route("/:id").patch(updateRecipe).delete(deleteRecipe);
router.route("/deleteMany").post(deleteManyRecipes);

module.exports = router;
