const multer = require('multer');
exports.storage=multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
          const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_')
          cb(null, Date.now() + '-' + sanitizedFilename)
        }
      });
exports.fileFilter=(req, file, cb)=>{
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG images are allowed.'));
  }
}
