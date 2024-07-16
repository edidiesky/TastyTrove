import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const cloudinaryModule = cloudinary.v2;
// console.log(process.env.cloud_name);

cloudinaryModule.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_key,
  api_secret: process.env.cloud_secret,
});

const router = express.Router();
// Configure Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryModule,
  params: {
    folder: "airbnb", // Specify the folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});
const upload = multer({ storage });

router.post("/", upload.array("files", 4), async (req, res) => {
  try {
    // req.files contains an array of uploaded files
    const files = req.files;

    // Use a loop to upload each file to Cloudinary
    const urls = [];
    for (const file of files) {
      const result = await cloudinaryModule.uploader.upload(file.path);
      urls.push(result.secure_url);
    }

    // Optionally, you can respond with the URLs of the uploaded images
    res.setHeader("Content-Type", "application/json");

    res.json({ success: true, message: "Images uploaded successfully", urls });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.setHeader("Content-Type", "application/json");

    res
      .status(500)
      .json({ success: false, message: "Failed to upload images" });
  }
});

export default router;
