const Image = require("../models/submodels/Image");
const Recipe = require("../models/Recipe");
const asyncWrapper = require("../middleware/async");
const cloudinary = require("../helpers/cloudinary");
const cloudinaryOrigin = require("cloudinary");
const fs = require("fs");

// saving images on upload
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

//* delete images of single deleted item from storage
const deleteImages = asyncWrapper(async (req, res, next) => {
  const { ids } = req.body;
  console.log("ids", ids);
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

module.exports = {
  saveImages,
  deleteImages,
};
