const { v2: cloudinary } = require("cloudinary");
require("dotenv").config();
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });

    // ✅ delete temp file after successful upload
    fs.unlinkSync(localFilePath);

    console.log("Uploaded:", result.secure_url);

    // ✅ return only the URL
    return result.secure_url;

  } catch (error) {
    console.log("Cloudinary error:", error);

    // delete file if upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

module.exports = { UploadOnCloudinary };
