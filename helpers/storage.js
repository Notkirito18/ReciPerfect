const cloudinary = require("./cloudinary");
const fs = require("fs");

const storage = async (req, res, next) => {
  const uploader = async (path) => await cloudinary.uploads(path, "Images");
  const urls = [];
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }
  next();
};

module.exports = storage;
