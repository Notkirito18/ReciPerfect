const express = require("express");
const router = express.Router();

const {
  getAllRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  deleteManyRecipes,
} = require("../controllers/Recipes");

router.route("/").get(getAllRecipes).post(createRecipe);
router.route("/:id").get(getRecipe).patch(updateRecipe).delete(deleteRecipe);
router.route("/deleteMany").post(deleteManyRecipes);

module.exports = router;
