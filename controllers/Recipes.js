const Recipe = require("../models/Recipe");

const asyncWrapper = require("../middleware/async");
const { recipeValidation } = require("../validation");

//* getting all the data operation

const getAllRecipes = asyncWrapper(async (req, res) => {
  // getting userId
  const userId = req.header("userDataId");

  //response with only the recipes that have the userId or are public (share prop true)
  const recipes = await Recipe.model.find(req.query);
  res.status(200).json({
    recipes: recipes.filter((item) => {
      return item.creatorId == userId || item.share == true;
    }),
  });
});

//* add item to database
const createRecipe = asyncWrapper(async (req, res) => {
  // getting userId
  const userId = req.header("userDataId");

  // updating recipe object with userId
  const recipe = new Recipe.model(req.body);
  recipe.creatorId = userId;

  //validation
  const error = recipeValidation(recipe);
  if (error) {
    return res.status(400).json({ msg: error });
  }
  //creating the recipe and responding
  if (req.body.imagesFiles.length > 0) {
    const imagesPaths = req.body.imagesSrcs;
    const formatedRecipe = new Recipe.model({
      ...req.body,
      imagesFiles: imagesPaths,
    });
    const recipeCreated = await formatedRecipe.save();

    res.status(201).json({
      recipe: { ...recipeCreated._doc },
    });
  } else {
    const recipeCreated = Recipe.model.create(recipe);
    res.status(201).json({ recipe: recipe });
  }
});

//* getting singel item in database operation
const getRecipe = asyncWrapper(async (req, res) => {
  // getting userId
  const userId = req.header("userDataId");

  //getting recipe
  const _id = req.params.id;
  const recipe = await Recipe.model.findOne({ _id });
  // recipe with _id doesn't exist or it exist but belongs to different user
  if (!recipe || (recipe.creatorId != userId && !recipe.share))
    return res.status(400).json({ msg: "No data matches the id : " + _id });

  // response
  res.status(200).json({ recipe: recipe });
});

//* updating singel item in database operation
const updateRecipe = asyncWrapper(async (req, res) => {
  // getting userId
  const userDataId = req.header("userDataId");

  //getting recipe to update
  const _id = req.params.id;
  const recipe = await Recipe.model.findOne({ _id });
  // recipe with _id doesn't exist
  if (!recipe)
    return res.status(400).json({ msg: "No data matches the id : " + _id });

  //validating newRecipe data
  const newRecipe = new Recipe.model({ ...req.body, _id });
  newRecipe.creatorId = userDataId;
  const error = recipeValidation(newRecipe);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  // updating the recipe and responding
  const recipeUpdated = await Recipe.model.findOneAndUpdate(
    { _id },
    newRecipe,
    {
      new: true,
      runValidators: true,
    }
  );
  if (recipeUpdated) {
    res.status(200).json({ recipe: recipeUpdated });
  } else {
    return res.status(424).json({ msg: "recipe was not updated" });
  }
});

//* delete singel item in database operation
const deleteRecipe = asyncWrapper(async (req, res) => {
  // getting userId
  const userId = req.header("userDataId");

  //getting recipe
  const _id = req.params.id;
  const recipe = await Recipe.model.findOne({ _id });
  // recipe with _id doesn't exist or it exist but belongs to different user
  if (!recipe || recipe.creatorId != userId)
    return res.status(400).json({ msg: "No data matches the id : " + _id });

  //deleting and responding
  const recipeDelete = await Recipe.model.deleteOne({ _id });
  if (recipeDelete) {
    res
      .status(200)
      .json({ _id: _id, msg: "recipe with id " + _id + " was deleted" });
  } else {
    return res.status(424).json({ msg: "recipe was not deleted" });
  }
});
const deleteManyRecipes = asyncWrapper(async (req, res) => {
  //getting recipes
  const ids = req.body.ids;

  //deleting and responding
  try {
    const recipeDelete = await Recipe.model.deleteMany(
      {
        _id: {
          $in: ids,
        },
      },
      (err, result) => {
        if (err) {
          res.status(500).json({ msg: err.message });
        } else {
          res.status(200).json({
            ids: ids,
            msg: result.deletedCount + " recipes deleted",
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  deleteManyRecipes,
};
