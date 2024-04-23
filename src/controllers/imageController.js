const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { multerConfiguration } = require("../configuration/multerConfiguration");
const imageRepository = require("../repository/imageRepository");

exports.getImage = async () => {
  return imageRepository.uploadSingleImage();
};
exports.searchImage = async (req, res) => {
  try {
    const imageName = req.params["imagename"];
    const image = await imageRepository.searchImages(imageName);
    res.end(image);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};
