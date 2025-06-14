const asyncWrapper = require("../middleware/async");
const cloudinary = require("../helpers/cloudinary");
const cloudinaryOrigin = require("cloudinary");
const fs = require("fs");

//* saving images on upload Recipe
const saveImages = asyncWrapper(async (req, res) => {
  const date = new Date();
  const folderName = "rec-" + date.getTime().toString();
  const uploader = async (path) =>
    await cloudinary.uploads(path, "Recipes/" + folderName);
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
});

//* saving images on edit recipe
const saveImagesEditingRecipe = asyncWrapper(async (req, res) => {
  const folderName = req.params.folderName;
  const uploader = async (path) =>
    await cloudinary.uploads(path, "Recipes/" + folderName);
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
});

//* delete images of single deleted item from storage
const deleteImages = asyncWrapper(async (req, res, next) => {
  const { ids } = req.body;
  const deletedImages = await cloudinaryOrigin.api.delete_resources(
    ids,
    (result) => {
      const deletedCount = Object.values(result.deleted).filter(
        (item) => item == "deleted"
      ).length;
      const deleteError = deletedCount != ids.length;
      if (deleteError) {
        return res
          .status(400)
          .json({ msg: "Images were not deleted", deletedCount });
      }
      return res.status(200).json({ msg: "Images were deleted", ids });
    }
  );
});

//* saving images on upload User
const saveUserImage = asyncWrapper(async (req, res) => {
  const date = new Date();
  const folderName = "user-" + date.getTime().toString();
  const uploader = async (path) =>
    await cloudinary.uploads(path, "Users/" + folderName);
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
});

//* saving images on edit user
const saveImagesEditingUser = asyncWrapper(async (req, res) => {
  const folderName = req.params.folderName;
  const uploader = async (path) =>
    await cloudinary.uploads(path, "Users/" + folderName);
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
});

module.exports = {
  saveImages,
  deleteImages,
  saveImagesEditingRecipe,
  saveUserImage,
  saveImagesEditingUser,
};
