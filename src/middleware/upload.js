const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const CloudinaryStorage  = require("multer-storage-cloudinary").CloudinaryStorage   ;

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }); // Limit file size to 5MB


module.exports = upload;