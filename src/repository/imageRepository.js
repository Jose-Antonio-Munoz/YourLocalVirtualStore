const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { storage, fileFilter } = require("../configuration/multerConfiguration");

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10, // Maximum file size: 5 MB
  },
});

exports.uploadSingleImage = (req, res, next) => {
    const uploadSingle = upload.single("image");
    uploadSingle(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: "File upload error" });
      } else if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      next();
    });
};

exports.searchImages = (imageName) => {
  return new Promise((resolve, reject) => {
    let name = "../uploads/" + imageName;
    let imagePath = path.join(__dirname, name);
    let image;
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error(err);
        reject("internal server error");
      } else {
        image = data;
        resolve(data);
      }
    });
  });
};
