const Image = require("../models/submodels/Image");
const Recipe = require("../models/Recipe");
const asyncWrapper = require("../middleware/async");
const cloudinary = require("../helpers/cloudinary");
const fs = require("fs");

// saving images on upload
const saveImages = asyncWrapper(async (req, res) => {
  console.log(req.files);

  const uploader = async (path) => await cloudinary.uploads(path, "Images");
  const urls = [];
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }

  res.status(201).json({
    images: urls,
  });

  // let images = [];
  // for (let i = 0; i < req.files.length; i++) {
  //   const name = req.files[i].filename;
  //   const imagePath = process.env.URL + "images/" + name;
  //   const image = new Image({
  //     name,
  //     imagePath,
  //   });
  //   const createdImage = await image.save();
  //   images.push({ ...createdImage._doc });
  // }
  // console.log(images);
  // res.status(201).json({
  //   images,
  // });
});

//* delete images of single deleted item from storage
const deleteImages = asyncWrapper(async (req, res, next) => {
  let deletedImages = [];
  const recipeId = req.params.id;
  const recipe = await Recipe.model.findOne({ _id: recipeId });
  const images = recipe.imageGallery;
  for (let i = 0; i < images.length; i++) {
    const dbImage = await Image.findOne({ imagePath: images[i] });
    const _id = dbImage._id;
    const image = await Image.deleteOne({ _id });
    const imagePath = path.join("images", dbImage.name);
    try {
      fs.unlinkSync(imagePath);
      //file removed
    } catch (err) {
      console.error("unlinkSync error", err);
    }
    deletedImages.push(imagePath);
  }
  res.status(200).json({
    msg: images.length.toString() + " images deleted",
    images: deletedImages,
  });
});
//* delete images of multiple deleted item from storage
const deleteManyImages = asyncWrapper(async (req, res, next) => {
  let deletedImages = [];
  const recipesIds = req.body;
  const images = [];
  for (let i = 0; i < recipesIds.length; i++) {
    const recipe = await Recipe.model.findOne({ _id: recipesIds[i] });
    const imageGallery = recipe.imageGallery;
    for (let j = 0; j < imageGallery.length; j++) {
      images.push(imageGallery[j]);
    }
  }
  for (let i = 0; i < images.length; i++) {
    const dbImage = await Image.findOne({ imagePath: images[i] });
    const _id = dbImage._id;
    const image = await Image.deleteOne({ _id });
    const imagePath = path.join("images", dbImage.name);
    try {
      fs.unlinkSync(imagePath);
      //file removed
    } catch (err) {
      console.error("unlinkSync error", err);
    }
    deletedImages.push(imagePath);
  }
  res.status(200).json({
    recipesIds,
    msg: images.length.toString() + " images deleted",
    images: deletedImages,
  });
});

module.exports = {
  saveImages,
  deleteImages,
  deleteManyImages,
};
