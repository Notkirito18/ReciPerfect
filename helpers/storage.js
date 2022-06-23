const multer = require('multer');

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const fileType = file.mimetype.split('/')[1];
    const originalName = file.originalname.split('.')[0]
    const fileName = originalName + '-' + Date.now() + '.' + fileType;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

const storage = multer({ storage: diskStorage, fileFilter: fileFilter }).array('image')

module.exports = storage;
