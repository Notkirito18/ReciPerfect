const express = require("express");
const router = express.Router();

const { getAllRecipes, getRecipe } = require("../controllers/Recipes");

router.route("/").get(getAllRecipes);
router.route("/:id").get(getRecipe);

module.exports = router;
